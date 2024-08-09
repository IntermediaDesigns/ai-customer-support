import React from "react";
import Sidebar from "./Sidebar";
import Chatarea from "./Chatarea";
import Navbar from "./Navbar";

export default function Dashboard() {
  return (
    <>
      <div className="flex h-screen ">
        <div className="hidden lg:flex">
          <Sidebar />
        </div>

        <div className="flex-1 h-screen overflow-hidden">
          <Navbar />
          <Chatarea />
        </div>
      </div>
    </>
  );
}
