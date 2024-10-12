"use client";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { BsSliders } from "react-icons/bs";

const Header = () => {
  return (
    <div className="h-16 bg-white  text-black px-8 flex justify-center items-center">
      <form className="w-full flex justify-between">
        <div className="flex w-[75%] pl-4 justify-center items-center bg-gray-200 rounded-3xl">
          <IoSearch className="text-xl rounded-3xl  " />
          <input
            type="text"
            className=" w-full h-5  pl-4 bg-gray-200 border-white rounded-3xl focus:outline-none focus:border-none "
            placeholder="type here..."
          />
        </div>
        <div className="rounded-full h-10 w-10 border-2 border-solid border-black  flex justify-center items-center">
          <BsSliders className=" h-4 w-4 " />
        </div>
      </form>
    </div>
  );
};

export default Header;
