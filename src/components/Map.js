"use client";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import MarkerComponent from "./Marker";
import { useState } from "react";
import { IoClose, IoHeartOutline, IoHeart } from "react-icons/io5";
import Related from "./Related";

const mapContainerStyle = {
  width: "100vw",
  height: "89.8vh",
};

const center = {
  lat: 24.7136, // Center point
  lng: 46.6753,
};

const Map = ({ listings }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDKqPU_I4U0CDznIotEnvx5WHu7B86YDkQ", // Store your API key in env
  });

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [relatedFileHeight, setRelatedFileHeight] = useState(50); // Initial height of RelatedFile (in px)
  const [selectedListing, setSelectedListing] = useState(null);
  const [dragging, setDragging] = useState(false); // Track drag state

  const handleClose = () => {
    setSelectedListing(null);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Draggable component logic
  const handleMouseDown = (e) => {
    setDragging(true);
    const startY = e.clientY;

    const onMouseMove = (moveEvent) => {
      if (dragging) {
        const currentY = moveEvent.clientY;
        const heightDelta = startY - currentY;
        const newHeight = Math.min(
          Math.max(50, relatedFileHeight + heightDelta),
          window.innerHeight * 0.9 // Drag up to 90% of the viewport height
        );
        setRelatedFileHeight(newHeight);
      }
    };

    const onMouseUp = () => {
      setDragging(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

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
          <div className=" md:w-96 w-[85vw] absolute bottom-20 left-5 bg-white rounded-lg shadow-md z-150 text-black p-4 max-w-full">
            <div className="relative">
              <img
                src={selectedListing.image}
                alt={selectedListing.name}
                className="w-full h-40 object-cover rounded-t-lg"
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

      {/* Draggable component */}
      <div
        className="fixed bottom-0 px-5 left-1/2 transform h-20 -translate-x-1/2 w-[99%] bg-white z-50 rounded-t-3xl overflow-hidden overflow-y-auto md:hidden"
        style={{
          height: `${relatedFileHeight}px`,
          transition: dragging ? "none" : "height 0.3s ease", // Animate height when not dragging
        }}
      >
        {/* Drag handle */}
        <div
          className="cursor-ns-resize h-5 pb-16 "
          onMouseDown={handleMouseDown}
        >
          <div className="flex flex-col justify-center items-center mt-3 ">
            <div className="bg-gray-300 w-12 h-1 rounded-full mb-4" />
            <p className="text-lg font-bold text-black">Over 1,000 places</p>
          </div>
        </div>

        {/* Imported component inside the draggable area */}
        <div className="  flex pb-10 flex-col justify-center items-center gap-8 px-3">
          <div className="flex border border-slate-400 rounded-2xl h-20 w-full items-center justify-between py-3 px-4">
            <div className="  text-lg font-normal">
              <p className=" text-black">Display total price</p>
              <p className="  text-gray-400">Include all fees,before taxes</p>
            </div>
            <div className="bg-black rounded-3xl h-8 w-14">
              <div className="bg-white h-8 w-8 rounded-full border-2 border-black"></div>
            </div>
          </div>
          {listings.map((item, index) => (
            <Related key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Map;
