"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatBox from "./ChatBox";
import { useAuth } from "@/app/context/AuthContext"; // ✅ corrected import

const ChatButton = () => {
  const [open, setOpen] = useState(false);
  const { user, authToken } = useAuth(); // ✅ corrected hook usage

  const toggleChat = () => setOpen(!open);

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-24 right-6 z-50 bg-[#9BF618] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
      {open && <ChatBox toggleChat={toggleChat} user={user} token={authToken} />}
    </>
  );
};

export default ChatButton;
