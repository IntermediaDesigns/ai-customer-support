"use client";
import React, { useState } from "react";
import { signUp } from "../../auth";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import Image from "next/image";

import "../globals.css";
import Footer from "./Footer";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [pw1Visible, setPw1Visible] = useState(false);
  const [pw2Visible, setPw2Visible] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const user = await signUp(username, password);
      console.log("Signed up successfully", user);
      router.push("/login");
    } catch (error) {
      console.error("Error signing up", error);
      setError(error.message);
    }
  };

  return (
    <>
    <nav id="navLinks"><a href="/">Home</a></nav>
      <div className="flex flex-col items-center justify-center gap-8 border border-solid border-gray-200 shadow-xl w-3/4 rounded-xl py-12 mt-20 ml-auto mr-auto lg:w-1/3 ">
        <Image
          className="h-36 mt-10"
          src="/robot-dark.png"
          alt="Cute green chatbot"
          width={100}
          height={144}
        />
        <h1 className="text-4xl font-bold py-2 text-wrap text-center">Sign up for an account</h1>
        {error && <p>{error}</p>}
        <form
          className="flex flex-col gap-2 w-1/2 max-w-96"
          onSubmit={handleSubmit}
        >
          <input
            className="border border-slate-600 px-2 w-full"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="border border-slate-600 px-2 w-full"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="flex">
            <input
              className="border border-slate-600 px-2 w-full mr-2"
              type={pw1Visible ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              aria-label="password visibility"
              type="button"
              onClick={() => {
                setPw1Visible(!pw1Visible);
              }}
            >
              {pw1Visible ? <FaEye /> : <IoMdEyeOff />}
            </button>
          </div>
          <div className="flex">
            <input
              className="border border-slate-600 px-2 w-full mr-2"
              type={pw2Visible ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              aria-label="password visibility"
              type="button"
              onClick={() => {
                setPw2Visible(!pw2Visible);
              }}
            >
              {pw2Visible ? <FaEye /> : <IoMdEyeOff />}
            </button>
          </div>

          <button
            className="font-semibold text-white text-lg border border-black shadow-md shadow-black bg-green-700 px-4 py-2 rounded-md"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div>
          <p id="navLinks">
            Already have an account?
            <a className="font-bold" href="/login">
              {" "}
              Log In
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
