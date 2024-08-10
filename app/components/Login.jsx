"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "../../auth";
import Footer from "./Footer";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";

export default function Login({ searchParams }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const [pwVisible, setPwVisible] = useState(false);

  useEffect(() => {
    if (searchParams?.signup === "success") {
      setSuccessMessage("Account created successfully. Please log in.");
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await signIn(username, password);
      console.log("Logged in successfully", user);
      // Redirect to dashboard or home page after successful login
      router.push("/dashboard");
    } catch (error) {
      console.error("Error logging in", error);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8">
        <img
          className="h-36 mt-10"
          src="robot-dark.png"
          alt="Cute green chatbot"
        />
        <h1 className="text-4xl font-bold py-2">Log In</h1>
        {successMessage && <p>{successMessage}</p>}
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
          <div>
            <input
              className="border border-slate-600 px-2 w-5/6 mr-2"
              type={pwVisible ? "text" : "password"}
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
                setPwVisible(!pwVisible);
              }}
            >
              {pwVisible ? <FaEye /> : <IoMdEyeOff />}
            </button>
          </div>
          <button
            className="font-semibold text-white border border-black shadow-md shadow-black bg-green-700 px-4 py-2 rounded-md"
            type="submit"
          >
            Login
          </button>
        </form>
        <div>
          <p>
            Need an account?
            <a className="font-bold" href="/signup">
              {" "}
              Sign Up
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
