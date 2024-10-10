"use client";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import MarkerComponent from "./Marker";
import { useState } from "react";
import ListingDetails from "./ListingDetails";
import { IoClose, IoHeartOutline, IoHeart } from "react-icons/io5";
import RelatedFile from "./related";

const mapContainerStyle = {
  width: "100vw",
  height: "86vh",
};

const center = {
  lat: 24.7136, // Center point
  lng: 46.6753,
};

const Map = ({ listings }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDKqPU_I4U0CDznIotEnvx5WHu7B86YDkQ", // Store your API key in env
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [relatedFileHeight, setRelatedFileHeight] = useState(50); // Initial height of RelatedFile (in px)

  // Handle the resizing logic for RelatedFile when dragged
  const handleMouseDown = (e) => {
    const startY = e.clientY;

    const onMouseMove = (moveEvent) => {
      const currentY = moveEvent.clientY;
      const heightDelta = startY - currentY;
      const newHeight = Math.min(
        Math.max(50, relatedFileHeight + heightDelta),
        window.innerHeight * 0.8
      ); // Limit between 50px and 80vh
      setRelatedFileHeight(newHeight);
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleClose = () => {
    setSelectedListing(null);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const [selectedListing, setSelectedListing] = useState(null);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;
  return (
    <>
      <div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={center}
          className="w-full"
        >
          {listings.map((listing) => (
            <MarkerComponent
              key={listing.lat + listing.lng}
              listing={listing}
              price_per_night={listing.price_per_night}
              setSelectedListing={setSelectedListing}
            />
          ))}
        </GoogleMap>

        {selectedListing && (
          <div className=" md:w-96 w-[90vw] absolute bottom-5 left-5 bg-white rounded-lg shadow-md z-50 text-black p-4 max-w-full">
            <div className="relative">
              <img
                src={selectedListing.image}
                alt={selectedListing.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />

              <div className="absolute top-3 right-3 flex space-x-2">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="bg-white text-gray-600 hover:text-black rounded-full p-1.5 shadow-md"
                >
                  <IoClose size={18} />
                </button>

                {/* Bookmark Button */}
                <button
                  onClick={toggleBookmark}
                  className={`bg-white rounded-full p-1.5 shadow-md ${
                    isBookmarked
                      ? "text-red-500"
                      : "text-gray-600 hover:text-red-500"
                  }`}
                >
                  {isBookmarked ? (
                    <IoHeart size={18} />
                  ) : (
                    <IoHeartOutline size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="p-3">
              <h3 className="text-lg font-semibold truncate">
                {selectedListing.name}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {selectedListing.location}
              </p>

              <div className="flex justify-between items-center mt-2">
                <p className="text-lg font-bold">
                  {selectedListing.price_per_night} SAR
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">
                    {selectedListing.rating}
                  </span>{" "}
                  ({selectedListing.reviews_count} reviews)
                </p>
              </div>

              <p className="text-xs text-gray-500 mt-1">Oct 13 – 18</p>
            </div>
          </div>
        )}
      </div>
      <div
        className="fixed bottom-0 left-1/2 transform h-14 -translate-x-1/2 w-[98%] bg-gray-200 z-50 overflow-hidden rounded-t-lg"
        style={{ height: `${relatedFileHeight}px` }}
      >
        <div
          className="cursor-ns-resize h-full"
          onMouseDown={handleMouseDown}
        ></div>
        <RelatedFile className="bg-inherit" />
      </div>
    </>
  );
};

export default Map;
