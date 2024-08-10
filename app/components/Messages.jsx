"use client";
import React, { useState, useEffect } from "react";
import { Bot } from "lucide-react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { getCurrentUser, getUsername } from "../../auth";
import { addMessageToChat } from "../../firebaseServices";

function Messages({ messages, isLoading, chatId }) {
  const [username, setUsername] = useState("Guest");
  const [authStatus, setAuthStatus] = useState("Checking...");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const CustomMarkdown = ({ content }) => {
    const formattedContent = content
      ? content.split("\n\n").join("\n\n<br />\n\n")
      : "";
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
          setIsAuthenticated(true);
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

  const saveMessages = async (chatId, message) => {
    try {
      await addMessageToChat(chatId, message);
      console.log("Message added successfully");
    } catch (error) {
      console.error("Failed to add message:", error.message);
    }
  };

  if (isInitialLoad) {
    return <div>Loading...</div>;
  }

  if (messages.length === 0) {
    return (
      <div className="h-[75vh] flex items-center justify-center">
        <div className="flex flex-col text-gray-400 text-xl font-semibold tracking-wide">
          <span>
            Hello,{" "}
            <span className="text-yellow-500 tracking-wider">{username}</span>!
          </span>
          <span>
            {isAuthenticated
              ? "I am your personal AI Chatbot assistant. How can I help you today?"
              : "I am your personal assistant, do you need help? If so, please log in so I can assist you."}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-7 text-gray-300 mt-7 text-sm">
      {messages.filter(message => message != null).map((message, index) => {
        if (message.role === "user") {
          return (
            <div key={message.id || index} className="flex flex-col items-end">
              <div className="bg-gray-800 p-4 rounded-lg first-letter:capitalize">
                <span>{message.content}</span>
              </div>
              <span className="text-xs text-gray-500 mt-1">
                {formatTimestamp(message.timestamp)}
              </span>
            </div>
          );
        }
        return (
          <div key={message.id || index} className="flex flex-col">
            <div className="flex gap-2">
              <Bot
                size={16}
                className="text-yellow-500 border-gray-300 rounded-full h-6 w-6 flex items-center justify-center"
              />
              <span className="flex-1">
                <CustomMarkdown content={message.content} />
              </span>
            </div>
            <span className="text-xs text-gray-500 mt-1 ml-8">
              {formatTimestamp(message.timestamp)}
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
