"use client";

import { useState, FormEvent } from "react";
import { EngineeringBranch } from "@/app/dashboard/page";

interface PipelineBlueprint {
  uid: string;
  nomenclature: string;
  scopeDomain: string;
  complexity: string;
  allocationCap: string;
  schematicBreakdown: string;
  stackModules: string[];
}

export default function ProjectEngine({ branch }: { branch: EngineeringBranch }) {
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
    <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-5xl mx-auto w-full">
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
            <div className="bg-slate-900/30 border border-slate-900 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    SPEC_ID // {compiledBlueprint.uid}
                  </span>
                  <h3 className="text-sm font-bold text-slate-100 mt-1.5">{compiledBlueprint.nomenclature}</h3>
                </div>
              </div>

              {/* Param Grid Display */}
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

              {/* Architectural narrative layout */}
              <div className="space-y-1">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">Schematic Layout Suggestion</h4>
                <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-900 font-mono text-xs text-slate-300 leading-relaxed">
                  {compiledBlueprint.schematicBreakdown}
                </div>
              </div>

              {/* Tag Modules implementation */}
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