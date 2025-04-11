"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";

interface ChatBoxProps {
  toggleChat: () => void;
  user: any;
  token: string | null;
}

const ChatBox = ({ toggleChat }: ChatBoxProps) => {
  const [messages, setMessages] = useState<{ text: string; from: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { user, authToken } = useAuth();

  useEffect(() => {
    // Add the welcome message once the ChatBox opens
    setMessages([
      {
        text: "👋 Welcome to Porpop Support! Please share your feedback or complaint below. A ticket will be created automatically, and our team will get back to you shortly.",
        from: "agent",
      },
    ]);
  }, []);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const messageToSend = newMessage.trim();

    setMessages((prev) => [...prev, { text: messageToSend, from: "user" }]);
    setNewMessage("");
    setIsTyping(true);

    try {
      const response = await axios.post(
        "https://backend-porpop-1ih6.onrender.com/v1/support/tickets",
        {
          title: "Chat Message",
          description: messageToSend,
          priority: "normal",
          customer_name: user?.full_name || "Guest",
          user_id: user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Ticket created successfully:", response.data);

      // Simulate agent reply after message is sent
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "✅ Thank you for contacting us! Our team will review your message and respond shortly.", from: "agent" },
        ]);
        setIsTyping(false);
      }, 1500);

    } catch (err) {
      console.error("Chat send error:", err);
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-32 right-6 z-50 w-80 max-w-full bg-[#9BF618] rounded-lg shadow-lg p-4 animate-slide-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-lg font-semibold">Porpop Support</h2>
        <button onClick={toggleChat} className="text-white text-xl">&times;</button>
      </div>

      <div className="bg-white rounded-md p-3 h-48 overflow-y-auto text-sm">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 ${msg.from === "user" ? "text-right" : "text-left"}`}>
            <span className={msg.from === "user" ? "text-green-600" : "text-gray-700"}>{msg.text}</span>
          </div>
        ))}
        {isTyping && <div className="text-gray-400 italic">Agent is typing...</div>}
      </div>

      <div className="flex mt-3">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:ring-green-300 text-black"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
