"use client";
import { useState, useEffect } from "react";
import { SendSVG, Menu, X } from "@utils/svgfuncs";

const ChatFeed = ({ isVisible, toggleNavbar, socket }) => {
  const [messages, setMessages] = useState([]); //old messages
  const [newMessage, setNewMessage] = useState(""); //new messages

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    // Listen for incoming messages
    if (socket) {
      socket.on("chat message", (message) => {
        if (message.sender && message.content && message.timestamp) {
          setMessages((prevMessages) => [...prevMessages, message]);
        } else {
          console.log("Invalid structure received", message);
        }
      });
    }
    // Cleanup listener when component unmounts
    return () => {
      if (socket) {
        socket.off("chat message");
      }
    };
  }, [socket]);

  // Send New Messages
  const sendMessage = () => {
    const message = {
      sender: _id, // or a unique user ID
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    socket.emit("chat message", message);
    console.log("Sending message:", message);
    setNewMessage("");
  };

  // Listen for messages
  useEffect(() => {
    if (socket) {
      // Define listener
      const handleMessages = (messages) => {
        setMessages(messages);
      };

      // Attach listener
      socket.on("messages", handleMessages);

      // Cleanup function to remove listener on unmount
      return () => {
        socket.off("messages", handleMessages);
      };
    } else {
      // Handle the case when there's no socket
      if (socket && socket.close) {
        socket.close();
      }
      console.log("Could not retrieve messages", messages);
    }
  }, [socket]);

  return (
    <div className="bg-sky-600 border-2 rounded-r-lg flex flex-col h-full">
      <header className="relative p-4 border-b-2 border-sky-700">
        <button
          onClick={toggleNavbar}
          className="sm:hidden absolute left-4 top-1/2 -translate-y-1/2"
        >
          {isVisible ? (
            <X className="h-10 w-10 fill-white" />
          ) : (
            <Menu className="h-10 w-10 fill-white" />
          )}
        </button>

        <div className="text-center">
          <h1 className="text-white text-xl sm:text-2xl font-bold">
            Richter Belmont
          </h1>
          <p className="text-sm text-white italic font-extrabold">
            Slaying Vampires!
          </p>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-y-auto no-scrollbar">
        {messages.map((message, idx) => (
          <p key={idx} className="text-white text-center italic">
            {message}
          </p>
        ))}
      </main>

      <section className="p-4 border-t-2 border-sky-700">
        <div className="flex items-center bg-white rounded-full overflow-hidden max-w-3xl mx-auto">
          <input
            type="text"
            className="flex-1 px-4 py-2 outline-none"
            placeholder="Type a message..."
            value={newMessage}
            onChange={handleMessageChange}
          />
          <button
            onClick={sendMessage}
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
