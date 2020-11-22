import React from "react";
// import L from "leaflet";

export default function Map() {
    var mymap = L.map("mapid").setView([52.52, 13.4], 13);

    L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
            attribution:
                'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken:
                "pk.eyJ1IjoibW9udGFsYmllciIsImEiOiJja2hzb2FkbHA0YnNiMnNsNnNwazZoaDJxIn0.WVZPvKli5HwiLBM99JB_UQ",
        }
    ).addTo(mymap);
}
