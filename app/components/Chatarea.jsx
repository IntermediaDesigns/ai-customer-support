"use client";
import React from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { Drawer } from "antd";
import { useChat } from "ai/react";

function Chatarea() {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    keepLastMessageOnError: true,
  });

  return (
    <div className="bg-chatarea h-full p-5">
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

      <div className="text-white">
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === "user" ? "User: " : "AI: "}
            {message.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input name="prompt" value={input} onChange={handleInputChange} />
        <button type="submit" className="text-white">Submit</button>
      </form>

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
