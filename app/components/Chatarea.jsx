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
import Image from "next/image";

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
        const messageWithTimestamp = { ...message, timestamp: new Date() };
        await addMessageToChat(currentChatId, message.content, message.role);
        setLocalMessages((prevMessages) => [
          ...prevMessages,
          messageWithTimestamp,
        ]);
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
      const userMessage = {
        role: "user",
        content: input,
        timestamp: new Date(),
      };
      setLocalMessages((prevMessages) => [...prevMessages, userMessage]);
      await addMessageToChat(currentChatId, input, "user");

      // Clear input immediately after sending
      handleInputChange({ target: { value: "" } });

      // Add a delay before the assistant's response
      setTimeout(async () => {
        // Use handleSubmit to trigger AI response
        await handleSubmit(e);
      }, 2000); // 2 second delay
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

        // Ensure a user message is first
        const userMessageIndex = messagesToSave.findIndex(
          (msg) => msg.role === "user"
        );
        if (userMessageIndex > 0) {
          const firstUserMessage = messagesToSave[userMessageIndex];
          messagesToSave.splice(userMessageIndex, 1);
          messagesToSave.unshift(firstUserMessage);
        }

        await saveChat(currentChatId, messagesToSave);
        const title =
          messagesToSave[0].content.split(" ").slice(0, 5).join(" ") + "...";

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
    <div className="chatarea bg-chatarea px-5 flex flex-col">
      <div className="flex justify-between items-start m-2">
        <div className="flex items-center gap-2">
          <Menu
            size={20}
            className="text-white flex lg:hidden cursor-pointer"
            onClick={() => setShowSidebar(true)}
          />
          <h1 className="flex items-center gap-6 text-xl font-bold text-yellow-500">
            <Image
              src="/robot-light.png"
              alt="Cute green chatbot"
              width={30}
              height={72}
            />
            <p>AI Chatbot</p>
          </h1>
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
      <div className="flex flex-col gap-4 justify-between min-h-[90vh]">
        <div className="block h-auto mt-4 ">
          <Messages
            messages={localMessages}
            isLoading={isLoading}
            chatId={currentChatId}
          />
        </div>
        <div>
          <form
            onSubmit={handleFormSubmit}
            className="flex items-center gap-2 h-16"
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
      </div>
    </div>
  );
}

export default Chatarea;
