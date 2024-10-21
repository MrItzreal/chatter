"use client";
import { useState } from "react";
import ChatSettings from "./ChatSettings";
import ChatList from "./ChatList";
import ChatFeed from "./ChatFeed";

const ChatApp = () => {
  return (
    <div className="container mx-auto z-0">
      <main className="flex h-screen justify-center sm:py-48 py-0">
        <ChatSettings />
        <ChatList />
        <ChatFeed />
      </main>
    </div>
  );
};

export default ChatApp;
