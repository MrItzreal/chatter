"use client";
import { useState } from "react";
import ChatSettings from "./ChatSettings";
import ChatList from "./ChatList";
import ChatFeed from "./ChatFeed";
import { Menu, X } from "@utils/svgfuncs";

const ChatApp = () => {
  //Toggles mobile navigation
  const [toggleDropdown, setToggleDropdown] = useState(false);
  return (
    <div className="container mx-auto">
      <main className="flex justify-center py-40">
        <ChatSettings />
        <ChatList />
        <ChatFeed />
      </main>
    </div>
  );
};

export default ChatApp;
