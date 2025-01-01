"use client";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useSession } from "next-auth/react";
import ChatSettings from "./ChatSettings";
import ChatList from "./ChatList";
import ChatFeed from "./ChatFeed";

const ChatApp = () => {
  const [socket, setSocket] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [chatSelect, setChatSelect] = useState(null);
  const { data: session } = useSession();
  const chatListRef = useRef();

  // Desktop to Mobile based on Screen Size
  useEffect(() => {
    setIsSmallScreen(window.innerWidth < 768);
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Establish Socket.IO connection
  useEffect(() => {
    // Only attempt socket connection if user is logged in
    if (!session?.user) return;

    const newSocket = io("http://localhost:3001", {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on("connect", () => {
      console.log("Socket connected successfully!");

      // Register the username when socket connects
      if (session?.user?.username) {
        newSocket.emit("register", session.user.username);
      }

      setSocket(newSocket);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      // Clean up the socket connection when the component unmounts
      if (newSocket) {
        newSocket.disconnect();
        console.log("Socket disconnected!");
      }
    };
  }, [session?.user]);

  const toggleNavbar = () => {
    setToggleDropdown(!toggleDropdown);
  };

  // Selects chat to display from ChatList to ChatFeed
  const handleChatSelect = (username, lastMessage) => {
    setChatSelect({ username, lastMessage });
  };

  // Clear chat if deleted conversation is currently selected
  const handleConversationDelete = (username) => {
    if (chatSelect?.username === username) {
      setChatSelect({ username });
    }
    // Add ref to ChatList component
    chatListRef.current?.removeChat(username);
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
                chatSelect={chatSelect}
                onConversationDelete={handleConversationDelete}
              />
              <ChatList
                ref={chatListRef}
                socket={socket}
                chatSelect={chatSelect}
                onChatSelect={handleChatSelect}
              />
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
            <ChatFeed
              isVisible={toggleDropdown}
              toggleNavbar={toggleNavbar}
              socket={socket}
              chatSelect={chatSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
