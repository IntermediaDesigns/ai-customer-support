"use client";
import React, { useState, useEffect } from "react";
import { Menu, Send, Save, Plus } from "lucide-react";
import Messages from "./Messages";
import Sidebar from "./Sidebar";
import { Drawer } from "antd";
import { useChat } from "ai/react";
import {
  addMessageToChat,
  createNewChat,
  getChatMessages,
  saveChat,
  deleteChat,
} from "../../firebaseServices";
// import { delay } from '../../utils';

function Chatarea({
  currentChatId,
  setCurrentChatId,
  savedChats,
  onSaveChat,
  onDeleteChat,
  isAuthenticated,
}) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [localMessages, setLocalMessages] = useState([]);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    keepLastMessageOnError: true,
    onFinish: async (message) => {
      if (currentChatId) {
        await addMessageToChat(currentChatId, message.content, message.role);
        setLocalMessages((prevMessages) => [...prevMessages, message]);
      }
    },
  });

  useEffect(() => {
    const loadMessages = async () => {
      if (currentChatId) {
        setLocalMessages([]); // Clear local messages
        const chatMessages = await getChatMessages(currentChatId);
        setLocalMessages(chatMessages);
        setMessages(chatMessages);
      }
    };
    loadMessages();
  }, [currentChatId, setMessages]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isAuthenticated && currentChatId) {
      const userMessage = { role: "user", content: input };
      setLocalMessages((prevMessages) => [...prevMessages, userMessage]);
      await addMessageToChat(currentChatId, input, "user");

      // Clear input immediately after sending
      handleInputChange({ target: { value: "" } });

      // Use handleSubmit to trigger AI response
      await handleSubmit(e);
    } else {
      alert("Please log in to send messages.");
    }
  };

  const handleNewChat = async (chatId) => {
    setCurrentChatId(chatId);
    setLocalMessages([]); // Clear local messages
    const chatMessages = await getChatMessages(chatId);
    setLocalMessages(chatMessages);
    setMessages(chatMessages);
  };

  const handleSaveChat = async () => {
    if (currentChatId && localMessages.length > 0) {
      try {
        const messagesToSave = localMessages.map((msg) => ({
          ...msg,
          timestamp: msg.timestamp || new Date(),
        }));
        await saveChat(currentChatId, messagesToSave);
        const title =
          localMessages[0].content.split(" ").slice(0, 5).join(" ") + "...";

        const newChat = {
          id: currentChatId,
          title,
          lastUpdated: new Date(),
          messages: messagesToSave,
        };

        onSaveChat(newChat);

        alert("Chat saved successfully!");

        // Create a new chat and reset the chatarea
        const newChatId = await createNewChat();
        setCurrentChatId(newChatId);
        setLocalMessages([]);
        setMessages([]);
      } catch (error) {
        console.error("Error saving chat:", error);
        alert("Failed to save chat. Please try again.");
      }
    } else {
      alert("No messages to save.");
    }
  };

  const handleCreateNewChat = async () => {
    try {
      const newChatId = await createNewChat();
      setCurrentChatId(newChatId);
      setLocalMessages([]);
      setMessages([]);
    } catch (error) {
      console.error("Error creating new chat:", error);
      alert("Failed to create a new chat. Please try again.");
    }
  };

  return (
    <div className="bg-chatarea h-full p-5 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Menu
            size={20}
            className="text-white flex lg:hidden cursor-pointer"
            onClick={() => setShowSidebar(true)}
          />
          <h1 className="text-xl font-bold text-yellow-500">AI Chatbot</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveChat}
            className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            <Save size={16} />
            Save Chat
          </button>
          <button
            onClick={handleCreateNewChat}
            className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            <Plus size={16} />
            New Chat
          </button>
        </div>
      </div>
      <Drawer
        placement="left"
        closable={true}
        onClose={() => setShowSidebar(false)}
        open={showSidebar}
      >
        <Sidebar
          setShowSidebar={setShowSidebar}
          onChatSelect={handleNewChat}
          onDeleteChat={onDeleteChat}
          currentChatId={currentChatId}
          savedChats={savedChats}
        />
      </Drawer>
      <div className="block h-screen mt-4 ">
        <Messages
          messages={localMessages}
          isLoading={isLoading}
          chatId={currentChatId}
        />
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center gap-2 mt-4"
      >
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-1 p-2 border border-gray-300 rounded"
          placeholder={
            isAuthenticated ? "Type a message..." : "Please log in to chat"
          }
          disabled={!isAuthenticated}
        />
        <button
          type="submit"
          className={`p-2 text-white rounded ${
            isAuthenticated
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isAuthenticated || isLoading}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

export default Chatarea;
