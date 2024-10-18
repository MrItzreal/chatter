"use client";
import { useState } from "react";
import { SendSVG } from "@utils/svgfuncs";

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

  return (
    <div className="bg-sky-600 border-2 rounded-r-lg flex flex-col px-36">
      {/* Header */}
      <div className="p-4 border-b-2 border-sky-700">
        <h2 className="text-white text-xl text-center sm:text-2xl font-bold">
          Richter Belmont
        </h2>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-grow p-4 overflow-y-auto">
        {/* TODO: Add chat messages here */}
        <p className="text-white text-center italic">No messages yet</p>
      </div>

      {/* Message Input Area */}
      <div className="p-4 border-t-2 border-sky-700">
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
      </div>
    </div>
  );
};

export default ChatFeed;
