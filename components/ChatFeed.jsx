"use client";
import { useState } from "react";
import { SendSVG } from "@utils/svgfuncs";
import { Menu, X } from "@utils/svgfuncs";

const ChatFeed = ({ isVisible, toggleNavbar }) => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    // TODO: Implement send message functionality
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <div className="bg-sky-600 border-2 rounded-r-lg flex flex-col sm:px-24 px-0 sm:h-full h-screen">
      {/* Header */}
      <header className="relative p-4 border-b-2 border-sky-700">
        <div className="text-white text-xl text-center sm:text-2xl font-bold">
          Richter Belmont
          <p className="text-sm text-center italic font-extrabold">
            Slaying Vampires!
          </p>
        </div>
        <button
          onClick={toggleNavbar}
          className="sm:hidden absolute top-5 flex items-center"
        >
          {isVisible ? (
            <X className="h-9 w-9 fill-white" />
          ) : (
            <Menu className="h-9 w-9 fill-white" />
          )}
        </button>
      </header>

      {/* Chat Messages Area */}
      <main className="flex-grow p-4 overflow-y-auto no-scrollbar">
        {/* TODO: Add chat messages here */}
        <p className="text-white text-center italic">No messages yet</p>
      </main>

      {/* Message Input Area */}
      <section className="p-4 border-t-2 border-sky-700">
        <div className="flex items-center bg-white rounded-full overflow-hidden">
          <input
            type="text"
            className="flex-grow px-4 py-2 w-96 outline-none"
            placeholder="Type a message..."
            value={message}
            onChange={handleMessageChange}
          />
          <button
            onClick={handleSendMessage}
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
