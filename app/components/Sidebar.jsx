import React from "react";
import { Plus } from "lucide-react";
import Navbar from "./Navbar";
import Savedchats from "./Savedchats";

const Sidebar = ({ setShowSidebar = () => {} }) => {
  return (
    <div className="w-full bg-sidebar pt-1 p-5 flex flex-col">
      <div className="flex sm:hidden ml-auto ">
        <Navbar color="bg-transparent text-white flex flex-col items-end" />
      </div>
      <div className="flex items-center gap-2 border border-gray-200 border-solid text-gray-200 p-2 rounded-sm w-max text-sm mt-12">
        <Plus size={15} />
        New Chat
      </div>
      <Savedchats />
    </div>
  );
};

export default Sidebar;
