"use client";
import React from "react";
import { Trash2 } from "lucide-react";

function Savedchats({ onChatSelect, onDeleteChat, currentChatId, savedChats }) {
  const handleChatSelect = (chatId) => {
    if (onChatSelect && typeof onChatSelect === "function") {
      onChatSelect(chatId);
    }
  };

  const handleDeleteChat = async (chatId, event) => {
    event.stopPropagation();
    try {
      if (onDeleteChat && typeof onDeleteChat === 'function') {
        await onDeleteChat(chatId);
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  return (
    <div className="mt-6">
      <p className="text-white font-semibold tracking-wider text-xl">
        Saved Chats
      </p>
      <div className="mt-4">
        {savedChats.map((chat) => (
          <div
            key={chat.id}
            className={`text-white my-2 cursor-pointer hover:bg-gray-700 p-2 rounded flex justify-between items-center ${
              chat.id === currentChatId ? "bg-gray-700" : ""
            }`}
            onClick={() => handleChatSelect(chat.id)}
          >
            <span>{chat.title}</span>
            <button
              onClick={(e) => handleDeleteChat(chat.id, e)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Savedchats;
