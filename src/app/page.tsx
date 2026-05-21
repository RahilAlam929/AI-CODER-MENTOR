"use client";

import { useState, useRef, useEffect, FormEvent } from "react";


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
    { id: "chat", label: "AI Chat Assistant", icon: "💬" },
    { id: "projects", label: "Project Engine", icon: "" },
    { id: "research", label: "Research Sync", icon: "", disabled: true },
    { id: "pipeline", label: "Placement Prep", icon: "", disabled: true },
  ] as const;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col antialiased selection:bg-blue-500/30">
      
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/70 px-6 py-3.5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 font-mono text-base font-black tracking-tighter text-white shadow-lg shadow-blue-500/20">
            Σ
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-100">
              EngineerOS <span className="font-mono text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20 ml-1">v1.0.0-MVP</span>
            </h1>
          </div>
        </div>

       
        <div className="flex items-center gap-2 rounded-xl bg-slate-900/60 p-1.5 border border-slate-800/80">
          <span className="text-[11px] font-medium tracking-wide text-slate-400 uppercase px-2 font-mono">Branch Context</span>
          <select
            value={currentBranch}
            onChange={(e) => setCurrentBranch(e.target.value as EngineeringBranch)}
            className="bg-slate-950 text-xs font-medium text-slate-200 border border-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
          >
            <option value="Computer Science">Computer Science & Eng</option>
            <option value="Mechanical">Mechanical Engineering</option>
            <option value="Electrical">Electrical Engineering</option>
            <option value="Civil">Civil Engineering</option>
            <option value="Chemical">Chemical Engineering</option>
          </select>
        </div>
      </header>

     
      <div className="flex-1 flex flex-col md:flex-row">
        
        
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800/60 bg-slate-950/40 p-4 space-y-1">
          <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase px-3 mb-2 font-mono">
            Ecosystem Core
          </p>
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => !item.disabled && setActiveTab(item.id)}
                disabled={item.disabled}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-all ${
                  activeTab === item.id && !item.disabled
                    ? "bg-gradient-to-r from-blue-600/10 to-indigo-600/5 text-blue-400 border border-blue-500/20 shadow-sm"
                    : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-200 border border-transparent"
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

        
        <main className="flex-1 bg-slate-950 flex flex-col relative">
          {activeTab === "chat" && <ChatAssistantModule branch={currentBranch} />}
          {activeTab === "projects" && <ProjectEngineModule branch={currentBranch} />}
        </main>
      </div>
    </main>
  );
}


function ChatAssistantModule({ branch }: { branch: EngineeringBranch }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
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
  }, [branch]);

  const scrollToAnchor = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToAnchor();
  }, [messages, isProcessing]);

  // Dynamically generates context-aware engineering responses in English
  const getDynamicResponse = (query: string, currentBranch: EngineeringBranch): string => {
    const q = query.toLowerCase();
    
    // ==========================================
    // COMPUTER SCIENCE BRANCH LOGIC
    // ==========================================
    if (currentBranch === "Computer Science") {
      if (q.includes("hi") || q.includes("hello")) {
        return "Hello Engineer! Computer Science core operational. Ready to assist you with Algorithms, System Architecture, Database Optimization, or Web Development.";
      }
      
      if (q.includes("website") || q.includes("web dev") || q.includes("develop")) {
        return `🌐 To develop a modern website, you need to focus on three core layers:\n\n` +
               `1. Frontend (User Interface): Build the visual layer using HTML, CSS, and JavaScript. For production, modern frameworks like Next.js, React, or Vue are highly recommended.\n` +
               `2. Backend (Server Logic): Handle authentication, APIs, and business logic using environments like Node.js (Express), Python (Django/FastAPI), or Java (Spring Boot).\n` +
               `3. Database (Data Persistence): Store your application data securely using Relational systems (PostgreSQL, MySQL) or Document-based NoSQL systems (MongoDB).\n\n` +
               `To spin up a modern full-stack project instantly, you can initialize a repository using: 'npx create-next-app@latest'. Which layer would you like to explore first?`;
      }

      if (q.includes("database") || q.includes("sql") || q.includes("mongo")) {
        return `💾 Database Management System (DBMS) Core:\n\n` +
               `- Use Relational Databases (SQL like PostgreSQL, MySQL) if your data structures are highly organized and require strict ACID compliance or complex relational queries.\n` +
               `- Use Non-Relational Databases (NoSQL like MongoDB, Redis) if you are handling unstructured data, horizontal scaling, or rapid prototyping.\n\n` +
               `Are you looking to optimize a specific query execution plan, or are you designing a new schema architecture?`;
      }

      if (q.includes("code") || q.includes("bug") || q.includes("error")) {
        return `💻 Code Debugging Subsystem Active: Please paste your code snippet or error logs directly into the terminal interface. I will analyze the runtime behavior, catch syntax breaks, and optimize the Big-O time complexity.`;
      }
      
      return `Telemetry parsed for [Computer Science]. Analyzed your query regarding technical implementation. Standard paradigm advises optimizing resource allocation grids and reviewing runtime complexities. Provide a specific sub-topic (e.g., Web Development, Databases, or Algorithms) to stream native solutions.`;
    }
    
    
    if (currentBranch === "Chemical") {
      if (q.includes("hi") || q.includes("hello")) {
        return "System Node active. Chemical Engineering engine online. Ready to analyze Mass Transfer, Thermodynamics, or Process Simulation data.";
      }
      if (q.includes("reactor") || q.includes("design")) {
        return "🧪 Reactor Design Module: Continuous Stirred-Tank Reactor (CSTR) and Plug Flow Reactor (PFR) kinetics calculation engine online. Please supply your space velocity, conversion targets, and activation energy constants.";
      }
      return `Telemetry parsed for [Chemical Engineering]. Reactor models and fluid dynamics simulated against core standards. For live empirical analysis and precise chemical stoichiometry formulas, interface your LLM server endpoint.`;
    }

    
    if (currentBranch === "Mechanical") {
      if (q.includes("hi") || q.includes("hello")) {
        return "Mechanical Systems Engine activated. Prepared to assist with CAD modeling specs, Finite Element Analysis (FEA), or Fluid Dynamics.";
      }
      if (q.includes("cad") || q.includes("design") || q.includes("3d")) {
        return "🛠️ Mechanical Design Active: Ensure to calculate proper tolerances, stress concentrations, and material selections (e.g., Anodized Aluminum 6061 vs. Structural Steel) when mapping out 3D models in CAD platforms.";
      }
      return `Telemetry parsed for [Mechanical Engineering]. Stress matrices and kinematic loops checked against industry baselines. Connect your production API gateway to parse specific mechanical stress loads.`;
    }

    
    if (currentBranch === "Electrical") {
      if (q.includes("hi") || q.includes("hello")) {
        return "Electrical Infrastructure Node live. Ready to compute Signal Processing algorithms, Power Systems telemetry, or Circuit Simulation validations.";
      }
      return `Telemetry parsed for [Electrical Engineering]. Voltage profiles, impedance matches, and signal-to-noise configurations verified. Replace this sandbox handler with live backend nodes to process real-time wave telemetry.`;
    }

    
    if (currentBranch === "Civil") {
      if (q.includes("hi") || q.includes("hello")) {
        return "Civil Engineering core module online. Standing by for Structural Analysis metrics, Geotechnical parameters, or Concrete mixture design validations.";
      }
      return `Telemetry parsed for [Civil Engineering]. Load distribution vectors and structural safety margins simulated against default codes. Interface your custom API backend to stream production layout blueprints.`;
    }

    return `Parsed telemetry for [${currentBranch}]. Parameters verified against core engineering protocols.`;
  };

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
      await new Promise((res) => setTimeout(res, 1000));
      const smartResponse = getDynamicResponse(queryPayload, branch);
      
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "engine",
          content: smartResponse,
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
      {/* Scrollable Feed */}
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
      console.error("Synthesis aborted:", err);
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