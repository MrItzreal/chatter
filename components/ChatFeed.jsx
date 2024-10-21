"use client";
import { useState } from "react";
import { SendSVG } from "@utils/svgfuncs";
import { Menu, X } from "@utils/svgfuncs";
import ChatList from "./ChatList";

const ChatFeed = () => {
  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    // TODO: Implement send message functionality
    console.log("Sending message:", message);
    setMessage("");
  };

  //Toggles mobile navigation
  const [toggleDropdown, setToggleDropdown] = useState(false);

  //Toggles navigation bar icons.
  const toggleNavbar = () => {
    setToggleDropdown(!toggleDropdown);
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
          {toggleDropdown ? (
            <X className="h-9 w-9 fill-white" />
          ) : (
            <Menu className="h-9 w-9 fill-white" />
          )}
        </button>
        {toggleDropdown && (
          <div className="relative w-full z-50">
            <ChatList />
          </div>
        )}
      </header>

      {/* Chat Messages Area */}
      <main className="flex-grow p-4 overflow-y-auto">
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
