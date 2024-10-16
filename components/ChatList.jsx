"use client";
import { useState } from "react";
import Image from "next/image";
import EditPencil from "@utils/svgfuncs";

const ChatList = () => {
  const [message, setMessage] = useState("");

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
        <div className="flex flex-col font-bold">
          <h2 className="flex items-center text-white text-2xl font-bold">
            Alucard Tepes
          </h2>
          <input
            type="text"
            className="border-4 border-double rounded outline-none px-3 h-6"
            placeholder="Share an update..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatList;
