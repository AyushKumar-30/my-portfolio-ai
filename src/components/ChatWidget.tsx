"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "👋 Hey there! I'm AyushBot, ask me anything about Ayush.",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // auto-scroll to bottom when new message added
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // auto-open chatbot after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newUserMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    const botReply = {
      role: "bot",
      text: data.reply || "Sorry, something went wrong.",
    };
    setMessages((prev) => [...prev, botReply]);
  };

  return (
    <>
      {!open && (
        <button
          className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 z-50 animate-bounce"
          onClick={() => setOpen(true)}
          aria-label="Open chatbot"
        >
          <span className="text-xl">🤖 Talk to AyushBot!</span>
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-20 right-6 w-[350px] h-[500px] bg-white shadow-xl border rounded-xl flex flex-col overflow-hidden z-50"
          >
            <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
              <span className="font-semibold">AyushBot</span>
              <button onClick={() => setOpen(false)} aria-label="Close chatbot">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 text-black overflow-y-auto space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[80%] px-3 py-2 rounded-lg whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-blue-100 ml-auto text-right"
                      : "bg-gray-100 mr-auto text-left"
                  }`}
                >
                  {msg.role === "bot" ? (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
              ))}
            </div>

            <div className="p-3 border-t flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 text-black border rounded-md text-sm"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-4 rounded-md text-sm hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
