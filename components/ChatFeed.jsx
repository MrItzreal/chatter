"use client";
import { useState, useEffect, useRef } from "react";
import { SendSVG, Menu, X, DotIcon } from "@utils/svgfuncs";
import { useSession } from "next-auth/react";

const ChatFeed = ({ isVisible, toggleNavbar, socket, chatSelect }) => {
  const [messages, setMessages] = useState([]); //old messages
  const [newMessage, setNewMessage] = useState(""); //new messages
  const [isEditing, setIsEditing] = useState(false);
  const [updatedMessage, setUpdatedMessage] = useState("");
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [activeMessageId, setActiveMessageId] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState(new Set());
  const [connectionInitialized, setConnectionInitialized] = useState(false);
  const { data: session } = useSession();

  // useRef for the chatFeed container
  const chatFeedRef = useRef(null);

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

        // Scroll to the bottom after updating the state
        // Delayed to make sure the messages have been updated
        setTimeout(() => {
          chatFeedRef.current?.scrollTo({
            top: chatFeedRef.current.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
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

  // Handle Connection Status
  useEffect(() => {
    if (!socket || !chatSelect) return;

    // Handle initial connection status
    const handleInitialStatus = (users) => {
      setConnectedUsers(new Set(users));
      setConnectionInitialized(true);
    };

    // Handle individual connection updates
    const handleConnectionUpdate = (update) => {
      setConnectedUsers((prevUsers) => {
        const newUsers = new Set(prevUsers);
        if (update.status === "connected") {
          newUsers.add(update.username);
        } else {
          newUsers.delete(update.username);
        }
        return newUsers;
      });
    };

    socket.on("initialConnectionStatus", handleInitialStatus);
    socket.on("userConnectionUpdate", handleConnectionUpdate);

    // Request initial status when component mounts
    if (!connectionInitialized) {
      socket.emit("register", session.user.username);
    }

    return () => {
      socket.off("initialConnectionStatus", handleInitialStatus);
      socket.off("userConnectionUpdate", handleConnectionUpdate);
    };
  }, [socket, chatSelect, connectionInitialized]);

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
    <div className="bg-bgcolor border-2 rounded-r-lg flex flex-col h-full">
      <header className="relative p-4 border-b-2 border-border">
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

        {/* Connection Status: Connecting/Online/Offline */}
        <div className="text-center">
          <h1 className="text-white text-xl sm:text-2xl font-bold">
            {chatSelect ? chatSelect.username : "Select A Chat"}
          </h1>
          <span
            className={`text-sm ${
              !connectionInitialized
                ? "text-yellow-400 font-bold"
                : connectedUsers.has(chatSelect?.username)
                ? "text-green-400 font-bold"
                : "text-red-200 font-bold"
            }`}
          >
            {!connectionInitialized
              ? "Connecting..."
              : connectedUsers.has(chatSelect?.username)
              ? "Online"
              : "Offline"}
          </span>
        </div>
      </header>

      {/* Chat Feed */}
      <main
        ref={chatFeedRef}
        className="flex-1 p-4 overflow-y-auto no-scrollbar space-y-4 cursor-pointer"
      >
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
        hover:bg-hover
        hover:shadow-lg
        border-l-4 
        border-r-4 
        border-chatbubblesides"
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
                    className="inline-flex items-center px-3 text-sm font-medium text-white transition-colors border-2 border-white/20 rounded-full hover:bg-white/10 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-focusrings"
                    onClick={() => handleSave(message)}
                  >
                    Save
                  </button>
                  <button
                    className="inline-flex items-center px-3 text-sm font-medium text-white transition-colors border-2 border-white/20 rounded-full hover:bg-white/10 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-focusrings"
                    onClick={() => handleEdit(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="inline-flex items-center px-3 text-sm font-medium text-white transition-colors border-2 border-white/20 rounded-full hover:bg-white/10 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-focusrings"
                    onClick={() => handleEdit(message)}
                  >
                    Edit
                  </button>
                  <button
                    className="inline-flex items-center px-3 text-sm font-medium text-white transition-colors border-2 border-white/20 rounded-full hover:bg-white/10 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-focusrings"
                    onClick={() => handleDelete(message)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>

            <span className="text-xs text-slate-300 font-semibold self-end mt-1">
              {new Date(message.timestamp).toLocaleString([], {
                year: "2-digit",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>

            <span className="text-xs text-slate-300 font-semibold self-end mt-1">
              {message.senderUsername}
            </span>
          </div>
        ))}
      </main>

      {/* Send Text/Button */}
      <section className="p-4 border-t-2 border-border">
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
            className="p-2 bg-sendicon hover:bg-sendiconhover transition-colors duration-300"
          >
            <SendSVG className="w-6 h-6 fill-white" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ChatFeed;
