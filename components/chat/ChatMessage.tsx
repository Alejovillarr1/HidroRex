"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessageData } from "@/components/chat/chatAdapter";

export default function ChatMessage({ message }: { message: ChatMessageData }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex items-end gap-2", isUser && "flex-row-reverse")}
    >
      {!isUser && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-graphite-900 text-white">
          <Bot className="h-4 w-4" aria-hidden />
        </span>
      )}
      <p
        className={cn(
          "max-w-[80%] whitespace-pre-wrap px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-graphite-900 text-white"
            : "bg-graphite-50 text-graphite-900 ring-1 ring-graphite-100"
        )}
      >
        {message.text}
      </p>
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2" aria-live="polite" aria-label="El asistente está escribiendo">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-graphite-900 text-white">
        <Bot className="h-4 w-4" aria-hidden />
      </span>
      <div className="flex gap-1 bg-graphite-50 px-4 py-4 ring-1 ring-graphite-100">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-graphite-300"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}
