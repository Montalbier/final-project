import React, { useEffect } from "react";
import L, { icon } from "leaflet";
// import { Map, MapContainer, TileLayer, LocationMarker } from "react-leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Travelmap() {
    var popup;
    var mymap;

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent(
                "<textarea onKeyDown={keyCheck}>Share your thoughts, feelings, questions about this place...</textarea>"
            )
            .openOn(mymap);
        // L.marker(e.latlng, { title: "pimento" }).addTo(mymap);
    }

    const keyCheck = (e) => {
        console.log("keydown is working");
        if (e.key === "Enter") {
            // console.log("user wants to send message");
            e.preventDefault();
            // console.log("value in textarea: ", evt.target.value);
            // socket.emit("newMessage", e.target.value);
            e.target.value = "";
        }
    };

    <textarea
        onKeyDown={keyCheck}
        placeholder="
        Share your thoughts, feelings, questions about this place..."
    />;

    useEffect(() => {
        mymap = L.map("mapid");
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

    // useEffect(() => {
    //     console.log("map component mounted");
    // if (markerRef.current) {
    //     markerRef.current.setLatLng(markerPosition);
    // } else {
    //     markerRef.current = L.marker(markerPosition).addTo(mapRef.current);
    // }
    // }, []);

    // marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    // circle.bindPopup("I am a circle.");
    // polygon.bindPopup("I am a polygon.");

    return (
        <div>
            <div id="mapid">
                <MapContainer
                    center={[51.505, -0.09]}
                    zoom={13}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
}
