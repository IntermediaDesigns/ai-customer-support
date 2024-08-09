// This component will be rendered after the user logs in. It will display a welcome message and a button to sign out. It will also render the chatbot interface.

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
