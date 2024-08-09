"use client";
import React, { useState, useEffect } from "react";
import "../globals.css";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../firebase";

export default function Navbar({ color }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <nav id="navLinks" className={` ${color} border-b-2 border-gray-800`}>
      <a href="/">Home</a>
      <div>
        {user ? (
          <div id="navLinks" className={` ${color}`}>
            <a id="navBtn" href="/dashboard">
              Dashboard
            </a>
            <button id="navBtn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div id="navLinks" className={`${color}`}>
            <a id="navBtn" href="/login">
              Login
            </a>
            <a id="navBtn" href="/signup">
              Sign Up
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
