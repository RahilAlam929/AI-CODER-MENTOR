"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { EngineeringBranch } from "@/app/dashboard/page";

interface Message {
  id: string;
  sender: "user" | "engine";
  content: string;
  epoch: number;
}

export default function ChatAssistant({ branch }: { branch: EngineeringBranch }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "system-init",
      sender: "engine",
      content: `System pipeline initialized. Awaiting queries concerning mathematical validations, computational setups, or standard practices inside the domain of ${branch}.`,
      epoch: Date.now(),
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const viewportRef = useRef<HTMLDivElement>(null);

  // Manual implementation of scroll anchoring for human interaction look
  const scrollToAnchor = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToAnchor();
  }, [messages, isProcessing]);

  const dispatchQuery = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isProcessing) return;

    const queryPayload = inputVal;
    setInputVal("");
    
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), sender: "user", content: queryPayload, epoch: Date.now() },
    ]);
    
    setIsProcessing(true);

    try {
      
      await new Promise((res) => setTimeout(res, 1400));
      
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "engine",
          content: `Parsed engineering telemetry for [${branch}]. The parameters have been checked against core standards. Connect your backend API gateway to replace this structural block with native token stream generations.`,
          epoch: Date.now(),
        },
      ]);
    } catch (err) {
      console.error("Pipeline breakdown:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 h-[calc(100vh-65px)]">
      {/* Thread Stream */}
      <div 
        ref={viewportRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-start gap-4 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Profile node indicators */}
              <div className={`flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-lg text-xs font-mono font-bold border ${
                msg.sender === "user" 
                  ? "bg-blue-950 border-blue-500/30 text-blue-400" 
                  : "bg-slate-900 border-slate-800 text-slate-400"
              }`}>
                {msg.sender === "user" ? "U" : "E"}
              </div>

              
              <div className={`flex flex-col space-y-1 max-w-[80%] ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                <div className="flex items-center gap-2 px-1">
                  <span className="text-[10px] font-mono tracking-wider font-bold uppercase text-slate-500">
                    {msg.sender === "user" ? "Client_Node" : `Core_Engine_System [${branch}]`}
                  </span>
                  <span className="text-[9px] font-mono text-slate-600">
                    {new Date(msg.epoch).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
                <div className={`rounded-xl px-4 py-3 text-xs leading-relaxed border font-sans ${
                  msg.sender === "user"
                    ? "bg-blue-600/10 border-blue-500/20 text-blue-100"
                    : "bg-slate-900/40 border-slate-900 text-slate-200"
                }`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex items-center gap-3 text-xs font-mono text-slate-500 bg-slate-900/30 border border-slate-900 px-4 py-3 rounded-xl w-fit animate-pulse">
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
              </div>
              <span>Assembling solution matrix...</span>
            </div>
          )}
        </div>
      </div>

      {/* Frame Console Box Input */}
      <div className="p-4 border-t border-slate-800/60 bg-slate-950/80 backdrop-blur-sm">
        <form onSubmit={dispatchQuery} className="max-w-3xl mx-auto flex gap-2.5">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={`Interface query context: ${branch}...`}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all font-sans"
          />
          <button
            type="submit"
            disabled={isProcessing || !inputVal.trim()}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-900 disabled:text-slate-600 px-4 py-2.5 rounded-xl text-xs font-semibold text-white tracking-wide transition-colors cursor-pointer shrink-0"
          >
            Compute
          </button>
        </form>
      </div>
    </div>
  );
}
