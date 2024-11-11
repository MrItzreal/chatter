"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { EditPencil, PlusSign } from "@utils/svgfuncs";
import { useSession } from "next-auth/react";

const ChatList = ({ socket }) => {
  const { data: session, status } = useSession();
  const [update, setUpdate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [chats, setChats] = useState([]);
  const [allUsers, setAllUsers] = useState();

  // Fetch Usernames
  useEffect(() => {
    const fetchUsernames = async () => {
      const res = await fetch("/api/users");
      const data = res.json();

      setAllUsers(data);
    };
    fetchUsernames();
  }, []);

  const handleStatusChange = (e) => {
    setUpdate(e.target.value);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleNewChat = () => {
    socket.emit("newChat");

    const newChat = {
      id: chats.length + 1,
      username: `Username ${chats.length + 1}`,
      lastMessage: "Some conversation taking place...",
    };
    setChats([newChat, ...chats]);
  };

  const handleChatSelect = (chatId, username) => {
    socket.emit("chatSelected", chatId, username);
    console.log(handleChatSelect, chatId, username);
  };

  return (
    <div className="bg-sky-600 border-2 border-l-0 flex flex-col p-4 sm:w-[280px] flex-1">
      {status === "authenticated" && session?.user && (
        <div className="flex flex-col items-center gap-3 mb-4">
          <Image
            src="/assets/images/placeholder.jpg"
            alt="user_image"
            width={80}
            height={80}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col w-full">
            <h2 className="text-white text-xl font-bold text-center mb-2">
              {session.user.username}
            </h2>
            <div className="flex items-center justify-center gap-2">
              {isEditing ? (
                <input
                  type="text"
                  className="border-2 border-double rounded outline-none text-sm px-2 py-1 w-full"
                  placeholder="Share an update..."
                  value={update}
                  onChange={handleStatusChange}
                  onBlur={toggleEdit}
                />
              ) : (
                <p className="text-white text-sm font-extrabold italic">
                  {update || "What's on your mind?"}
                </p>
              )}
              <button
                onClick={toggleEdit}
                className="text-white hover:text-gray-200"
              >
                <EditPencil className="w-5 h-5 fill-slate-200 transition-all duration-300 hover:scale-110 hover:opacity-80" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleNewChat}
        className="flex justify-center items-center border-2 rounded-full h-10 px-4 mb-4 text-white transition-all duration-300 hover:bg-sky-700 hover:scale-105"
      >
        <p className="font-bold italic text-base mr-2">New Chat</p>
        <PlusSign className="w-5 h-5 fill-white" />
      </button>

      <h3 className="font-bold text-lg text-white mb-2">Chat Lists:</h3>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center border-2 rounded-md mb-2 p-2 transition-all duration-300 hover:bg-sky-700 cursor-pointer"
            onClick={() => handleChatSelect(chat.username)}
          >
            <div className="text-white">
              <h4 className="font-bold italic text-base">{chat.username}</h4>
              <p className="text-sm truncate">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
