import * as React from "react";
import { getCenter } from "geolib";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";

import Link from "next/link";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidGVndWhkYXJtYSIsImEiOiJja3psNjRneWsxNHQ1Mm5ueXh2dThpY2xuIn0.EOP9mO-H8NKTAW6jcvX7KQ"; // Set your mapbox token here

export default function Maps({ post }) {
  const [selectedLocation, setSelectedLocation] = useState({});
  const coordinates = post.map((result) => ({
    longitude: result.long,
    latitude: result.lang,
  }));
  console.log(coordinates);
  const center = getCenter(coordinates);
  console.log(center);

  return (
    <div>
      <Map
        initialViewState={{
          latitude: center.latitude,
          longitude: center.longitude,
          zoom: 11,
        }}
        style={{ width: 600, height: "100%" }}
        mapStyle="mapbox://styles/teguhdarma/ckzl67xvt000q15qmhvsxh85j"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {posts.map((result) => (
          <div key={result.long}>
            <Marker
              longitude={result.long}
              latitude={result.lang}
              offsetLeft={-20}
              offsetTop={-10}
              color="red"
            >
              <p
                role="img"
                onClick={() => setSelectedLocation(result)}
                className="cursor-pointer text-2xl text-red-500 animate-bounce "
                aria-label="push-pin"
              >
                s
              </p>
            </Marker>
            {selectedLocation.long === result.long ? (
              <Popup
                onClose={() => setSelectedLocation({})}
                closeOnClick={false}
                offsetTop={-30}
                latitude={result.lang}
                longitude={result.long}
              >
  <Link key={result._id} href={`/post/${result.slug.current}`}>
                {result.title}
                </Link>
              </Popup>
            ) : (
              false
            )}
          </div>
        ))}
      </Map>
    </div>
  );
}
