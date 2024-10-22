"use client";
import { useState } from "react";
import ChatSettings from "./ChatSettings";
import ChatList from "./ChatList";
import ChatFeed from "./ChatFeed";

const ChatApp = () => {
  //Toggles mobile navigation
  const [toggleDropdown, setToggleDropdown] = useState(false);

  //Toggles navigation bar icons.
  const toggleNavbar = () => {
    setToggleDropdown(!toggleDropdown);
  };
  return (
    <div className="container mx-auto z-0">
      <main className="flex h-screen justify-center sm:py-48 py-0">
        {toggleDropdown && <ChatSettings />}
        {toggleDropdown && <ChatList />}
        <ChatFeed isVisible={toggleDropdown} toggleNavbar={toggleNavbar} />
      </main>
    </div>
  );
};

export default ChatApp;
