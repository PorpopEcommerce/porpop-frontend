"use client";

import { useState, useEffect, useRef } from "react";

interface ChatBoxProps {
  toggleChat: () => void;
}

const ChatBox = ({ toggleChat }: ChatBoxProps) => {
  const [messages, setMessages] = useState<string[]>([
    "👋 Hi there! How can we assist you today?",
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, input]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, "💬 Agent is typing..."]);
    }, 800);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        "✅ Thanks! We’ll get back to you shortly.",
      ]);
      setIsTyping(false);
    }, 2500);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-36 right-6 z-[1000] w-80 max-w-[90%] bg-[#9BF618] rounded-lg shadow-2xl p-4 animate-slide-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg font-semibold">Hello 👋</h2>
        <button
          onClick={toggleChat}
          className="text-white text-2xl hover:text-gray-300"
        >
          &times;
        </button>
      </div>

      <div
        ref={chatContainerRef}
        className="bg-white rounded-md p-3 h-48 overflow-y-auto text-sm space-y-2"
      >
        {messages.map((msg, idx) => (
          <div key={idx} className="text-gray-700">
            {msg}
          </div>
        ))}
        {isTyping && <div className="text-gray-400 italic">Agent is typing...</div>}
      </div>

      <div className="flex mt-3">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-white text-[#9BF618] border border-l-0 border-gray-300 px-4 rounded-r-md font-semibold text-sm hover:bg-gray-100 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
