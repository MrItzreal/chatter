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
      <div className="flex items-center gap-3">
        <Image
          src="/assets/images/placeholder.jpg"
          alt="user_image"
          width={60}
          height={60}
          className="rounded-full object-contain"
        />
        <div className="flex flex-col font-bold flex-grow">
          <h2 className="flex items-center text-white text-2xl font-bold">
            Alucard Tepes
          </h2>
          <div className="flex items-center">
            {isEditing ? (
              <input
                type="text"
                className="border-4 border-double rounded outline-none px-3 h-8 flex-grow"
                placeholder="Share an update..."
                value={status}
                onChange={handleStatusChange}
                onBlur={toggleEdit}
              />
            ) : (
              <p className="text-white text-sm">
                {status || "What's on your mind?"}
              </p>
            )}
            <button
              onClick={toggleEdit}
              className="ml-2 text-white hover:text-gray-200"
            >
              <EditPencil className="fill-white" />
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
