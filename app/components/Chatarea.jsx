"use client";
import React from "react";
import { Menu, Send } from "lucide-react";
import Sidebar from "./Sidebar";
import { Drawer } from "antd";
import { useChat } from "ai/react";
import Footer from "./Footer";
import Messages from "./Messages";

function Chatarea() {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    keepLastMessageOnError: true,
  });

  return (
    <div className="bg-chatarea h-full p-5 flex flex-col pb-20">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Menu
            size={20}
            className="text-white flex lg:hidden cursor-pointer"
            onClick={() => setShowSidebar(true)}
          />
          <h1 className="text-xl font-bold text-yellow-500">AI Chatbot</h1>
        </div>
        <p>Welcome, User!</p>
      </div>

      <div className="flex flex-col justify-between flex-1">
        
        <Messages messages={messages} isLoading={isLoading} />

        <form onSubmit={handleSubmit} className="relative">
          <input
            name="prompt"
            value={input}
            placeholder="Type a message..."
            onChange={handleInputChange}
            className="bg-sidebar p-5 w-full focus:outline-none focus:border-gray-500 focus:border rounded text-gray-300"
          />
          <button type="submit">
            <Send
              size={20}
              className="text-white absolute right-5 top-5 cursor-pointer"
            />
          </button>
        </form>
      </div>

      {showSidebar && (
        <Drawer
          onClose={() => setShowSidebar(false)}
          open={showSidebar}
          placement="left"
        >
          <Sidebar setShowSidebar={setShowSidebar} />
        </Drawer>
      )}
    </div>
  );
}

export default Chatarea;
