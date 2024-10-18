"use client";
import { useState } from "react";
import Image from "next/image";
import { EditPencil, PlusSign } from "@utils/svgfuncs";

const ChatList = () => {
  const [status, setStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-sky-600 border-2 rounded-r-lg flex flex-col flex-grow p-3">
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3">
        <Image
          src="/assets/images/placeholder.jpg"
          alt="user_image"
          width={60}
          height={60}
          className="rounded-full object-contain"
        />
        <div className="flex flex-col font-bold flex-grow w-full sm:w-auto">
          <h2 className="flex items-center justify-center sm:justify-normal text-white text-xl sm:text-2xl font-bold">
            Alucard Tepes
          </h2>
          <div className="flex items-center w-full">
            {isEditing ? (
              <input
                type="text"
                className="relative sm:right-4 border sm:border-4 border-double rounded outline-none flex-grow placeholder:text-center text-xs sm:text-sm px-2 py-1 scale-90"
                placeholder="Share an update..."
                value={status}
                onChange={handleStatusChange}
                onBlur={toggleEdit}
              />
            ) : (
              <p className="flex-grow flex items-center justify-center sm:justify-normal text-white text-sm font-extrabold italic">
                {status || "What's on your mind?"}
              </p>
            )}
            <button
              onClick={toggleEdit}
              className="text-white hover:text-gray-200 flex-shrink-0"
            >
              <EditPencil className="flex justify-end relative right-2 w-6 h-6 m-2 fill-slate-200 transition-all duration-300 hover:scale-110 hover:opacity-80" />
            </button>
          </div>
        </div>
      </div>

      {/* NEW CHAT BTN */}
      <div className="flex justify-center mt-2 text-white">
        <button className="flex justify-center items-center border-2 rounded-2xl w-32 transition-all duration-300 hover:scale-110 hover:opacity-80">
          <p className="font-bold italic text-base">New Chat</p>
          <div className="text-white hover:text-gray-200">
            <PlusSign className="relative left-2 w-5 h-5 fill-white scale-110" />
          </div>
        </button>
      </div>

      <p className="flex flex-col justify-start mt-4 font-bold text-base text-white">
        Chat Lists:
      </p>

      {/* CHAT LIST */}
      <div className="flex justify-start mt-2 text-white">
        <div className="flex justify-center items-center border-2 rounded-md w-full h-16 transition-all duration-300 hover:bg-slate-300  cursor-pointer">
          <div className="text-white hover:text-gray-700">
            <h1 className="font-bold italic text-base">Richter Belmont</h1>
            <p>Lorem ipsum dolor</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
