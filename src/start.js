import React from "react";
import ReactDOM from "react-dom";
// import Welcome from "/Welcome";
import App from "./App";
import Welcome from "./Welcome";

// 1. This is code we will need but can't use yet bc those components
// and the /welcome route don't exist yet ->

let elem;
const userIsLoggedIn = location.pathname != "/welcome";

if (!userIsLoggedIn) {
    elem = <Welcome />;
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
