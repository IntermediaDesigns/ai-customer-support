"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Chatarea from "./Chatarea";
import Navbar from "./Navbar";
import { getSavedChats, createNewChat } from "../../firebaseServices";
import { getCurrentUser } from "../../auth";

export default function Dashboard({ color }) {
  const [savedChats, setSavedChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthAndLoadChats = async () => {
      try {
        const user = await getCurrentUser();
        setIsAuthenticated(!!user);
        if (user) {
          const chats = await getSavedChats();
          setSavedChats(chats);
          if (!currentChatId) {
            const newChatId = await createNewChat();
            setCurrentChatId(newChatId);
          }
        }
      } catch (error) {
        console.error("Error checking authentication or loading chats:", error);
      }
    };
    checkAuthAndLoadChats();
  }, []);

  const handleChatSelect = (chatId) => {
    setCurrentChatId(chatId);
  };

  const handleDeleteChat = async (deletedChatId) => {
    setSavedChats((prevChats) => prevChats.filter(chat => chat.id !== deletedChatId));
    if (deletedChatId === currentChatId) {
      const newChatId = await createNewChat();
      setCurrentChatId(newChatId);
    }
  };

  const handleSaveChat = (newChat) => {
    setSavedChats((prevChats) => [...prevChats.filter(chat => chat.id !== newChat.id), newChat]);
  };

  return (
    <div className="flex h-screen">
      <div className="w-80 hidden lg:block">
        <Sidebar
          onChatSelect={handleChatSelect}
          onDeleteChat={handleDeleteChat}
          currentChatId={currentChatId}
          savedChats={savedChats}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="hidden md:block">
          <Navbar color={`flex`} />
        </div>
        <Chatarea 
          currentChatId={currentChatId}
          setCurrentChatId={setCurrentChatId}
          savedChats={savedChats}
          onSaveChat={handleSaveChat}
          onDeleteChat={handleDeleteChat}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </div>
  );
}