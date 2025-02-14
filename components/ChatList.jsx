"use client";
import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import Image from "next/image";
import { EditPencil, PlusSign } from "@utils/svgfuncs";
import { useSession } from "next-auth/react";
import DropDownMenu from "./DropDownMenu";

const ChatList = ({ socket, chatSelect, onChatSelect }, ref) => {
  const { data: session, status } = useSession();
  const [update, setUpdate] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [chats, setChats] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch Usernames
  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          throw new Error("Failed to fetch usernames");
        }
        const data = await res.json();
        setAllUsers(data);
      } catch (error) {
        console.error("Error fetching usernames:", error);
      }
    };
    fetchUsernames();
  }, []);

  // Fetch Last Messages for existing chat
  useEffect(() => {
    // Check to prevent fetching if there are no chats or logged user
    if (chats.length === 0 || !session?.user?.username) return;

    const fetchLastMessages = async () => {
      try {
        const updatedChats = await Promise.all(
          chats.map(async (chat) => {
            const res = await fetch(
              `/api/messages/[id]?senderUsername=${session.user.username}&recipientUsername=${chat.username}`
            );

            if (!res.ok) {
              console.error("Error fetching latest message for", chat.username);
              return chat;
            }

            const data = await res.json();
            return {
              ...chat,
              lastMessage: data ? data.content : null,
            };
          })
        );

        setChats(updatedChats); // Updates the "chats" state
      } catch (error) {
        console.error("Error fetching latest messages:", error);
      }
    };

    // Fetch Lastest Message for current chat
    if (socket) {
      const handleLatestMessage = async (messageData) => {
        if (
          messageData.senderUsername === session.user.username ||
          messageData.recipientUsername === session.user.username
        ) {
          // Trigger fetchLastMessages to update chats
          fetchLastMessages();
        }
      };

      // Add socket listener
      socket.on("newMessage", handleLatestMessage);

      // Cleanup
      return () => {
        socket.off("newMessage", handleLatestMessage);
      };
    }

    fetchLastMessages();
  }, [chats.length, session?.user?.username, socket]); // Only run when chats or username changes

  // Updates update for user
  const handleStatusChange = (e) => {
    setUpdate(e.target.value);
  };

  // Toggles the edit icon
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Toggles New Chat Btn to find users
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Creates new chat
  const handleNewChat = async (username) => {
    if (!username) return;

    const newChat = {
      id: chats.length + 1,
      username: username,
      lastMessage: null,
    };

    // Fetch Latest Messages of newly created chat
    try {
      const res = await fetch(
        `/api/messages/[id]?senderUsername=${session.user.username}&recipientUsername=${username}`
      );

      if (res.ok) {
        const data = await res.json();
        newChat.lastMessage = data ? data.content : null;
      }
    } catch (error) {
      console.error("Error fetching last message for new chat:", error);
    }

    setChats([newChat, ...chats]);
    setIsDropdownOpen(false);

    // Only emit if socket is available
    if (socket) {
      socket.emit("chatSelected", username);
    } else {
      console.warn("Socket is not connected. Cannot emit chatSelected event.");
    }
  };

  // This will Delete Chat if ALL messages are deleted.
  const removeChat = (username) => {
    setChats((prevChats) =>
      prevChats.filter((chat) => chat.username !== username)
    );
  };

  // Export for ref access
  useImperativeHandle(ref, () => ({
    removeChat,
  }));

  return (
    <div className="bg-bgcolor border-2 border-l-0 flex flex-col p-4 sm:w-[280px] flex-1">
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
        onClick={toggleDropdown}
        className="flex justify-center items-center border-2 rounded-full h-10 px-4 mb-4 text-white transition-all duration-300 hover:bg-hover hover:scale-105"
      >
        <p className="font-bold italic text-base mr-2">New Chat</p>
        <PlusSign className="w-5 h-5 fill-white" />
      </button>

      {/* Drop Down Menu */}
      {isDropdownOpen && (
        <DropDownMenu
          allUsers={allUsers}
          onUserSelect={handleNewChat}
          onChatSelect={onChatSelect}
        />
      )}

      <h3 className="font-bold text-lg text-white mb-2">Chat Lists:</h3>

      <div className="flex-1 overflow-y-auto overflow-x-auto no-scrollbar">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat.username, chat.lastMessage)}
            className="flex items-center border-2 rounded-md mb-2 p-2 transition-all duration-300 hover:bg-hover cursor-pointer"
          >
            <div className="text-white max-w-32 overflow-x-auto no-scrollbar">
              <span className="font-bold text-base">{chat.username}</span>
              <p className="text-sm truncate italic">{chat.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default forwardRef(ChatList);
