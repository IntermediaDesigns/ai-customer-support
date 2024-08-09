'use client';
import React, { useState, useEffect } from "react";
import { Bot } from "lucide-react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { getCurrentUser, getUsername } from "../../auth"; // Make sure to import getUsername

function Messages({ messages, isLoading }) {
  const [username, setUsername] = useState("User");
  const [authStatus, setAuthStatus] = useState("Checking...");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const CustomMarkdown = ({ content }) => {
    const formattedContent = content.split("\n\n").join("\n\n<br />\n\n");
    return (
      <Markdown className="markdown" rehypePlugins={[rehypeRaw]}>
        {formattedContent}
      </Markdown>
    );
  };

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          const fetchedUsername = await getUsername(user.uid);
          setUsername(fetchedUsername || "User");
          setAuthStatus("Authenticated");
        } else {
          setAuthStatus("Not Authenticated");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setAuthStatus("Error fetching user data");
      } finally {
        setIsInitialLoad(false);
      }
    };

    fetchUsername();
  }, []);

  if (isInitialLoad) {
    return <div>Loading...</div>;
  }

  if (messages.length === 0) {
    return (
      <div className="h-[75vh] flex items-center justify-center">
        <div className="flex flex-col text-gray-400 text-xl font-semibold tracking-wide">
          <span>
            Hey there <span className="text-yellow-500 tracking-wider">{username}</span>!
          </span>
          <span>
            I am your personal AI Chatbot assistant. How can I help you today?
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-7 text-gray-300 mt-7 text-sm">
      {messages.map((message, index) => {
        if (message.role === "user") {
          return (
            <div key={index} className="flex justify-end">
              <div className="bg-gray-800 p-4 rounded-lg first-letter:capitalize">
                <span>{message.content}</span>
              </div>
            </div>
          );
        }
        return (
          <div key={index} className="flex gap-2">
            <Bot
              size={16}
              className="text-yellow-500 border-gray-300 rounded-full h-6 w-6 flex items-center justify-center"
            />
            <span className="flex-1">
              <CustomMarkdown content={message.content} />
            </span>
          </div>
        );
      })}
      {isLoading && (
        <div className="flex gap-2">
          <Bot
            size={16}
            className="text-yellow-500 border-gray-300 rounded-full h-6 w-6 flex items-center justify-center"
          />
          <span className="flex-1">Thinking...</span>
        </div>
      )}
    </div>
  );
}

export default Messages;