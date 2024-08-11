import React from "react";
import Image from "next/image";

export default function Frontpage() {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center text-center w-full">
          <div className="flex gap-6 justify-center items-center text-white bg-chatarea w-full py-6 flex-wrap text-wrap">
            <Image
              className="h-36"
              src="/robot-light.png"
              alt="Cute green chatbot"
              width={100}
              height={144}
            />
            <h1 className="text-8xl font-extrabold">AI Chat Support</h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 border border-solid border-gray-200 shadow-xl w-3/4 py-12 rounded-xl mt-32 lg:max-w-4xl">
            <h3 className="text-3xl font-semibold py-2 w-3/4">
              Never Lose a Word: Save Your Chats with Ease.
            </h3>
            <p className="text-xl w-3/4 lg:w-1/2">
              Simplify your conversations with our AI chatbot, a smart chatbot
              that not only engages in meaningful dialogues but also allows you
              to save and revisit your chats anytime. Perfect for tracking
              important discussions, notes, or personal reflections with ease.
            </p>

            <div className="flex gap-4">
              <button className="font-bold text-white text-lg border border-black shadow-md shadow-black bg-green-700 px-4 py-2 rounded-md w-32 hover:bg-green-500">
                <a id="navBtn" href="/login">
                  Login
                </a>
              </button>
              <button className="font-bold text-white text-lg border border-black shadow-md shadow-black bg-green-700 px-4 py-2 rounded-md w-32 hover:bg-green-500">
                <a id="navBtn" href="/signup">
                  Sign Up
                </a>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
