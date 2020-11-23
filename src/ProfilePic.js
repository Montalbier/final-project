import React from "react";

export default function ProfilePicture({
    imgUrl,
    first,
    last,
    toggleComponent,
}) {
    return (
        <>
            <div id="profil-pic" style={{ width: "232px" }}>
                <img
                    style={{ width: "100%" }}
                    src={
                        imgUrl ||
                        "https://images.fineartamerica.com/images/artworkimages/medium/2/no-face-my-neighbor-totoro-valentina-hramov-transparent.png"
                    }
                    onClick={() => toggleComponent("uploaderIsVisible")}
                />
            </div>
        </>
    );
}
