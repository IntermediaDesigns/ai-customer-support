"use client";
import Navbar from "./components/Navbar";
import "./globals.css";
import Footer from "./components/Footer";
import Frontpage from "./components/Frontpage";

export default function Home() {

  return (
    <div>
      <Navbar />
      <Frontpage />
      <Footer />
    </div>
  );
}
