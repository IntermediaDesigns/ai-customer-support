import React from "react";

export default function Frontpage() {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex gap-6 justify-center items-center text-white bg-black w-full py-6">
            <img className="h-36" src="robot.png" alt="Cute green chatbot" />
            <h1 className="text-8xl font-extrabold">AI Chat Support</h1>
          </div>
          <h3 className="text-3xl font-semibold py-4">
            Never Lose a Word: Save Your Chats with Ease.
          </h3>
          <p className="text-xl w-1/2">
            Simplify your conversations with our AI chatbot, a smart chatbot
            that not only engages in meaningful dialogues but also allows you to
            save and revisit your chats anytime. Perfect for tracking important
            discussions, notes, or personal reflections with ease.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="font-bold text-white text-lg border border-black shadow-md shadow-black bg-green-700 px-4 py-2 rounded-md w-32">
            <a id="navBtn" href="/login">
              Login
            </a>
          </button>
          <button className="font-bold text-white text-lg border border-black shadow-md shadow-black bg-green-700 px-4 py-2 rounded-md w-32">
            <a id="navBtn" href="/signup">
              Sign Up
            </a>
          </button>
        </div>
      </section>
    </>
  );
}
