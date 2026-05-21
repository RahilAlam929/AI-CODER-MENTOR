"use client";

import { useState } from "react";
import ChatAssistant from "@/components/ChatAssistant";
import ProjectEngine from "@/components/ProjectEngine";


export type EngineeringBranch = 
  | "Computer Science" 
  | "Mechanical" 
  | "Electrical" 
  | "Civil" 
  | "Chemical";

export type WorkspaceTab = "chat" | "projects" | "research" | "pipeline";

export default function DashboardPage() {
  const [currentBranch, setCurrentBranch] = useState<EngineeringBranch>("Computer Science");
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("chat");

  
  const navigationItems = [
    { id: "chat", label: "AI Chat Assistant", icon: "💬" },
    { id: "projects", label: "Project Engine", icon: "🛠️" },
    { id: "research", label: "Research Sync", icon: "🔬", disabled: true },
    { id: "pipeline", label: "Placement Prep", icon: "🚀", disabled: true },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col antialiased selection:bg-blue-500/30">
     
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
          {activeTab === "chat" && <ChatAssistant branch={currentBranch} />}
          {activeTab === "projects" && <ProjectEngine branch={currentBranch} />}
        </main>
      </div>
    </div>
  );
}