import { useState } from "react";
import { IoHeartOutline, IoHeart } from "react-icons/io5";

const DraggableDiv = () => {
  return (
    <>
      <div className="md:w-96 w-[90vw] absolute bottom-5 left-5 bg-white rounded-lg shadow-md z-50 text-black p-4 max-w-full">
        <div className="relative">
          <img
            src={selectedListing.image}
            alt={selectedListing.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-3 right-3 flex space-x-2">
            {/* Close Button */}
            <button
              onClick={() => setSelectedListing(null)}
              className="bg-white text-gray-600 hover:text-black rounded-full p-1.5 shadow-md"
            >
              <IoClose size={18} />
            </button>

            {/* Bookmark Button */}
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
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
              <span className="font-semibold">{selectedListing.rating}</span> (
              {selectedListing.reviews_count} reviews)
            </p>
          </div>

          <p className="text-xs text-gray-500 mt-1">Oct 13 – 18</p>
        </div>
      </div>
    </>
  );
};

export default DraggableDiv;
