"use client";
import { useState, useEffect } from "react";
import { SendSVG, Menu, X } from "@utils/svgfuncs";
import { useSession } from "next-auth/react";

const ChatFeed = ({ isVisible, toggleNavbar, socket, chatSelect }) => {
  const [messages, setMessages] = useState([]); //old messages
  const [newMessage, setNewMessage] = useState(""); //new messages
  const { data: session } = useSession();

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
      console.log("Message Sent!");
    }
  };

  // Send New Messages
  const sendMessage = () => {
    const message = {
      senderId: session.user.id,
      recipientUsername: chatSelect.username,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    socket.emit("sendMessage", message);
    console.log("Sending message:", message);
    setNewMessage("");
  };

  // Listen for Messages
  useEffect(() => {
    if (socket) {
      // Define listener
      const handleMessages = (messages) => {
        setMessages(messages);
      };

      // Attach listener
      socket.on("messages", handleMessages);

      // Cleanup function to remove listener on unmount
      return () => {
        socket.off("messages", handleMessages);
      };
    } else {
      // Handle the case when there's no socket
      if (socket && socket.close) {
        socket.close();
      }
      console.log("Could not retrieve messages", messages);
    }
  }, [socket]);

  return (
    <div className="bg-sky-600 border-2 rounded-r-lg flex flex-col h-full">
      <header className="relative p-4 border-b-2 border-sky-700">
        <button
          onClick={toggleNavbar}
          className="sm:hidden absolute left-4 top-1/2 -translate-y-1/2"
        >
          {isVisible ? (
            <X className="h-10 w-10 fill-white" />
          ) : (
            <Menu className="h-10 w-10 fill-white" />
          )}
        </button>

        <div className="text-center">
          <h1 className="text-white text-xl sm:text-2xl font-bold">
            {chatSelect ? chatSelect.username : "Select A Chat"}
          </h1>
          <p className="text-sm text-white italic font-extrabold">
            Slaying Vampires!
          </p>
        </div>
      </header>

      {/* Chat Feed */}
      <main className="flex-1 p-4 overflow-y-auto no-scrollbar">
        <p
          className={`text-white text-balance italic ${
            !chatSelect ? "text-center" : ""
          }`}
        >
          {chatSelect ? chatSelect.lastMessage : "No Messages Yet"}
        </p>
      </main>

      {/* Send Text/Button */}
      <section className="p-4 border-t-2 border-sky-700">
        <div className="flex items-center bg-white rounded-full overflow-hidden max-w-3xl mx-auto">
          <input
            type="text"
            className="flex-1 px-4 py-2 outline-none"
            placeholder="Type a message..."
            value={newMessage}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={sendMessage}
            className="p-2 bg-sky-700 hover:bg-sky-800 transition-colors duration-300"
          >
            <SendSVG className="w-6 h-6 fill-white" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ChatFeed;
