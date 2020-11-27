import React from "react";

export default function About() {
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                }}
            >
                <div>
                    <img
                        src="/assets/4landscape.png"
                        style={{
                            width: "400px",
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}
                    />
                </div>
                <div>
                    {/* <img
                        src="/assets/1isologotipo.png"
                        style={{
                            width: "200px",
                            marginLeft: "260px",
                            marginTop: "40px",
                            marginBottom: "40px",
                        }}
                    /> */}
                    <p
                        style={{
                            color: "#555b6e",
                            width: "700px",
                            marginTop: "200px",
                            marginLeft: "30px",
                            marginRight: "130px",
                        }}
                    >
                        Do you love to travel? But organising is always a
                        challenge for you? <br />
                        Then Good Travel is the must have tool for you with
                        everything you need all in one app. It will help you
                        organise your trip from start to finish in order for you
                        to get the most out of it. <br /> <br />
                        1. Mark on a map the places you want to remember and
                        leave a note. This way you won’t forget your favourite
                        places or places that you still wish to see. <br />{" "}
                        <br />
                        2. Write a packing list that you can edit in order to
                        make sure you don’t forget anything and stay organised.{" "}
                        <br /> <br />
                        3. Wanna travel like a local? Learn some common phrases
                        of the country’s language. <br />
                    </p>
                    {/* ICONS underneath text */}
                    {/* <div style={{ paddingLeft: "180px" }}>
                        <i
                            style={{
                                color: "#555b6e",
                                width: "100px",
                                padding: "30px",
                            }}
                            className="fas fa-map-marked-alt"
                        ></i>
                        <i
                            style={{
                                color: "#555b6e",
                                width: "100px",
                                padding: "30px",
                            }}
                            className="fas fa-suitcase"
                        ></i>
                        <i
                            style={{
                                color: "#555b6e",
                                width: "100px",
                                padding: "30px",
                            }}
                            className="fas fa-language"
                        ></i>
                    </div> */}
                </div>
                {/* <div>
                    <img
                        src="/assets/4landscape.png"
                        style={{
                            width: "400px",
                            flexWrap: "wrap",
                        }}
                    />
                </div> */}
            </div>
            <div></div>
        </div>
    );
}
