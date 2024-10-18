"use client";
import { useState } from "react";
import { SendSVG } from "@utils/svgfuncs";
const ChatFeed = () => {
  const [send, setSend] = useState("");
  const sendMessage = (e) => {
    setSend(e.target.value);
  };
  return (
    <div className="bg-sky-600 border-2 rounded-r-lg p-3">
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-4">

        <div className="flex flex-col font-bold flex-grow w-full sm:w-auto">
          <h2 className="flex items-center justify-center sm:justify-normal text-white text-xl sm:text-2xl font-bold mb-2">
            Richter Belmont
          </h2>
          <hr className="w-full" />
        </div>
      </div>
      {/* NEW CHAT BTN */}
      <div className="flex justify-center">
        <input
          type="text"
          className="border-2 rounded-xl max-w-full font-bold text-md text-black mb-2"
          placeholder="Send a message..."
          value={send}
          onChange={sendMessage}
        ></input>
        <button className="flex justify-center items-center border-2 rounded-full   mb-4 text-white transition-all duration-300 hover:bg-sky-700 hover:scale-105">
          <SendSVG className="w-5 h-5 fill-white" />
        </button>
      </div>
    </div>
  );
};
export default ChatFeed;