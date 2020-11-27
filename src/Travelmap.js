import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvent,
} from "react-leaflet";
import axios from "./axios";
// import Search from "react-leaflet-search/lib/Search-v1";

export default function Travelmap() {
    // console.log(Search);
    const mapRef = useRef();
    const [allMarkers, setAllMarkers] = useState([]);
    const [comment, setComment] = useState("");
    const [currentMarker, setCurrentMarker] = useState([]);

    function keyCheck(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            setComment(e.target.value); // comment = "e.target.value"
            e.target.value = "";
        }
    }

    function setLocation(location) {
        // console.log("location setLocation ", location.lat);
        const currentMarker = {
            comment: (
                <textarea
                    className="popupinput"
                    onKeyDown={keyCheck}
                    placeholder="Share your thoughts, feelings, questions about this place..."
                />
            ),
            coords: [location.lat, location.lng],
            id: location.lat + location.lng,
        };
        setCurrentMarker(currentMarker);
        setAllMarkers([...allMarkers, currentMarker]);
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
            })
            .catch((err) => console.log("ERROR in /getcomments: ", err));
    }, []);

    useEffect(() => {
        if (!comment) {
            return;
        }

        const updatedMarker = { ...currentMarker, comment: comment };
        setCurrentMarker(updatedMarker);
        const updatedMarkers = allMarkers.map((marker) => {
            if (marker.id == currentMarker.id) {
                return {
                    ...marker,
                    comment: comment,
                };
            } else {
                return marker;
            }
        });

        setAllMarkers(updatedMarkers);

        axios
            .post("/popup", {
                comment: comment,
                coords: currentMarker.coords,
            })
            .then(({ data }) => {
                console.log("axios response in /popup: ", data);
                setComment("");
            })
            .catch((err) => console.log("axios ERROR in /popup: ", err));
    }, [comment]);

    console.log("currentMarker: ", currentMarker);

    return (
        <div id="mapid">
            <MapContainer
                center={[-34.901112, -56.164532]}
                zoom={13}
                // scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* const searchComponent = (props) =>{" "} */}
                {/* <Search
                    position="topleft"
                    provider="OpenStreetMap"
                    providerOptions={{ region: "gb" }}
                /> */}
                <MyComponent setLocation={setLocation} />
                {allMarkers &&
                    allMarkers.map((marker) => (
                        <Marker key={marker.id} position={marker.coords}>
                            <Popup>{marker.comment}</Popup>
                        </Marker>
                    ))}
            </MapContainer>
        </div>
    );
}

function MyComponent({ setLocation }) {
    useMapEvent("click", (e) => {
        setLocation(e.latlng);
    });
    return null;
}
