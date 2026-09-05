'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Cancel01Icon,
  SentIcon,
  SparklesIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  Delete01Icon,
} from '@hugeicons/core-free-icons';
import { AiProductCard } from './AiProductCard';
import type { ChatMessage, AiChatResponse } from '@/types/ai-assistant';
import { Input } from '../ui/input';
interface MessageEntry {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  products?: AiChatResponse['products'];
  feedback?: 'up' | 'down' | null;
}

import Image from 'next/image';
import { departmentData } from '../home/data';

const nextId = () => crypto.randomUUID();

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<MessageEntry[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasUnread, setHasUnread] = useState(true);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isPending]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const toggleOpen = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next) setHasUnread(false);
      return next;
    });
  };

  const sendMessage = (text: string) => {
    if (!text.trim() || isPending) return;

    const userMsg: MessageEntry = { id: nextId(), role: 'user', content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    const apiMessages: ChatMessage[] = [...messages, userMsg].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    startTransition(async () => {
      try {
        const res = await fetch('/api/ai-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: apiMessages }),
        });

        if (!res.ok) throw new Error('Request failed');

        const data: AiChatResponse = await res.json();

        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: 'assistant',
            content: data.text,
            products: data.products,
            feedback: null,
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: 'assistant',
            content: "Sorry, I'm having trouble connecting right now. Please try again.",
          },
        ]);
      }
    });
  };

  const setFeedback = (id: string, value: 'up' | 'down') => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, feedback: m.feedback === value ? null : value } : m))
    );
  };

  const clearChat = () => {
    setMessages([]);
    setInput('');
  };

  const showWelcome = messages.length === 0 && !isPending;

  return (
    <>
      {/* ── Floating Launcher ── */}
      <button
        onClick={toggleOpen}
        aria-label="Open Livo Shopping Assistant"
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300
          ${
            open
              ? 'bg-neutral-900 text-white rotate-90 scale-95 dark:bg-white dark:text-neutral-900'
              : 'bg-primary text-primary-foreground hover:bg-[#3d5747] hover:scale-105 hover:shadow-xl shadow-primary/20'
          }`}
      >
        {!open && hasUnread && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d98e63] opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-[#d98e63]" />
          </span>
        )}
        <HugeiconsIcon
          icon={open ? Cancel01Icon : SparklesIcon}
          size={22}
          className="transition-transform duration-200"
        />
      </button>

      {/* ── Chat Panel ── */}
      <div
        className={`fixed bottom-24 right-6 z-50 flex flex-col overflow-hidden rounded border border-border/80 shadow-2xl transition-all duration-300 origin-bottom-right
          bg-background/95 backdrop-blur-md text-foreground
          w-[92vw] max-w-100
          ${
            open
              ? 'scale-100 opacity-100 pointer-events-auto translate-y-0'
              : 'scale-95 opacity-0 pointer-events-none translate-y-4'
          }`}
        style={{ maxHeight: 'min(640px, 80vh)' }}
      >
        {/* ── Header ── */}
        <div className="relative flex items-center gap-3 px-4 py-3.5 border-b border-border/60 bg-muted/30">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs shrink-0">
            <HugeiconsIcon icon={SparklesIcon} size={17} />
          </div>

          <div>
            <p className="text-sm font-semibold leading-none text-foreground">Livo Assistant</p>
            <p className="mt-1 text-[11px] text-muted-foreground">Shopping & Interior Design</p>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                title="Clear chat"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <HugeiconsIcon icon={Delete01Icon} size={15} />
              </button>
            )}
            <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Online
            </span>
          </div>
        </div>

        {/* ── Messages ── */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
          {/* Welcome State */}
          {showWelcome && (
            <div className="flex flex-col items-center gap-4 pt-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <HugeiconsIcon icon={SparklesIcon} size={26} />
              </div>
              <div>
                <p className="text-base font-semibold text-foreground">Welcome to Livo 👋</p>
                <p className="mt-1 text-xs text-muted-foreground max-w-65">
                  Tell me what you&apos;re looking for and I&apos;ll help you browse our catalogue.
                </p>
              </div>

              <div className="w-full grid grid-cols-3 gap-2">
                {departmentData.map((dept) => (
                  <button
                    key={dept.title}
                    onClick={() => sendMessage(dept.title)}
                    className="flex flex-col items-center gap-1.5 rounded border border-border/80 bg-card px-2 py-3 text-center transition-all hover:border-primary/40 hover:bg-primary/5 hover:shadow-xs"
                  >
                    <div className="relative h-10 w-10 flex items-center justify-center">
                      <Image
                        src={dept.icon}
                        alt={dept.title}
                        fill
                        sizes="40px"
                        className="object-contain"
                      />
                    </div>
                    <span className="text-[10px] font-medium text-foreground leading-tight">
                      {dept.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message bubbles */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              {/* Bubble */}
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed
                  ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-xs shadow-xs'
                      : 'bg-muted/80 text-foreground border border-border/60 rounded-bl-xs backdrop-blur-xs'
                  }`}
              >
                {msg.content}
              </div>

              {/* Product grid */}
              {msg.products && msg.products.length > 0 && (
                <div className="w-full grid grid-cols-2 gap-2">
                  {msg.products.map((p) => (
                    <AiProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}

              {/* Feedback (assistant only) */}
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-1 pl-0.5">
                  <button
                    onClick={() => setFeedback(msg.id, 'up')}
                    className={`flex h-6 w-6 items-center justify-center rounded-md transition-colors
                      ${
                        msg.feedback === 'up'
                          ? 'bg-primary/20 text-primary font-bold'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                  >
                    <HugeiconsIcon icon={ThumbsUpIcon} size={12} />
                  </button>
                  <button
                    onClick={() => setFeedback(msg.id, 'down')}
                    className={`flex h-6 w-6 items-center justify-center rounded-md transition-colors
                      ${
                        msg.feedback === 'down'
                          ? 'bg-destructive/15 text-destructive font-bold'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                  >
                    <HugeiconsIcon icon={ThumbsDownIcon} size={12} />
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isPending && (
            <div className="flex items-start">
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-xs bg-muted/80 border border-border/60 px-4 py-3">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input ── */}
        <div className="border-t border-border/60 bg-card p-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center gap-2"
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isPending}
              placeholder="e.g. modern sofa under $600…"
              className="flex-1 rounded border border-input bg-background px-3.5 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isPending}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:bg-[#3d5747] hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
            >
              <HugeiconsIcon icon={SentIcon} size={15} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
