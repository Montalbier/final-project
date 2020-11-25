import React from "react";
import Registration from "./Registration";
import { HashRouter, Route } from "react-router-dom";
import Login from "./Login";
import ResetPassword from "./ResetPassword";

export default function Welcome() {
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div>
                <img
                    src="/assets/4profilelandscape.png"
                    style={{
                        width: "486px",
                        flexWrap: "wrap",
                    }}
                />
            </div>
            <div>
                <div
                    style={{
                        width: "800px",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    <img src="/assets/isologo.png" style={{ width: "450px" }} />
                </div>
                <div
                    style={{
                        marginTop: "-20px",
                        justifyContent: "center",
                        textAlign: "center",
                        color: "#c6848f",
                    }}
                >
                    <h1>Welcome to Good Travel</h1>
                </div>
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                        <Route path="/reset" component={ResetPassword} />
                    </div>
                </HashRouter>
            </div>
        </div>
    );
}
