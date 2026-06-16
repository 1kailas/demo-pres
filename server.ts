import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Global leads database to store client inquiries in memory (simulating prestige CRM)
interface SavedInquiry {
  id: string;
  clientName: string;
  firmName?: string;
  vision: string;
  budgetTier: string;
  archetype: string;
  createdAt: string;
  status: string;
  proposal?: any;
}

const savedLeads: SavedInquiry[] = [
  {
    id: "lead_1",
    clientName: "Countess de Valois",
    firmName: "Aethelgard Heritage Group",
    vision: "A fully custom digital catalog showcasing centuries-old estate archives with immersive interactive physics.",
    budgetTier: "$75,000 - $120,000",
    archetype: "Editorial",
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    status: "Accepted",
    proposal: {
      projectName: "L'Archive Valois",
      executiveSummary: "A noble digital monument blending fluid inertial scroll corridors with bespoke rendering and archive catalog structures. Engineered with premium responsive panels that adapt seamlessly under demanding multi-device ratios.",
      aestheticArchetype: {
        name: "L'Époque d'Or",
        atmosphere: "Refined, historical yet highly post-modernist; featuring deep gallery canvas backgrounds and warm incandescent lighting.",
        colorPalette: ["#111111", "#FBF9F6", "#CFB988", "#2c2a29"],
        typographyPairing: "Cinzel Decorative with Editorial Garamond"
      },
      architecturalLayers: [
        {
          layer: "Fluid Physics Archive Engine",
          description: "A custom lightweight inertial scroll canvas utilizing customized cubic-bezier deceleration curves.",
          rationale: "Allows the user to experience archive navigation like gliding physical parchment drawer compartments."
        },
        {
          layer: "State Synchronizer Module",
          description: "Isolated state hydration that keeps browser URLs in pristine alignment with the virtual physics state.",
          rationale: "Fosters client shareability of precise archival views with true luxury zero-flicker loading."
        }
      ],
      phasedRoadmap: [
        {
          phase: "I",
          title: "Atmosphere & Layout Schema",
          deliverables: ["Curated high-contrast layouts", "Dynamic typographic system bindings", "Inertia scroll prototyping"],
          timeline: "Weeks 1 - 3"
        },
        {
          phase: "II",
          title: "Custom Physics Canvas Assembly",
          deliverables: ["GPU-accelerated layout orchestration", "Multi-touch scale systems", "Dynamic layout reflow bounds"],
          timeline: "Weeks 4 - 6"
        }
      ],
      commercialEstimation: {
        effortScore: "V / Prestige Masterclass",
        complexity: "Superb Mastercraft",
        estimatedWeeks: 6,
        recommendedMethod: "A weekly bespoke preview salon with active prototype interaction over virtual luxury design channels."
      }
    }
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Crucial middle-tier parser for JSON payloads
  app.use(express.json());

  // API REST: Retrieve all active inquiry leads
  app.get("/api/leads", (req, res) => {
    res.json(savedLeads);
  });

  // API REST: Add a new intake lead
  app.post("/api/leads", (req, res) => {
    const { clientName, firmName, vision, budgetTier, archetype } = req.body;
    if (!clientName || !vision) {
       res.status(400).json({ error: "Client name and project vision are required." });
       return;
    }
    const newLead: SavedInquiry = {
      id: "lead_" + Math.random().toString(36).substr(2, 9),
      clientName,
      firmName,
      vision,
      budgetTier: budgetTier || "$25,000 - $50,000",
      archetype: archetype || "Cyber-Minimalist",
      createdAt: new Date().toISOString(),
      status: "Reviewing"
    };
    savedLeads.push(newLead);
    res.status(201).json(newLead);
  });

  // API REST: Post project concept to AI Atelier Planner (Gemini)
  app.post("/api/consult", async (req, res) => {
    const { clientName, firmName, vision, budgetTier, archetype } = req.body;

    if (!vision) {
       res.status(400).json({ error: "A detailed project vision must be described." });
       return;
    }

    // Lazy initialization of Gemini client to prevent startup failure if API key is not yet set.
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      // Elegant luxury mock proposal fallback to guarantee 100% availability of the preview
      console.warn("GEMINI_API_KEY is not defined. Utilizing our high-fidelity luxury proposal compiler.");
      const fallbackProposal = {
        projectName: "Project " + (archetype || "Sovereign") + " " + (clientName ? clientName.split(" ")[0] : "Signature"),
        executiveSummary: `A high-fidelity digital infrastructure tailored specifically toward "${vision}". Designed for ${clientName || "the client"}'s distinguished audience, this proposal guarantees sub-millisecond response rates paired with an immaculate, high-contrast user interface.`,
        aestheticArchetype: {
          name: archetype === "Editorial" ? "Gilded Chamber" : archetype === "Cyber-Minimalist" ? "Obsidian Core" : "Platinum Monolith",
          atmosphere: "Sparsely decorated viewport borders, razor-sharp mechanical grid structures, and a sense of infinite dimensional calm.",
          colorPalette: archetype === "Editorial" 
            ? ["#111111", "#FAFBF7", "#C99E5C", "#4A3F35"] 
            : archetype === "Cyber-Minimalist" 
            ? ["#030303", "#EFEFEF", "#00FF66", "#141416"] 
            : ["#0B0D11", "#FFFFFF", "#94A3B8", "#1E293B"],
          typographyPairing: archetype === "Editorial" 
            ? "Playfair Display paired with premium Inter light text" 
            : "Space Grotesk paired with JetBrains Mono numerals"
        },
        architecturalLayers: [
          {
            layer: "Structural Frame Layout",
            description: "A completely responsive, fluid viewport module that sets the standard for layout proportions.",
            rationale: "Fosters instant page responsiveness, eliminating secondary paint actions during device shifts."
          },
          {
            layer: "Masterstate Cache Engine",
            description: "High-performance client-side cache storing complex query elements using optimized memory arrays.",
            rationale: "Yields native performance, protecting browser memory limits while delivering instant transitions."
          }
        ],
        phasedRoadmap: [
          {
            phase: "A",
            title: "Grid & Atmosphere Set",
            deliverables: ["Proportional spacing calculations", "Custom palette configuration", "Interia-scroll prototyping"],
            timeline: "Weeks 1 - 2"
          },
          {
            phase: "B",
            title: "Dynamic Asset Display Core",
            deliverables: ["Responsive fluid media layout", "Bespoke user input controllers", "Memory cache implementation"],
            timeline: "Weeks 3 - 5"
          }
        ],
        commercialEstimation: {
          effortScore: "IV / Mastercraft Selection",
          complexity: "Extremely High",
          estimatedWeeks: 5,
          recommendedMethod: "Weekly curated staging link previews featuring direct interactive design adjustment capability."
        }
      };

      res.json({ proposal: fallbackProposal, isMock: true });
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });

      const designPrompt = `
        You are the Master Creative Director & Elite Systems Architect at a top-tier global luxury design atelier.
        Analyze the following client inquiry and generate a incredibly luxurious, technically feasible "Bespoke Project Blueprint" dossier.

        CLIENT NAME: ${clientName || "Anonymous Estate"}
        ORGANIZATION: ${firmName || "N/A"}
        PROJECT VISION: ${vision}
        BUDGET TIER: ${budgetTier || "Confidential"}
        AESTHETIC ARCHETYPE TYPE: ${archetype || "Cyber-Minimalist"}

        Your goal is to organize this into a high-fashion, hyper-technical, elite portfolio project proposal in JSON.
        Make sure the names of phases, layers, and color schemes sound highly evocative, exclusive, and extremely high-end (words like "Atelier", "Vanguard", "Chamber", "Monolith", "Vellum", "Obsidian", "Sovereign").

        Create precise deliverables that showcase stellar mastery of React, modern typescript interfaces, low-latency rendering, or the exact skillsets needed for the requested project.
      `;

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          projectName: {
            type: Type.STRING,
            description: "An evocative, luxury brand-ready code name for this project (e.g. 'Atelier Vellum', 'Project Onyx Grid', 'Maison Alabaster')."
          },
          executiveSummary: {
            type: Type.STRING,
            description: "Highly sophisticated, literary yet tech-focused executive summary of why the proposed approach sets the benchmark for full-stack superiority."
          },
          aestheticArchetype: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "Luxurious design aesthetic style name." },
              atmosphere: { type: Type.STRING, description: "Atmospheric sensory outline for the project theme." },
              colorPalette: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Array of 4 hexadecimal palette colors in uppercase string (e.g., ['#0D0D0C', '#FAF8F5'])."
              },
              typographyPairing: { type: Type.STRING, description: "Evocative high-contrast elegant font pairing recommendation." }
            },
            required: ["name", "atmosphere", "colorPalette", "typographyPairing"]
          },
          architecturalLayers: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                layer: { type: Type.STRING, description: "High-end engineered system layer name (e.g. 'Sovereign Viewport Architecture')." },
                description: { type: Type.STRING, description: "Detailed summary of the technical layer." },
                rationale: { type: Type.STRING, description: "Bespoke elite justification of this layer's mathematical or architectural necessity." }
              },
              required: ["layer", "description", "rationale"]
            },
            description: "List of 2 to 3 elite architectural systems crafted for this vision."
          },
          phasedRoadmap: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                phase: { type: Type.STRING, description: "Phase index, e.g. 'I', 'II', 'III'." },
                title: { type: Type.STRING, description: "Name of the construction phase." },
                deliverables: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Aesthetically styled specific system deliverables."
                },
                timeline: { type: Type.STRING, description: "Estimated luxurious timeline (e.g. 'Weeks 1 to 2')." }
              },
              required: ["phase", "title", "deliverables", "timeline"]
            },
            description: "A high-fidelity project roadmap consisting of 2 distinct steps."
          },
          commercialEstimation: {
            type: Type.OBJECT,
            properties: {
              effortScore: { type: Type.STRING, description: "Evocative execution effort rating (e.g. 'IV / Absolute Focus')." },
              complexity: {
                type: Type.STRING,
                enum: ["Moderate", "Extremely High", "Superb Mastercraft"],
                description: "The structural complexity rating of the craftsmanship."
              },
              estimatedWeeks: { type: Type.INTEGER, description: "Number of full-time atelier weeks requested." },
              recommendedMethod: { type: Type.STRING, description: "Specialized collaborative cadence recommendation." }
            },
            required: ["effortScore", "complexity", "estimatedWeeks", "recommendedMethod"]
          }
        },
        required: [
          "projectName",
          "executiveSummary",
          "aestheticArchetype",
          "architecturalLayers",
          "phasedRoadmap",
          "commercialEstimation"
        ]
      };

      const result = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: designPrompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: responseSchema,
          temperature: 0.85
        }
      });

      const responseText = result.text;
      if (!responseText) {
        throw new Error("Empty response received from the Gemini Engine.");
      }

      const proposal = JSON.parse(responseText.trim());

      // Optionally save to our list of prestigious leads
      const associatedLead: SavedInquiry = {
        id: "lead_" + Math.random().toString(36).substr(2, 9),
        clientName: clientName || "Anonymous Estate",
        firmName: firmName || "N/A",
        vision,
        budgetTier: budgetTier || "$25,000 - $50,000",
        archetypeOnsite: archetype || "Cyber-Minimalist",
        archetype: archetype || "Cyber-Minimalist",
        createdAt: new Date().toISOString(),
        status: "Accepted",
        proposal: proposal
      } as any;

      savedLeads.push(associatedLead);

      res.json({ proposal, isMock: false, leadId: associatedLead.id });
    } catch (err: any) {
      console.error("Gemini Consultation blueprint failure:", err);
      res.status(500).json({
        error: "Failed to assemble bespoke proposal.",
        details: err?.message || err
      });
    }
  });

  // Serve static assets / build files in Production; otherwise integrate Vite
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA fallback handling
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bespoke luxury full-stack server operating dynamically at http://0.0.0.0:${PORT}`);
  });
}

startServer();
