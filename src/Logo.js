import React from "react";
import { Link } from "react-router-dom";
// import Registration from "./registration";

export default function Logo() {
    return (
        <div>
            <Link to="/">
                <img id="logo" src="/assets/isologo.png" />
            </Link>
        </div>
    );
}
