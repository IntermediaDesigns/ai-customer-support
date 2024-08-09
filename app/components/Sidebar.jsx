'use client';
import React from "react";
import Navbar from "./Navbar";
import Savedchats from "./Savedchats";

const Sidebar = ({ setShowSidebar = () => {}, onChatSelect, onDeleteChat, currentChatId, savedChats }) => {
  return (
    <div className="w-full bg-sidebar pt-1 p-5 flex flex-col">
      <div className="flex sm:hidden ml-auto md:hidden">
        <Navbar color="bg-transparent text-white flex flex-col items-end" />
      </div>
      <Savedchats 
        onChatSelect={onChatSelect} 
        onDeleteChat={onDeleteChat} 
        currentChatId={currentChatId}
        savedChats={savedChats || []}
      />
    </div>
  );
};

export default Sidebar;