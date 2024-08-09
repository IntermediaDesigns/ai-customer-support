import React from "react";
import { Bot } from "lucide-react";

function Messages({ messages, isLoading }) {
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
            <span className="flex-1">{message.content}</span>
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
