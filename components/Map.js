import * as React from "react";
import { getCenter } from "geolib";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import { sanityClient, urlFor } from "../sanity";
import { useRef, useEffect } from "react";
import Link from "next/link";
import Typed from 'react-typed';

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidGVndWhkYXJtYSIsImEiOiJja3psNjRneWsxNHQ1Mm5ueXh2dThpY2xuIn0.EOP9mO-H8NKTAW6jcvX7KQ"; // Set your mapbox token here

export default function App({ posts }) {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  const [selectedLocation, setSelectedLocation] = useState({});
  const coordinates = posts.map((result) => ({
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
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
                <section>
                  <div className="w-40 h-30 carousel my-1  mx-auto">
                    <div className="relative overflow-hidden">
                      <div className="flex justify-between absolute top left w-full h-full">
                        <button
                          onClick={movePrev}
                          className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
                          disabled={isDisabled("prev")}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-20 -ml-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                          <span className="sr-only">Prev</span>
                        </button>
                        <button
                          onClick={moveNext}
                          className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
                          disabled={isDisabled("next")}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-20 -ml-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                          <span className="sr-only">Next</span>
                        </button>
                      </div>
                      <div
                        ref={carousel}
                        className="carousel-container pr-4 relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
                      >
                        <div className="relative h-24 w-40 md:h-24 md:w-30 flex-shrink-0 hover:scale-105 transform transition duration-300 ease-out">
                          <img
                            className="h-30 w-40 object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                            src={urlFor(result.fasilitas.image)}
                            alt=""
                          />
                        </div>
                        <div className="relative h-24 w-40 md:h-24 md:w-30 flex-shrink-0 hover:scale-105 transform transition duration-300 ease-out">
                          <img
                            className="h-30 w-40 object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                            src={urlFor(result.fasilitas.image1)}
                            alt=""
                          />
                        </div>
                        <div className="relative h-24 w-40 md:h-24 md:w-30 flex-shrink-0 hover:scale-105 transform transition duration-300 ease-out">
                          <img
                            className="h-30   w-40 object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                            src={urlFor(result.fasilitas.image2)}
                            alt=""
                          />
                        </div>
                        <div className="relative h-24  w-40 md:h-24 md:w-30 flex-shrink-0 hover:scale-105 transform transition duration-300 ease-out">
                          <img
                            className="h-30 w-40 object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                            src={urlFor(result.fasilitas.image3)}
                            alt=""
                          />
                        </div>
                        <div className="relative h-24 w-40  md:h-24 md:w-30 flex-shrink-0 hover:scale-105 transform transition duration-300 ease-out">
                          <img
                            className="h-30 w-40 object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                            src={urlFor(result.fasilitas.image4)}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {/* <img className='h-30 w-40 object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={urlFor(result.mainImage)} alt="" /> */}
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
