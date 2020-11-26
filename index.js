const csurf = require("csurf");
const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const multer = require("multer");
const path = require("path");
const uidSafe = require("uid-safe");
const { hash, compare } = require("./bc");
const db = require("./db");
const ses = require("./ses");
const s3 = require("./s3");
const s3Url = "https://s3.amazonaws.com/spicedling/";
const cryptoRandomString = require("crypto-random-string");

// 1. MIDDLEWARE

// cookies

app.use(
    cookieSession({
        secret: "I'm always hungry",
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

// csrf

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

// uploader boilerplate

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

// ALWAYS REMEMBER express and json!

app.use(express.static("public"));

app.use(express.json());

// boiler plate starter code from David

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

/*
OUR ROUTES GO HERE (between this line and the get("*")
*/

// 🚫 ------ logged out user ------ 🚫 //

// -> Welcome get

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/user");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

//////// register POST req

app.post("/register", (req, res) => {
    console.log("req.body: ", req.body);
    const { first, last, email, password } = req.body;

    // checks that all the fields are filled
    if (first !== "" && last !== "" && email !== "" && password !== "") {
        // TO-DO Que pasa cuando el email ya esta en la DB ?
        hash(password)
            .then((hashedPw) => {
                console.log("parametros:", first, last, email, hashedPw);
                return db.createUser(first, last, email, hashedPw);
            })
            .then((results) => {
                // console.log("results: ", results);
                const { id } = results.rows[0];
                req.session.userId = id;
                // console.log("req.session: ", req.session);

                res.json({ success: true });
            })
            .catch((err) => {
                console.log("error post /register route: ", err);
                res.json({ success: false });
            });
    }
});

/// login POST request

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log({ email });

    db.getUser(email)
        .then(({ rows }) => {
            console.log({ rows });
            const { id } = rows[0];
            const hash = rows[0].password;
            compare(password, hash)
                .then((result) => {
                    if (result) {
                        req.session.userId = id;
                        console.log("req.session: ", req.session);
                        console.log("req.session.userId: ", req.session.userId);
                        res.json({ success: true });
                    } else {
                        res.json({ success: false });
                    }
                })
                .catch((err) => {
                    console.log("error in post /login: ", err);
                    res.json({ success: false });
                });
        })
        .catch((err) => {
            console.log("error in post /login: ", err);
            res.json({ success: false });
        });
});

// rest password POST request

app.post("/reset/email", (req, res) => {
    const { email } = req.body;
    console.log(" POST /reset/email route working");

    if (email !== "") {
        db.checkEmail(email)
            .then(({ rows }) => {
                if (rows.length === 1) {
                    // this generates a reset code ->
                    const resetCode = cryptoRandomString({
                        length: 6,
                    });
                    // this inserts resetCode and the email into database (only if email already exists)
                    db.addCode(resetCode, email)
                        .then(() => {
                            let recipient = email;
                            let buttonText = `To reset yuor password please copy and paste this code: ${resetCode}`;
                            let subject = `Here is your secret code`;
                            ses.sendEmail(recipient, buttonText, subject)
                                .then(() => {
                                    res.json({
                                        success: true,
                                    });
                                })
                                .catch((err) => {
                                    console.log(
                                        "error in POST /reset/email when sending email: ",
                                        err
                                    );
                                });
                        })
                        .catch((err) => {
                            console.log(
                                "error in POST /reset/email when adding code",
                                err
                            );
                        });
                } else {
                    console.log("This email does not exist in our database");
                }
            })
            .catch((err) => {
                console.log(
                    "error in POST /reset/email with checkEmail()",
                    err
                );
            });
    } else {
        console.log("don't forget your email");
    }
});

// verify password POST request

app.post("/reset/verify", (req, res) => {
    const { email, code, password } = req.body;

    if (code !== "" && password !== "") {
        db.getCode(email)
            .then((response) => {
                if (response.rows[0].code == code) {
                    hash(password)
                        .then((hashedPw) => {
                            db.updatePassword(hashedPw, email)
                                .then(({ rows }) => {
                                    console.log(
                                        "Error in reset 2nd display",
                                        rows
                                    );
                                    res.json({ success: true });
                                })
                                .catch((err) => {
                                    console.log(
                                        "Error in reset third display",
                                        err
                                    );
                                });
                        })
                        .catch((err) => {
                            console.log("error in POST /register", err);
                        });
                } else {
                    console.log("That is the wrong code");
                }
            })
            .catch((err) => {
                console.log("error in POST (invalid code???)", err);
            });
    } else {
        console.log("every field must be filled");
    }
});

// ✅ ---------- logged in user ---------- ✅ //

// upload profile pic POST request

app.post("/images", uploader.single("file"), s3.upload, (req, res) => {
    console.log("ACCESSED POST /images route ");

    const { userId } = req.session;
    const { filename } = req.file;
    const url = s3Url + filename;
    if (req.file) {
        db.uploadImage(url, userId)
            .then(({ rows }) => {
                console.log("POST /images response", rows[0].url);
                res.json(rows[0].url);
            })
            .catch((err) => {
                console.log("error in POST /upload with uploadImage()", err);
            });
    } else {
        res.json({ success: false });
    }
    console.log({ userId });
});

// get -> user profile

app.get("/user", (req, res) => {
    const { userId } = req.session;
    console.log("req.session.userId: ", req.session.userId);
    console.log({ userId });
    db.getUserById(userId)
        .then(({ rows }) => {
            // console.log("rows in index /user: ", rows);
            res.json(rows[0]);
        })
        .catch((err) => {
            console.log("error in GET /user: ", err);
        });
});

// getting popup comments from db

app.get("/getcomments", (req, res) => {
    // console.log("req.session in /getComments: ", req.session);
    const { userId } = req.session;

    db.getComments(userId)
        .then(({ rows }) => {
            console.log("rows in getComments: ", rows);
            res.json(rows);
        })
        .catch((err) => console.log("ERROR in getComments: ", err));
});

// adding input from popup into db

app.post("/popup", (req, res) => {
    console.log("req.body in /popup: ", req.body);
    const { userId } = req.session;
    const { comment } = req.body;
    const lat = req.body.coords[0];
    const lng = req.body.coords[1];
    console.log("userId, comment, lat, lng: ", userId, comment, lat, lng);

    db.addComment(comment, userId, lat, lng)
        .then(({ rows }) => {
            console.log("rows in addComment: ", rows);
            res.json({ success: true });
        })
        .catch((err) => {
            console.log("ERROR in addComment: ", err);
        });
});

// get-> logout

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

/*
NO CODE AFTER THIS LINE!!!!!!
*/
// ‼️ Remember this get request always goes at last

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
