"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import ChatMessage, { TypingIndicator } from "@/components/chat/ChatMessage";
import {
  QUICK_REPLIES,
  WELCOME_MESSAGE,
  createSessionId,
  sendMessage,
  type ChatMessageData,
} from "@/components/chat/chatAdapter";
import { COMPANY } from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;

const welcome = (): ChatMessageData => ({
  id: "welcome",
  role: "bot",
  text: WELCOME_MESSAGE,
});

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageData[]>([welcome()]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [sessionId] = useState(createSessionId);
  const [showHint, setShowHint] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) {
      setShowHint(false);
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || typing) return;

      const userMsg: ChatMessageData = {
        id: `u-${Date.now()}`,
        role: "user",
        text,
      };
      const history = [...messages, userMsg];
      setMessages(history);
      setInput("");
      setTyping(true);

      try {
        const reply = await sendMessage(text, history, sessionId);
        setMessages((m) => [...m, { id: `b-${Date.now()}`, role: "bot", text: reply }]);
      } catch {
        setMessages((m) => [
          ...m,
          {
            id: `e-${Date.now()}`,
            role: "bot",
            text: `Por el momento no puedo responder. Llamanos al ${COMPANY.phone} y te atendemos enseguida.`,
          },
        ]);
      } finally {
        setTyping(false);
      }
    },
    [messages, typing, sessionId]
  );

  const showQuickReplies = messages.length === 1 && !typing;

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label="Chat con asistente de Hidro Rex"
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ transformOrigin: "bottom right" }}
            className="flex h-[min(34rem,calc(100vh-7rem))] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden bg-white shadow-[0_24px_60px_-12px_rgba(0,0,0,0.45)] ring-1 ring-graphite-100"
          >
            <header className="flex items-center justify-between bg-graphite-900 px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <span className="relative flex h-10 w-10 items-center justify-center bg-white/10">
                  <MessageCircle className="h-5 w-5" aria-hidden />
                  <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-graphite-900 bg-emerald-500" />
                </span>
                <div>
                  <p className="text-sm font-bold">Asistente Hidro Rex</p>
                  <p className="text-xs text-graphite-300">En línea</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar chat"
                className="flex h-9 w-9 items-center justify-center transition-colors hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-white p-5">
              {messages.map((m) => (
                <ChatMessage key={m.id} message={m} />
              ))}
              {typing && <TypingIndicator />}

              {showQuickReplies && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="border border-graphite-900/20 px-3 py-2 text-xs font-semibold text-graphite-900 transition-colors hover:border-graphite-900 hover:bg-graphite-900 hover:text-white"
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-graphite-100 bg-white p-3"
            >
              <label htmlFor="chat-input" className="sr-only">
                Escribí tu mensaje
              </label>
              <input
                ref={inputRef}
                id="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribí tu mensaje..."
                maxLength={500}
                autoComplete="off"
                className="min-w-0 flex-1 bg-graphite-50 px-4 py-3 text-sm text-graphite-900 placeholder:text-graphite-300 focus:outline-none focus:ring-2 focus:ring-graphite-900/15"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Enviar mensaje"
                className="flex h-11 w-11 shrink-0 items-center justify-center bg-brand text-white transition-all hover:bg-brand-light disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHint && !open && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="hidden max-w-[16rem] bg-white px-4 py-3 text-left text-sm font-medium text-graphite-900 shadow-xl ring-1 ring-graphite-100 sm:block"
          >
            ¿Necesitás un presupuesto? Escribinos 👋
          </motion.button>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar chat" : "Abrir chat con asistente"}
        aria-expanded={open}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-brand transition-colors hover:bg-brand-light"
      >
        {!open && (
          <span
            className="absolute inset-0 animate-ping rounded-full bg-brand opacity-30"
            aria-hidden
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "chat"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            {open ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
