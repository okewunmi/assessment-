"use client";

import { useState } from "react";
import { IoClose, IoHeartOutline, IoHeart } from "react-icons/io5";

export default function ListingDetails({ listing }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  if (!isVisible) return null; // Hide the card when it's not visible

  return (
    <div className="relative">
      <div className="absolute bottom-5 left-5 bg-white p-2.5 rounded-lg shadow-md z-50 max-w-xs text-black">
        <img
          src={listing.image}
          alt={listing.name}
          className="w-full rounded-md"
        />
        <h2>{listing.name}</h2>
        <p>{listing.location}</p>
        <p>Price per night: {listing.price_per_night} SAR</p>
        <p>
          Rating: {listing.rating} ({listing.reviews_count} reviews)
        </p>

        <div className="flex space-x-5 absolute top-3 p-2">
          <button
            onClick={handleClose}
            className="  text-gray-600 hover:text-black bg-white rounded-full p-2"
          >
            <IoClose size={20} />
          </button>

          {/* Bookmark Button */}
          <button
            onClick={toggleBookmark}
            className=" text-gray-600 hover:text-red-500 bg-white rounded-full p-2"
          >
            {isBookmarked ? (
              <IoHeart size={20} />
            ) : (
              <IoHeartOutline size={22} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
