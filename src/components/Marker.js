"use client";
import { Marker } from "@react-google-maps/api";
import { useState } from "react";

export default function MarkerComponent({
  listing,
  setSelectedListing,
  price_per_night,
}) {
  const [isClicked, setIsClicked] = useState(false);

  const handleMarkerClick = () => {
    setSelectedListing(listing);
    setIsClicked(!isClicked);
  };

  return (
    <Marker
      position={{ lat: listing.lat, lng: listing.lng }}
      onClick={handleMarkerClick}
      icon={{
        url: isClicked ? "/hovered-marker.png" : "/default-marker.png",
        scaledSize: new window.google.maps.Size(40, 40),
        // labelOrigin: new window.google.maps.Point(20, 50),
      }}
      label={{
        text: `$${price_per_night}`,
        color: isClicked ? "white" : "black",
        fontSize: "10px",
        fontWeight: "bold",
        className: `px-1 py-1 rounded ${
          isClicked ? "bg-black" : "bg-gray-500"
        }`,
      }}
    />
  );
}
