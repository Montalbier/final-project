import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
// import { Map, MapContainer, TileLayer, LocationMarker } from "react-leaflet";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvent,
} from "react-leaflet";
import axios from "./axios";
// import {Map as MapContainer, Marker, Popup, TileLayer } from “react-leaflet”;

export default function Travelmap() {
    // var popup;
    // var mymap;
    // var popupInput;
    const mapRef = useRef();
    // const [currentPos, setCurrentPos] = useState(null);
    // const [activeMarker, setActiveMarker] = React.useState(null);
    const [initialMarkers, setInitialMarkers] = useState([]);
    const [allMarkers, setAllMarkers] = useState([]);
    const [comment, setComment] = useState("");

    // function onMapClick(e) {
    // console.log("location: ", e);
    // setcurrentPos()
    // popup
    //     .setLatLng([52.52, 13.4])
    //     .setContent("You clicked the map at " + e.latlng.toString())
    //     .openOn(mymap);
    // L.marker(e.latlng, { title: "pimento" }).addTo(mymap);
    // <Popup>
    // </Popup>;
    // <Marker position={[52.52, 13.4]}></Marker>;
    // }

    const keyCheck = (e) => {
        // console.log("keydown is working");
        if (e.key === "Enter") {
            // console.log("user wants to send message");
            e.preventDefault();
            // console.log("value in textarea: ", e.target.value);
            // popupInput = e.target.value;
            setComment(e.target.value);
            e.target.value = "";

            // console.log("markers in keyCheck: ", markers);
        }
    };

    function setLocation(location) {
        console.log("location setLocation ", location.lat);
        setAllMarkers([
            ...allMarkers,
            {
                comment: (
                    <textarea
                        onKeyDown={keyCheck}
                        placeholder="Share your thoughts, feelings, questions about this place..."
                    />
                ),
                coords: [location.lat, location.lng],
                id: location.lat + location.lng,
            },
        ]);
    }

    useEffect(() => {
        mapRef.current = L.map("mapid");
        // .on("click", onMapClick);

        axios
            .get("/getcomments")
            .then(({ data }) => {
                const markers = data.map((marker) => {
                    return {
                        ...marker,
                        coords: [marker.lat, marker.lng],
                    };
                });
                console.log("axios response in /getcomments: ", data);
                setAllMarkers(markers);
                // console.log("markers in /getcomments: ", markers);
            })
            .catch((err) => console.log("ERROR in /getcomments: ", err));

        // .setView([52.52, 13.4], 13);
        // var marker = L.marker([52.52, 13.4]).addTo(mymap);
        // popup = L.popup();
        // var circle = L.circle();
        // var polygon = L.polygon();
        // L.tileLayer(
        //     "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        //     {
        //         attribution:
        //             'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        //         maxZoom: 18,
        //         id: "mapbox/streets-v11",
        //         tileSize: 512,
        //         zoomOffset: -1,
        //         accessToken:
        //             "pk.eyJ1IjoibW9udGFsYmllciIsImEiOiJja2hzb2FkbHA0YnNiMnNsNnNwazZoaDJxIn0.WVZPvKli5HwiLBM99JB_UQ",
        //     }
        // ).addTo(mymap);
        // mymap.on("click", onMapClick);
    }, []);

    useEffect(() => {
        // console.log("comment: ", comment);
        if (!comment) {
            return;
        }

        axios
            .post("/popup", {
                comment: comment,
                coords: allMarkers[0].coords,
            })
            .then(({ data }) => {
                console.log("axios response in /popup: ", data);
            })
            .catch((err) => console.log("axios ERROR in /popup: ", err));
    });

    console.log("allMarkers: ", allMarkers);

    return (
        <div>
            <div id="mapid">
                <MapContainer
                    center={[52.52, 13.4]}
                    zoom={13}
                    // scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MyComponent setLocation={setLocation} />
                    {allMarkers &&
                        allMarkers.map((marker) => (
                            <Marker
                                key={marker.id}
                                position={marker.coords}
                                // onClick={() => {
                                //     setActiveMarker(marker);
                                // }}
                            >
                                <Popup>{marker.comment}</Popup>
                            </Marker>
                        ))}
                </MapContainer>
            </div>
        </div>
    );
}

function MyComponent({ setLocation }) {
    const map = useMapEvent("click", (e) => {
        // console.log(e);
        setLocation(e.latlng);
    });
    return null;
}
