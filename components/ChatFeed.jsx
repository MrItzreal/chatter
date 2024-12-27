"use client";
import { useState, useEffect } from "react";
import { SendSVG, Menu, X, DotIcon } from "@utils/svgfuncs";
import { useSession } from "next-auth/react";

const ChatFeed = ({ isVisible, toggleNavbar, socket, chatSelect }) => {
  const [messages, setMessages] = useState([]); //old messages
  const [newMessage, setNewMessage] = useState(""); //new messages
  const [isEditing, setIsEditing] = useState(false);
  const [updatedMessage, setUpdatedMessage] = useState("");
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [activeMessageId, setActiveMessageId] = useState(null);
  const { data: session } = useSession();

  //Dot Menu Option
  const toggleDotMenu = (messageId) => {
    if (activeMessageId === messageId) {
      setActiveMessageId(null); // Close the menu if clicking the same message
    } else {
      setActiveMessageId(messageId); // Open menu for clicked message
    }
  };

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  // Allows typing in editable field
  const handleStatusChange = (e) => {
    setUpdatedMessage(e.target.value);
  };

  // Send New Messages
  const sendMessage = () => {
    if (!socket || !chatSelect || !newMessage.trim()) return;

    const message = {
      senderId: session.user.id,
      senderUsername: session.user.username,
      recipientUsername: chatSelect.username,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    socket.emit("sendMessage", message);
    console.log("Sending Message:", message);
    console.log("Message Sent!");
    setNewMessage("");
  };

  // Listen for Messages
  useEffect(() => {
    if (socket && chatSelect && session?.user?.username) {
      // Fetch conversation between current user & selected chat recipient
      socket.emit("fetchConversation", {
        currentUsername: session.user.username,
        recipientUsername: chatSelect.username,
      });

      // Handle initial conversation messages
      const handleConversationMessages = (conversationMessages) => {
        setMessages(conversationMessages);
      };

      // Listen for new messages
      const handleNewMessage = (message) => {
        // Only add if it's part of current conversation
        if (
          (message.senderUsername === chatSelect.username &&
            message.recipientUsername === session.user.username) ||
          (message.senderUsername === session.user.username &&
            message.recipientUsername === chatSelect.username)
        ) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      };

      // Sets the initial conversation messages directly
      socket.on("conversationMessages", handleConversationMessages);
      // Handles incoming new messages with the filtering logic
      socket.on("newMessage", handleNewMessage);

      // Cleanup
      return () => {
        socket.off("conversationMessages", handleConversationMessages);
        socket.off("newMessage", handleNewMessage);
      };
    }
  }, [socket, chatSelect, session?.user?.username]);

  // Edit Messages
  const handleEdit = (message) => {
    try {
      if (message) {
        setIsEditing(true);
        setEditingMessageId(message._id);
        setUpdatedMessage(message.content);
      } else {
        // Handle cancel
        setIsEditing(false);
        setEditingMessageId(null);
        setUpdatedMessage("");
        setActiveMessageId(true);
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to edit message.");
    }
  };

  // Save Edited Messages
  const handleSave = async (message) => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: updatedMessage,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prevMessages) =>
          prevMessages.map((m) =>
            m._id === message._id ? { ...m, content: updatedMessage } : m
          )
        );

        // Reset editing states
        setIsEditing(false);
        setEditingMessageId(null);
        setUpdatedMessage("");
        setActiveMessageId(null);
      } else {
        throw new Error(data.message || "Failed to update message");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update message");
    }
  };

  // Delete Messages
  const handleDelete = async (message) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this message?"
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/messages/${message._id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete message");
        }

        const filteredMessages = messages.filter((m) => m._id !== message._id);
        setMessages(filteredMessages);
        setActiveMessageId(null);
      } catch (error) {
        console.error("Error:", error.message);
        alert("Failed to delete message.");
      }
    }
  };

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
            {chatSelect ? chatSelect.username : "Select A Chat"}
          </h1>
          <p className="text-sm text-white italic font-extrabold">
            Slaying Vampires!
          </p>
        </div>
      </header>

      {/* Chat Feed */}
      <main className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-4 cursor-pointer">
        {messages.map((message) => (
          <div
            key={message._id}
            className="flex flex-col 
        rounded-lg 
        shadow-md 
        p-3 
        max-w-full 
        transition-all 
        duration-300 
        hover:bg-sky-700 
        hover:shadow-lg
        border-l-4 
        border-r-4 
        border-sky-500"
          >
            {isEditing && message._id === editingMessageId ? (
              <input
                type="text"
                value={updatedMessage}
                onChange={handleStatusChange}
                placeholder="Edit Message..."
                className="flex flex-col 
        rounded-lg 
        shadow-md 
        p-3 
        mb-2
        max-w-full 
        h-24
        outline-white 
        border-l-4 
        border-r-4 
       "
              />
            ) : (
              <p
                className={`text-white text-balance italic  mb-2  ${
                  !chatSelect ? "text-center" : "text-left"
                } break-words max-w-full`}
              >
                {message.content}
              </p>
            )}

            {/* EDIT/SAVE/DELETE BTNS */}
            <div className="flex items-center justify-end gap-3">
              {activeMessageId !== message._id ? (
                <button onClick={() => toggleDotMenu(message._id)}>
                  <DotIcon className="w-6 h-6 fill-white" />
                </button>
              ) : isEditing && message._id === editingMessageId ? (
                <>
                  <button
                    className="inline-flex items-center px-3 text-sm font-medium text-white transition-colors border-2 border-white/20 rounded-full hover:bg-white/10 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-blue-500"
                    onClick={() => handleSave(message)}
                  >
                    Save
                  </button>
                  <button
                    className="inline-flex items-center px-3 text-sm font-medium text-white transition-colors border-2 border-white/20 rounded-full hover:bg-white/10 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-blue-500"
                    onClick={() => handleEdit(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="inline-flex items-center px-3 text-sm font-medium text-white transition-colors border-2 border-white/20 rounded-full hover:bg-white/10 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-blue-500"
                    onClick={() => handleEdit(message)}
                  >
                    Edit
                  </button>
                  <button
                    className="inline-flex items-center px-3 text-sm font-medium text-white transition-colors border-2 border-white/20 rounded-full hover:bg-white/10 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-blue-500"
                    onClick={() => handleDelete(message)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>

            <span className="text-sm text-slate-300 font-semibold self-end mt-1">
              {new Date(message.timestamp).toLocaleString([], {
                year: "2-digit",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
          </div>
        ))}
      </main>

      {/* Send Text/Button */}
      <section className="p-4 border-t-2 border-sky-700">
        <div className="flex items-center bg-white rounded-full overflow-hidden max-w-3xl mx-auto">
          <input
            type="text"
            className="flex-1 px-4 py-2 outline-none"
            placeholder="Type a message..."
            value={newMessage}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
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
