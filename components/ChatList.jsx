"use client";
import { useState } from "react";
import Image from "next/image";
import { EditPencil } from "@utils/svgfuncs";

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
              <EditPencil className="relative right-2 w-6 h-6 fill-slate-200 transition-all duration-300 hover:scale-110 hover:opacity-80 " />
            </button>
          </div>
        </div>
      </div>
      {/* Placeholder for conversation list */}
      <div className="mt-4 text-white">
        <p>Conversations will be displayed here</p>
      </div>
    </div>
  );
};

export default ChatList;
