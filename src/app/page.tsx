"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

export type EngineeringBranch = 
  | "Computer Science" 
  | "Mechanical" 
  | "Electrical" 
  | "Civil" 
  | "Chemical";

export type WorkspaceTab = "chat" | "projects" | "research" | "pipeline";

interface Message {
  id: string;
  sender: "user" | "engine";
  content: string;
  epoch: number;
}

interface PipelineBlueprint {
  uid: string;
  nomenclature: string;
  scopeDomain: string;
  complexity: string;
  allocationCap: string;
  schematicBreakdown: string;
  stackModules: string[];
}

export default function Home() {
  const [currentBranch, setCurrentBranch] = useState<EngineeringBranch>("Computer Science");
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("chat");

  const navigationItems = [
    { id: "chat", label: "AI Chat Assistant", icon: "", disabled: false },
    { id: "projects", label: "Project Engine", icon: "", disabled: false },
    { id: "research", label: "Research Sync", icon: "", disabled: true },
    { id: "pipeline", label: "Placement Prep", icon: "", disabled: true },
  ];

  return (
    <>
      <Navbar />
      <HeroSection />
      <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col antialiased selection:bg-blue-500/30">
        <div className="flex-1 flex flex-col md:flex-row">
          <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800/60 glass-card p-4 space-y-1 shadow-premium animate-fade-in-up">
            <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase px-3 mb-2 font-mono">
              Ecosystem Core
            </p>
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => !item.disabled && setActiveTab(item.id as WorkspaceTab)}
                  disabled={item.disabled}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all glass-card shadow-premium hover:scale-[1.025] hover:shadow-lg focus:scale-[1.03] focus:shadow-xl ${
                    activeTab === item.id && !item.disabled
                      ? "bg-gradient-to-r from-[#23233b] to-[#18181b] text-blue-400 border border-blue-500/30 neon-text"
                      : "text-slate-400 hover:text-white border border-transparent"
                  } ${item.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm scale-110">{item.icon}</span>
                    {item.label}
                  </div>
                  {item.disabled && (
                    <span className="text-[9px] font-mono tracking-widest text-slate-600 uppercase border border-slate-800 bg-slate-900 px-1.5 py-0.5 rounded">
                      Lock
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </aside>

          <main className="flex-1 bg-slate-950 flex flex-col relative animate-fade-in-up">
            {activeTab === "chat" && <ChatAssistantModule branch={currentBranch} />}
            {activeTab === "projects" && <ProjectEngineModule branch={currentBranch} />}
          </main>
        </div>
      </main>
    </>
  );
}


function ChatAssistantModule({ branch }: { branch: EngineeringBranch }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [assistantMessageId, setAssistantMessageId] = useState<string | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: "system-init",
        sender: "engine",
        content: `System pipeline initialized. Awaiting queries concerning mathematical validations, computational setups, or standard practices inside the domain of ${branch}.`,
        epoch: Date.now(),
      },
    ]);
    setAssistantMessageId(null);
  }, [branch]);

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
    const newAssistantMessageId = crypto.randomUUID();
    setAssistantMessageId(newAssistantMessageId);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryPayload, branch: branch }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Server status: ${response.status}`);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: newAssistantMessageId,
          sender: "engine",
          content: "",
          epoch: Date.now(),
        },
      ]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        accumulatedText += decoder.decode(value, { stream: true });

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newAssistantMessageId
              ? { ...msg, content: accumulatedText }
              : msg
          )
        );
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.id !== newAssistantMessageId);
        return [
          ...filtered,
          {
            id: crypto.randomUUID(),
            sender: "engine",
            content: "🚨 Connection error: Unable to communicate with the engineering backend infrastructure.",
            epoch: Date.now(),
          },
        ];
      });
    } finally {
      setIsProcessing(false);
      setAssistantMessageId(null);
    }
  };

  return (
    <div className="flex flex-col flex-1 h-[calc(100vh-65px)]">
      <div ref={viewportRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-4 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-lg text-xs font-mono font-bold border ${
                msg.sender === "user" ? "bg-blue-950 border-blue-500/30 text-blue-400" : "bg-slate-900 border-slate-800 text-slate-400"
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
                <div className={`rounded-xl px-4 py-3 text-xs leading-relaxed border ${
                  msg.sender === "user" ? "bg-blue-600/10 border-blue-500/20 text-blue-100" : "bg-slate-900/40 border-slate-900 text-slate-200"
                }`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}

          {isProcessing && assistantMessageId && !messages.find(m => m.id === assistantMessageId)?.content && (
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

      <div className="p-4 border-t border-slate-800/60 bg-slate-950/80 backdrop-blur-sm">
        <form onSubmit={dispatchQuery} className="max-w-3xl mx-auto flex gap-2.5">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={`Interface query context: ${branch}...`}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
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

function ProjectEngineModule({ branch }: { branch: EngineeringBranch }) {
  const [subDomain, setSubDomain] = useState("");
  const [fundingCap, setFundingCap] = useState("");
  const [complexityTier, setComplexityTier] = useState("Intermediate System");
  const [isCompiling, setIsCompiling] = useState(false);
  const [compiledBlueprint, setCompiledBlueprint] = useState<PipelineBlueprint | null>(null);

  const triggerSynthesis = async (e: FormEvent) => {
    e.preventDefault();
    setIsCompiling(true);

    try {
      await new Promise((res) => setTimeout(res, 1800));
      
      setCompiledBlueprint({
        uid: crypto.randomUUID().slice(0, 8).toUpperCase(),
        nomenclature: `Automated Edge Orchestration Mesh [${branch}]`,
        scopeDomain: subDomain || "General Systems Core",
        complexity: complexityTier,
        allocationCap: fundingCap ? `$${fundingCap}` : "Standard Sandbox Tier",
        schematicBreakdown: "Client application layers pipe real-time transactional telemetry into secure edge gateway handlers. Data streams pass downstream through dedicated structural parsing loops before persisting in high-throughput transactional storage layouts.",
        stackModules: ["FastAPI Engine", "TypeScript Native", "PostgreSQL Storage", "Docker Cluster"]
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-5xl mx-auto w-full animate-fade-in">
      <div className="border-b border-slate-800/60 pb-4">
        <h2 className="text-lg font-bold text-slate-100 tracking-tight">Project Generation System</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Map custom engineering operational specifications directly into dynamic architecture modules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        <form onSubmit={triggerSynthesis} className="bg-slate-900/40 border border-slate-900 p-5 rounded-xl space-y-4 lg:col-span-2 shadow-sm">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Parameters Blueprint</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Target Branch Context</label>
              <input 
                type="text" 
                value={branch} 
                disabled 
                className="w-full bg-slate-950 border border-slate-800/80 text-slate-500 rounded-lg px-3 py-2 text-xs font-mono select-none cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Functional Domain Area</label>
              <input 
                type="text" 
                value={subDomain}
                onChange={(e) => setSubDomain(e.target.value)}
                placeholder="e.g. Computer Vision, IoT Networks" 
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Max Component Budget (USD)</label>
              <input 
                type="number" 
                value={fundingCap}
                onChange={(e) => setFundingCap(e.target.value)}
                placeholder="e.g. 250" 
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">System Complexity Profile</label>
              <select
                value={complexityTier}
                onChange={(e) => setComplexityTier(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
              >
                <option value="Beginner Prototype">Beginner Prototype</option>
                <option value="Intermediate System">Intermediate Architecture</option>
                <option value="Advanced Infrastructure">Advanced Infrastructure</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isCompiling}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-900 disabled:text-slate-600 text-xs font-semibold tracking-wide py-2.5 rounded-lg text-white mt-2 transition-all cursor-pointer"
          >
            {isCompiling ? "Compiling Matrix Spec..." : "Synthesize Architecture"}
          </button>
        </form>

        <div className="lg:col-span-3 min-h-[320px] flex flex-col">
          {compiledBlueprint ? (
            <div className="bg-slate-900/30 border border-slate-900 rounded-xl p-5 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    SPEC_ID // {compiledBlueprint.uid}
                  </span>
                  <h3 className="text-sm font-bold text-slate-100 mt-1.5">{compiledBlueprint.nomenclature}</h3>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-900">
                  <span className="block text-[10px] text-slate-500 font-bold mb-0.5">DOMAIN</span>
                  <span className="text-slate-300 text-[11px] truncate block">{compiledBlueprint.scopeDomain}</span>
                </div>
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-900">
                  <span className="block text-[10px] text-slate-500 font-bold mb-0.5">COMPLEXITY</span>
                  <span className="text-slate-300 text-[11px] truncate block">{compiledBlueprint.complexity}</span>
                </div>
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-900">
                  <span className="block text-[10px] text-slate-500 font-bold mb-0.5">BUDGET_CAP</span>
                  <span className="text-slate-300 text-[11px] truncate block">{compiledBlueprint.allocationCap}</span>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Dynamic Layout Breakdown</h4>
                <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-900 font-mono text-xs text-slate-300 leading-relaxed">
                  {compiledBlueprint.schematicBreakdown}
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Verified Stack Allocations</h4>
                <div className="flex flex-wrap gap-1.5">
                  {compiledBlueprint.stackModules.map((mod, idx) => (
                    <span key={idx} className="bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[10px] px-2.5 py-1 rounded-md shadow-sm">
                      {mod}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-slate-900 bg-slate-950/20 rounded-xl flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
              <span className="text-xl mb-1.5 opacity-60">📊</span>
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Pipeline Suspended</p>
              <p className="text-[11px] max-w-xs text-slate-500 mt-1 leading-relaxed">
                Configure constraints inside the parameter selector matrix to pull structured layout designs from the AI core engine.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
