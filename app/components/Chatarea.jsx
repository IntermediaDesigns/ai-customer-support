'use client';
import React, { useState, useEffect } from "react";
import { Menu, Send } from "lucide-react";
import Messages from "./Messages";
import Sidebar from "./Sidebar";
import { Drawer } from "antd";
import { getCurrentUser } from "../../auth";
import { useChat } from "ai/react";

function Chatarea() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    keepLastMessageOnError: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        setIsAuthenticated(!!user);
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setAuthChecked(true);
      }
    };
    checkAuth();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      handleSubmit(e);
    } else {
      alert("Please log in to send messages.");
    }
  };

  if (!authChecked) {
    return <div>Loading...</div>;
  }

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
      </div>
      <Drawer
        placement="left"
        closable={true}
        onClose={() => setShowSidebar(false)}
        open={showSidebar}
      >
        <Sidebar setShowSidebar={setShowSidebar} />
      </Drawer>
      <div className="flex-0 h-[85vh]">
        <Messages messages={messages} isLoading={isLoading} />
      </div>
      <form onSubmit={handleFormSubmit} className="flex items-center gap-2 mt-4">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-1 p-2 border border-gray-300 rounded"
          placeholder={isAuthenticated ? "Type a message..." : "Please log in to chat"}
          disabled={!isAuthenticated}
        />
        <button
          type="submit"
          className={`p-2  text-white rounded ${
            isAuthenticated ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-300 cursor-not-allowed'
           }` }
          disabled={!isAuthenticated || isLoading}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

export default Chatarea;