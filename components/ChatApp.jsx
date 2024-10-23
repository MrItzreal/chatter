"use client";
import { useState, useEffect } from "react";
import ChatSettings from "./ChatSettings";
import ChatList from "./ChatList";
import ChatFeed from "./ChatFeed";

const ChatApp = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 768);
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleNavbar = () => {
    setToggleDropdown(!toggleDropdown);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-7xl mx-auto h-[700px] my-8 sm:my-24 rounded-lg overflow-hidden shadow-2xl">
        <div className="relative w-full h-full flex">
          {/* Settings and ChatList wrapper */}
          <div
            className={`
              ${
                isSmallScreen ? "absolute inset-0 z-30 w-full" : "relative flex"
              } 
              ${toggleDropdown || !isSmallScreen ? "flex" : "hidden"}
            `}
          >
            <div className={`${isSmallScreen ? "flex w-full" : "flex"}`}>
              <ChatSettings
                isVisible={toggleDropdown}
                toggleNavbar={toggleNavbar}
              />
              <ChatList />
            </div>
          </div>

          {/* ChatFeed wrapper */}
          <div
            className={`
              flex-1 relative
              ${isSmallScreen && toggleDropdown ? "hidden" : "block"}
              ${isSmallScreen ? "w-full" : "ml-auto"}
            `}
          >
            <ChatFeed isVisible={toggleDropdown} toggleNavbar={toggleNavbar} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
