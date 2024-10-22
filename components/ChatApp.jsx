"use client";
import { useState, useEffect } from "react";
import ChatSettings from "./ChatSettings";
import ChatList from "./ChatList";
import ChatFeed from "./ChatFeed";

const ChatApp = () => {
  // Toggles mobile navigation
  const [toggleDropdown, setToggleDropdown] = useState(false);

  // Toggles navigation bar icons.
  const toggleNavbar = () => {
    setToggleDropdown(!toggleDropdown);
  };

  // Track screen size
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container mx-auto z-0">
      <main className="flex h-screen justify-center sm:py-48 py-0">
        {(toggleDropdown || !isSmallScreen) && <ChatSettings />}
        {(toggleDropdown || !isSmallScreen) && <ChatList />}
        <ChatFeed isVisible={toggleDropdown} toggleNavbar={toggleNavbar} />
      </main>
    </div>
  );
};

export default ChatApp;
