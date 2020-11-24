import React from "react";
import ProfilePic from "./ProfilePic";

//I still want to render this!

export default function Profile(props) {
    return (
        <div
            id="profile-big-container"
            style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                marginTop: "0px",
                // backgroundImage: `url("/assets/2landscape.png")`,
            }}
        >
            <div
                style={{
                    width: "auto",
                    height: "650px",
                    backgroundImage: `url("/assets/2profilelandscape.png")`,
                }}
            >
                <div
                    className="profile-container"
                    style={{ paddingLeft: "210px", paddingRight: "210px" }}
                >
                    <div className="profile">
                        <h1 className="user-name">
                            {props.first} &nbsp;
                            {props.last}
                        </h1>
                        <div>
                            <ProfilePic
                                id="profile-pic"
                                imgUrl={props.imgUrl}
                                toggleComponent={() => props.toggleComponent()}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
