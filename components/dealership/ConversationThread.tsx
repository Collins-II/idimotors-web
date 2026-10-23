"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, LockKeyhole, Send } from "lucide-react";
import { PortalError, cssUrl, portalFetch, vehicleName, type Thread, type ThreadMessage } from "@/lib/portal";

const POLL_MS = 20_000;

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-ZM", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function ConversationThread({ token }: { token: string }) {
  const [thread, setThread] = useState<Thread | null>(null);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const path = `/api/public/conversations/${encodeURIComponent(token)}`;

  const load = useCallback(async () => {
    try {
      setThread(await portalFetch<Thread>(path));
      setError("");
    } catch (caught) {
      if (caught instanceof PortalError && caught.status === 404) setNotFound(true);
      else setError(caught instanceof Error ? caught.message : "We couldn't load this conversation.");
    }
  }, [path]);

  useEffect(() => {
    void load();
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") void load();
    }, POLL_MS);
    return () => window.clearInterval(timer);
  }, [load]);

  const messageCount = thread?.messages.length ?? 0;
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messageCount]);

  async function send(event?: React.FormEvent) {
    event?.preventDefault();
    const body = draft.trim();
    if (!body || sending) return;
    setSending(true);
    setSendError("");
    try {
      const message = await portalFetch<ThreadMessage>(path, { method: "POST", body: { body } });
      setThread((current) => current && { ...current, conversation: { ...current.conversation, status: "open" }, messages: [...current.messages, message] });
      setDraft("");
    } catch (caught) {
      setSendError(caught instanceof Error ? caught.message : "Your message could not be sent.");
    } finally {
      setSending(false);
    }
  }

  if (notFound) {
    return (
      <div className="rounded-[22px] border border-[#e7e7e0] bg-white p-10 text-center">
        <LockKeyhole size={28} className="mx-auto text-[#9aa087]" />
        <h1 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">This link isn’t valid</h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#777970]">The conversation may have been removed, or the link was copied incompletely. Please check the email we sent you, or start a new conversation.</p>
        <Link href="/contact" className="mt-6 inline-flex rounded-full bg-[#20231d] px-5 py-3 text-sm font-semibold text-white">Contact us</Link>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="grid min-h-[40vh] place-items-center text-sm text-[#777970]" role="status">
        {error ? <div className="text-center"><p>{error}</p><button onClick={() => void load()} className="mt-4 rounded-full border border-[#e4e5dd] px-5 py-2.5 text-xs font-semibold">Try again</button></div> : <Loader2 className="animate-spin" />}
      </div>
    );
  }

  const { conversation, messages } = thread;
  return (
    <div>
      <Link href="/inventory" className="inline-flex items-center gap-2 text-xs font-semibold text-[#7b7e74] transition hover:text-[#252820]"><ArrowLeft size={14} /> Back to the collection</Link>
      <header className="mt-7 flex flex-col gap-5 rounded-t-[22px] border border-[#e7e7e0] bg-white p-6 sm:flex-row sm:items-center sm:p-8">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#85877e]">Your conversation with {conversation.dealership}</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{conversation.subject}</h1>
          <p className="mt-1 flex items-center gap-2 text-xs text-[#8b8d85]"><LockKeyhole size={12} /> Private link. Keep it to yourself.</p>
        </div>
        {conversation.vehicle && (
          <Link href={`/inventory/${conversation.vehicle.slug}`} className="flex items-center gap-3 rounded-2xl border border-[#ecece6] p-2 pr-4 transition hover:bg-[#fafaf7]">
            <span className="h-14 w-20 shrink-0 rounded-xl bg-[#efefeb] bg-cover bg-center" style={conversation.vehicle.image ? { backgroundImage: cssUrl(conversation.vehicle.image) } : undefined} />
            <span className="text-xs font-semibold text-[#34372f]">{vehicleName(conversation.vehicle)}</span>
          </Link>
        )}
      </header>

      <div className="max-h-[60vh] min-h-[280px] space-y-4 overflow-y-auto border-x border-[#e7e7e0] bg-[#fafaf7] p-5 sm:p-8" aria-live="polite">
        {messages.map((message) => {
          const mine = message.sender === "customer";
          return (
            <div key={message.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[75%] ${mine ? "bg-[#20231d] text-white" : "border border-[#e7e7e0] bg-white text-[#34372f]"}`}>
                <p className={`mb-1 text-[10px] font-semibold ${mine ? "text-white/60" : "text-[#85877e]"}`}>{mine ? "You" : message.authorName || conversation.dealership} · {formatTime(message.createdAt)}</p>
                <p className="whitespace-pre-wrap break-words text-sm leading-6">{message.body}</p>
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      <form onSubmit={send} className="rounded-b-[22px] border border-[#e7e7e0] bg-white p-4 sm:p-6">
        <label htmlFor="reply" className="sr-only">Your reply</label>
        <textarea
          id="reply"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => { if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) void send(); }}
          rows={3}
          maxLength={4000}
          placeholder={conversation.status === "closed" ? "This conversation is closed. Send a message to reopen it." : "Write a reply…"}
          className="w-full resize-y rounded-xl border border-[#e4e5dd] bg-[#fafaf7] px-4 py-3 text-sm outline-none transition focus:border-[#a9b48f] focus:bg-white"
        />
        {sendError && <p role="alert" className="mt-2 text-xs text-[#a3573a]">{sendError}</p>}
        <div className="mt-3 flex items-center justify-between gap-4">
          <span className="text-[10px] text-[#92948c]">We’ll email you when the team replies. Ctrl + Enter to send.</span>
          <button type="submit" disabled={sending || !draft.trim()} className="inline-flex items-center gap-2 rounded-full bg-[#20231d] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3a3e34] disabled:cursor-not-allowed disabled:opacity-50">
            {sending ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />} Send
          </button>
        </div>
      </form>
    </div>
  );
}
