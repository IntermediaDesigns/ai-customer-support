'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "../../auth";
import Navbar from "./Navbar";

export default function Login({ searchParams }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

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
      <Navbar />
      <div>
        <h1>Log In</h1>
        {successMessage && (
          <p>{successMessage}</p>
        )}
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <div>
          <p>
            Need an account?
            <a href="/signup"> Sign Up</a>
          </p>
        </div>
      </div>
    </>
  );
}
