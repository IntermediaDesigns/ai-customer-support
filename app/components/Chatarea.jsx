"use client";
import React, { useEffect, useState } from "react";
import { Menu, Send } from "lucide-react";
import Sidebar from "./Sidebar";
import { Drawer } from "antd";
import { useChat } from "ai/react";
import Messages from "./Messages";
import { getCurrentUser, getUsername } from "../../auth";

function Chatarea() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [username, setUsername] = useState("User");
  const [authStatus, setAuthStatus] = useState("Checking...");
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      keepLastMessageOnError: true,
    });

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        setAuthStatus("Fetching user...");
        const user = await getCurrentUser();
        console.log("Current user:", user);

        if (user) {
          setAuthStatus(`User found: ${user.uid}`);
          const fetchedUsername = await getUsername(user.uid);
          console.log("Fetched username:", fetchedUsername);

          if (fetchedUsername) {
            setUsername(fetchedUsername);
            setAuthStatus("Logged in");
          } else {
            setAuthStatus("Username not found in Firestore");
          }
        } else {
          setAuthStatus("No user logged in");
        }
      } catch (error) {
        console.error("Error fetching username:", error);
        setAuthStatus("Error: " + error.message);
      }
    };

    fetchUsername();
  }, []);

  return (
    <div className="bg-chatarea h-full p-5 flex flex-col">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Menu
            size={20}
            className="text-white flex lg:hidden cursor-pointer"
            onClick={() => setShowSidebar(true)}
          />
          <h1 className="text-xl font-bold text-yellow-500">AI Chatbot</h1>
        </div>
        <p className="text-gray-300 text-lg tracking-wide">
          Welcome, <span className="text-yellow-500">{username}</span>! <span className="text-gray-500 text-sm">{authStatus}</span>
        </p>
      </div>
      <Drawer
        // title="Chatbot"
        placement="left"
        closable={true}
        onClose={() => setShowSidebar(false)}
        open={showSidebar}
      >
        <Sidebar setShowSidebar={setShowSidebar} />
      </Drawer>
      <div className="flex-1 overflow-y-auto">
        <Messages messages={messages} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-1 p-2 border border-gray-300 rounded"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded"
          disabled={isLoading}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

export default Chatarea;
