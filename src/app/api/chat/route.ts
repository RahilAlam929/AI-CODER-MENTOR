import { NextResponse } from "next/server";

const KNOWLEDGE_BASE: Record<string, Record<string, string>> = {
  "Computer Science": {
    welcome: "Hello Engineer! Computer Science core operational. Ready to assist you with Algorithms, System Architecture, Database Optimization, or Web Development.",
    website: `🌐 To develop a modern website, focus on three layers:\n\n1. Frontend: HTML, CSS, JavaScript (Next.js/React)\n2. Backend: Node.js (Express), Python (FastAPI), or Java (Spring Boot)\n3. Database: PostgreSQL or MongoDB.\n\nRun 'npx create-next-app@latest' to instantly initialize a project framework.`,
    database: `💾 Database Management System (DBMS):\n\n- Relational (SQL): Use PostgreSQL or MySQL for strict ACID compliance and structured relational schemas.\n- Non-Relational (NoSQL): Use MongoDB or Redis for unstructured document storage and horizontal scalability.`,
    code: `💻 Debugging Engine: Please provide your code snippet or stack trace. I will isolate syntax breaks, runtime exceptions, and optimize Big-O runtime complexity.`
  },
  "Chemical": {
    welcome: "Chemical Engineering matrix online. Standing by for Mass Transfer, Thermodynamics, or Process Simulation analytics.",
    reactor: "🧪 Reactor Performance: Core models mapped for continuous stirred-tank (CSTR) and plug flow (PFR) reactors. Please provide space velocity, target conversion rates, and activation energy indexes."
  },
  "Mechanical": {
    welcome: "Mechanical Engineering systems online. Ready for CAD modeling specs, finite element analysis (FEA), or thermal dynamics.",
    cad: "🛠️ CAD Design System: Keep static load distributions, stress vectors, and material metrics (e.g., Anodized Aluminum 6061 vs Structural Steel) clear when mapping component geometry."
  },
  "Electrical": {
    welcome: "Electrical Engineering systems online. Ready for Signal Processing, Power Systems telemetry, or Circuit Simulation.",
  },
  "Civil": {
    welcome: "Civil Engineering systems online. Ready for Structural Analysis metrics, Geotechnical parameters, or Concrete mixture designs.",
  }
};

export async function POST(request: Request) {
  try {
    const { query, branch } = await request.json();

    if (!query || !branch) {
      return NextResponse.json({ error: "Missing required parameters: query or branch" }, { status: 400 });
    }

    const q = query.toLowerCase();
    const branchData = KNOWLEDGE_BASE[branch] || {};
    
    let responseText = `Telemetry parsed for [${branch}]. Query matrix evaluated. Bridge an active AI model API inside this Route Handler to parse production tasks.`;

    if (q.includes("hi") || q.includes("hello")) {
      responseText = branchData.welcome || responseText;
    } else if (q.includes("website") || q.includes("web dev") || q.includes("develop")) {
      responseText = branchData.website || responseText;
    } else if (q.includes("database") || q.includes("sql") || q.includes("mongo")) {
      responseText = branchData.database || responseText;
    } else if (q.includes("code") || q.includes("bug") || q.includes("error")) {
      responseText = branchData.code || responseText;
    } else if (q.includes("reactor") || q.includes("design")) {
      responseText = branchData.reactor || responseText;
    } else if (q.includes("cad") || q.includes("design") || q.includes("3d")) {
      responseText = branchData.cad || responseText;
    }

    const encoder = new TextEncoder();
    
    const stream = new ReadableStream({
      async start(controller) {
        const words = responseText.split(" ");
        
        for (let i = 0; i < words.length; i++) {
          const chunk = words[i] + (i === words.length - 1 ? "" : " ");
          controller.enqueue(encoder.encode(chunk));
          
          await new Promise((resolve) => setTimeout(resolve, 40));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Processing Error" }, { status: 500 });
  }
}
