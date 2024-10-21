"use client";
import { useState } from "react";
import Image from "next/image";
import { EditPencil, PlusSign } from "@utils/svgfuncs";

const ChatList = () => {
  const [status, setStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [chats, setChats] = useState([
    { id: 1, name: "Richter Belmont", lastMessage: "Lorem ipsum dolor" },
    { id: 2, name: "Maria Renard", lastMessage: "Sit amet consectetur" },
  ]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Adds a hardcoded conversation
  const handleNewChat = () => {
    const newChat = {
      id: chats.length + 1,
      name: `New Chat ${chats.length + 1}`,
      lastMessage: "Start a new conversation",
    };
    setChats([newChat, ...chats]);
  };

  return (
    <div className="bg-sky-600 border-2 md:flex flex-col p-4 hidden h-full">
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-4">
        <Image
          src="/assets/images/placeholder.jpg"
          alt="user_image"
          width={60}
          height={60}
          className="rounded-full object-contain"
        />
        <div className="flex flex-col font-bold flex-grow">
          <h2 className="flex items-center justify-center sm:justify-normal text-white text-xl sm:text-2xl font-bold mb-2">
            LemonSqueeze
          </h2>
          <div className="flex items-center relative">
            {isEditing ? (
              <input
                type="text"
                className=" border-2 sm:border-4 border-double rounded outline-none text-xs sm:text-sm px-2 py-1"
                placeholder="Share an update..."
                value={status}
                onChange={handleStatusChange}
                onBlur={toggleEdit}
              />
            ) : (
              <p className="text-center sm:text-left text-white text-sm font-extrabold italic">
                {status || "What's on your mind?"}
              </p>
            )}
            <button
              onClick={toggleEdit}
              className="relative text-white hover:text-gray-200"
            >
              <EditPencil className="relative left-2 w-5 h-5 fill-slate-200 transition-all duration-300 hover:scale-110 hover:opacity-80" />
            </button>
          </div>
        </div>
      </div>

      {/* NEW CHAT BTN */}
      <div className="flex justify-center">
        <button
          onClick={handleNewChat}
          className="flex justify-center items-center border-2 rounded-full h-7 p-3 mb-4 text-white transition-all duration-300 hover:bg-sky-700 hover:scale-105"
        >
          <p className="font-bold italic text-base mr-2">New Chat</p>
          <PlusSign className="w-5 h-5 fill-white" />
        </button>
      </div>

      {/* CHAT LIST */}
      <h3 className="font-bold text-lg text-white mb-2">Chat Lists:</h3>

      <div className="flex-grow overflow-y-auto no-scrollbar">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center border-2 rounded-md mb-2 p-2 transition-all duration-300 hover:bg-sky-700 cursor-pointer"
          >
            <div className="text-white">
              <h4 className="font-bold italic text-base">{chat.name}</h4>
              <p className="text-sm truncate">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
