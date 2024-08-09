import React from "react";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Chatarea from "./Chatarea";

export default function Dashboard() {
  return (
    <>
      <div className="flex h-screen">
        <div className="hidden lg:flex">
          <Sidebar />
        </div>

        <div className="flex-1 h-full">
          <Chatarea />
        </div>
      </div>

      <Footer />
    </>
  );
}
