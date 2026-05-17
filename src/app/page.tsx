"use client";

import { FormEvent, useState } from "react";

import StickerFloat from "@/src/components/StickerFloat";

type ChatMessage = {
  id: number;
  role: "user" | "bot";
  text: string;
};

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "bot",
      text: "hey. i brought a little midnight, a little melodrama, and absolutely no emotional regulation. what are we spiraling about tonight?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = input.trim();

    if (!message || isLoading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      text: message,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = (await response.json()) as { reply?: string };

      if (!response.ok) {
        throw new Error(data.reply ?? "chat request failed");
      }

      const botMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "bot",
        text: data.reply ?? "i blanked. very on brand, but still tragic.",
      };

      setMessages((currentMessages) => [...currentMessages, botMessage]);
    } catch (error) {
  console.error("Frontend chat error:", error);

  setMessages((currentMessages) => [
    ...currentMessages,
    {
      id: Date.now() + 2,
      role: "bot",
      text: "api failed. check the terminal/server console for the real error.",
    },
  ]);
} finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#02040b] px-4 py-10 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(80,110,180,0.28),transparent_32%),radial-gradient(circle_at_20%_70%,rgba(133,98,149,0.16),transparent_28%),linear-gradient(180deg,#071126_0%,#03050d_54%,#010207_100%)]" />
      <div className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:88px_88px]" />
      <div className="absolute inset-0 opacity-[0.09] [background-image:radial-gradient(circle,rgba(255,255,255,.9)_1px,transparent_1px)] [background-size:4px_4px]" />
      <StickerFloat />

      <section className="relative w-full max-w-2xl">
        <div className="absolute -inset-6 rounded-[2rem] bg-blue-300/10 blur-3xl" />

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/35 shadow-2xl shadow-blue-950/50 backdrop-blur-xl">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/60 to-transparent" />

          <div className="px-6 pb-6 pt-10 text-center sm:px-10">
            <p className="mb-3 text-xs font-medium lowercase tracking-[0.5em] text-blue-200/70">
              disaster & exit
            </p>
            <h1 className="text-6xl font-black lowercase tracking-normal text-white drop-shadow-[0_0_28px_rgba(147,197,253,0.38)] sm:text-8xl">
              conebot
            </h1>
            <p className="mt-4 text-sm lowercase tracking-[0.22em] text-slate-300/80 sm:text-base">
              a little less human version of conehead
            </p>
          </div>

          <div className="mx-4 mb-4 rounded-2xl border border-white/10 bg-[#050816]/80 p-4 shadow-inner shadow-black/60 sm:mx-8 sm:p-5">
            <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-300 shadow-[0_0_16px_rgba(253,164,175,0.8)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-blue-200 shadow-[0_0_16px_rgba(191,219,254,0.8)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-violet-200 shadow-[0_0_16px_rgba(221,214,254,0.8)]" />
              <span className="ml-auto text-[10px] lowercase tracking-[0.28em] text-slate-500">
                {isLoading ? "spiraling..." : "online-ish"}
              </span>
            </div>

            <div className="flex min-h-72 max-h-[26rem] flex-col gap-4 overflow-y-auto rounded-2xl border border-blue-100/10 bg-[linear-gradient(135deg,rgba(15,23,42,.92),rgba(2,6,23,.96))] p-4">
              {messages.map((message) => {
                const isUser = message.role === "user";

                return (
                  <div
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    key={message.id}
                  >
                    <div
                      className={`max-w-[82%] rounded-2xl border px-4 py-3 text-left text-sm leading-6 shadow-lg ${
                        isUser
                          ? "rounded-tr-sm border-blue-100/20 bg-blue-100/90 text-[#06101f] shadow-blue-300/10"
                          : "rounded-tl-sm border-white/10 bg-white/[0.07] text-slate-100 shadow-blue-950/30"
                      }`}
                    >
                      <p
                        className={`text-xs lowercase tracking-[0.24em] ${
                          isUser ? "text-[#1e3a5f]/70" : "text-blue-200/60"
                        }`}
                      >
                        {isUser ? "you" : "conanbot"}
                      </p>
                      <p className="mt-2 whitespace-pre-wrap">{message.text}</p>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[82%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.07] px-4 py-3 text-left shadow-lg shadow-blue-950/30">
                    <p className="text-xs lowercase tracking-[0.24em] text-blue-200/60">
                      conanbot
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-100">
                      typing like the notes app is open...
                    </p>
                  </div>
                </div>
              )}
            </div>

            <form className="mt-4 flex gap-3" onSubmit={handleSubmit}>
              <input
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm lowercase text-white outline-none transition placeholder:text-slate-500 focus:border-blue-200/50 focus:bg-white/[0.09] focus:shadow-[0_0_22px_rgba(147,197,253,0.16)] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isLoading}
                onChange={(event) => setInput(event.target.value)}
                placeholder="type something dramatic..."
                type="text"
                value={input}
              />
              <button
                className="rounded-full border border-blue-200/30 bg-blue-100 px-5 py-3 text-sm font-bold lowercase tracking-[0.18em] text-[#06101f] shadow-[0_0_24px_rgba(147,197,253,0.35)] transition hover:bg-white hover:shadow-[0_0_34px_rgba(191,219,254,0.5)] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isLoading || !input.trim()}
                type="submit"
              >
                {isLoading ? "wait" : "send"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
