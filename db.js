let spicedPg = require("spiced-pg");
let db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/finalproject`
);
module.exports.createUser = (first, last, email, password) => {
    return db.query(
        `
        INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4) 
        RETURNING id
        `,
        [first, last, email, password]
    );
};

module.exports.getUser = (email) => {
    return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};

module.exports.checkEmail = (email) => {
    return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
};

// reseting password

module.exports.addCode = (code, email) => {
    return db.query(
        `
        INSERT INTO reset_codes (code, email)
        VALUES($1,$2)
    `,
        [code, email]
    );
};

module.exports.getCode = (email) => {
    return db.query(
        `
        SELECT code 
        FROM reset_codes
        WHERE email=$1 
        AND CURRENT_TIMESTAMP - timestamp <= '10 minutes'
        ORDER BY id DESC 
        LIMIT 1;
        `,
        [email]
    );
};

module.exports.updatePassword = (password, email) => {
    return db.query(
        `
        UPDATE users 
        SET password=$1
        WHERE email = $2
    `,
        [password, email]
    );
};

// changing profile pic

exports.uploadImage = (url, id) => {
    return db.query(
        `UPDATE users SET url = $1 WHERE id = $2 RETURNING url;
    `,
        [url, id]
    );
};

module.exports.getUserById = (id) => {
    return db.query(`SELECT * FROM users WHERE id = $1`, [id]);
};

// map

module.exports.getComments = (id) => {
    return db.query(`SELECT * FROM popup WHERE user_id = $1`, [id]);
};

module.exports.addComment = (comment, user_id, lat, lng) => {
    return db.query(
        `INSERT INTO popup (comment, user_id, lat, lng)
        VALUES($1, $2, $3, $4)`,
        [comment, user_id, lat, lng]
    );
};

// packlist

module.exports.getItems = (id) => {
    return db.query(`SELECT * FROM packlist WHERE user_id = $1`, [id]);
};

module.exports.addItem = (item, user_id) => {
    return db.query(
        `INSERT INTO packlist (item, user_id)
        VALUES($1, $2)`,
        [item, user_id]
    );
};
