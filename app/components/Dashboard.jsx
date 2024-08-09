import React from "react";
import Sidebar from "./Sidebar";
import Chatarea from "./Chatarea";
import Navbar from "./Navbar";

export default function Dashboard({ color }) {
  return (
    <>
      <div className="flex h-screen ">
        <div className="hidden lg:flex">
          <Sidebar />
        </div>

        <div className="flex-1 h-screen overflow-hidden">
          <div className="hidden md:block">
            <Navbar color={`flex `}  />
          </div>
          <Chatarea />
        </div>
      </div>
    </>
  );
}
