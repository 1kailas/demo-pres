import { Project, Service, SkillGroup } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "proj_aetheria",
    title: "Aetheria Core Engine",
    domain: "Sovereign FinTech & Ledger Design",
    description: "A secure, low-latency transaction interface rendering high-value physical asset trades with real-time cryptographic visual confirmations.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    craftStack: ["React 19", "Web Cryptography API", "Tailwind v4 Grid", "Isomorphic Memory Cache"],
    features: [
      "Sub-millisecond ledger lookup",
      "Dynamic vault layout viewports",
      "Signature block verification"
    ],
    metrics: {
      label: "Engine Latency",
      value: "< 0.04ms"
    },
    narrative: "Commissioned by a prestigious private heritage trust to bridge centuries of secure off-shore physical vault deposits with post-modern digital ledger management. We combined GPU-accelerated canvas grids with atomic secure functions to create an archive of absolute structural truth."
  },
  {
    id: "proj_sveltesse",
    title: "Maison Sveltesse Viewport",
    domain: "Immersive Editorial Fashion Concept",
    description: "A lightweight dynamic catalog utilizing procedural layouts, enabling hyper-fluid physical scroll mechanics through luxury fashion archives.",
    imageUrl: "https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=1200&q=80",
    craftStack: ["React Motion", "Cubic Bezier Physics", "Responsive Canvas Metrics", "IntersectionObserver V2"],
    features: [
      "Dynamic aspect refit math",
      "Lazy asset stream orchestration",
      "Linear interpolation easing"
    ],
    metrics: {
      label: "Device FPS Integrity",
      value: "120 FPS Stable"
    },
    narrative: "Designed to challenge default box-based catalog patterns. This viewport relies list-wide on hardware-accelerated paint pipelines, allowing potential luxury collectors to navigate highly curated high-fashion photography corridors at standard monitor refresh rates without a single micro-stutter."
  },
  {
    id: "proj_chronos",
    title: "Atelyae Chronos Hub",
    domain: "High-Horology Calibration IoT Console",
    description: "A beautiful telemetry dashboard mapping mechanical watch mechanical stress diagnostics with physical balance wheel calibrations.",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    craftStack: ["Fullstack Node.js", "D3.js Signal Compilers", "Complex Vector math", "Tailwind CSS"],
    features: [
      "Beat error Fourier mapping",
      "Mechanical amplitude metrics",
      "Pristine vector dial rendering"
    ],
    metrics: {
      label: "Diagnostic Precision",
      value: "99.98% True"
    },
    narrative: "An exclusive, invitation-only companion application for high-horology collectors and master watchmakers. The interface processes micro-vocal acoustic diagnostics from the balance wheel and translates mechanical errors into clean, gorgeous vector-based telemetry charts."
  }
];

export const SERVICES: Service[] = [
  {
    id: "serv_frontend",
    title: "Sartorial Interfaces & System Viewports",
    description: "Crafting lightweight, highly custom frontends with a heavy focus on typography, negative space, and custom inertial layouts.",
    iconName: "Compass",
    philosophy: "Visual details are a measure of respect. We ensure that your digital gateway mirrors the elite tangible luxury of your actual products.",
    offerings: [
      "Sub-atomic typography scale systems",
      "Adaptive viewport mathematical orchestration",
      "Custom ease curved scroll corridors",
      "Aesthetic compliance audits"
    ]
  },
  {
    id: "serv_fullstack",
    title: "Sovereign Full-Stack Architectures",
    description: "Engineering secure, modular server layers, fast response proxy caches, and lightweight state backends.",
    iconName: "Shield",
    philosophy: "Code should run like a Swiss movement—invisible, silent, yet operating with absolute mathematical perfection.",
    offerings: [
      "Lazy credentials integration routines",
      "Server-side proxy routes for secret APIs",
      "Bespoke relational and cache schematics",
      "Sub-50ms data paint pipelines"
    ]
  },
  {
    id: "serv_ai_atelier",
    title: "Cognitive Corridors & Bespoke AI Atelier",
    description: "Implementing advanced Gemini generative models, custom system instruction personas, and structural JSON response tools.",
    iconName: "Sparkles",
    philosophy: "AI should not feel like stock chat windows. It must be woven into your system as a silent, exceptionally intellectual co-creator.",
    offerings: [
      "Custom intelligence assistant pipelines",
      "Dynamic structured schema compiler APIs",
      "Semantic brand-grounded model tuning",
      "Bespoke project blueprint generation"
    ]
  }
];

export const TECHNICAL_SKILLS: SkillGroup[] = [
  {
    category: "Languages & Core Craft",
    skills: [
      { name: "TypeScript", level: 96, vintage: "Since 2017", meta: "Isomorphic Strict-Mode" },
      { name: "JavaScript ESNext", level: 98, vintage: "Since 2015", meta: "Memory Optimizations" },
      { name: "Node.js System Engine", level: 92, vintage: "Since 2018", meta: "Stream & Pipe Pipelines" },
      { name: "CSS Grid & Paint", level: 95, vintage: "Since 2015", meta: "Hardware-Accelerated" }
    ]
  },
  {
    category: "Frameworks & Standards",
    skills: [
      { name: "React 19 (Atelier Grade)", level: 97, vintage: "Since 2016", meta: "Concurrent Render & Hooks" },
      { name: "Express Fullstack Proxy", level: 93, vintage: "Since 2018", meta: "Modular Router Pipelines" },
      { name: "Vite Bundler Specs", level: 94, vintage: "Since 2020", meta: "Custom Plugin Architecture" },
      { name: "Tailwind CSS v4", level: 98, vintage: "Since 2019", meta: "Zero-Run CSS Theme Variables" }
    ]
  },
  {
    category: "Specialized Intelligence",
    skills: [
      { name: "@google/genai SDK Integration", level: 98, vintage: "Since Preview", meta: "Server-Side Safe APIs" },
      { name: "Structured JSON Response Tuning", level: 95, vintage: "Since Debut", meta: "Type-Safe Dynamic Content" },
      { name: "D3.js & Vector Telemetry", level: 90, vintage: "Since 2019", meta: "Mathematical Visualization" },
      { name: "Motion & Cubic Easing Matrices", level: 93, vintage: "Since 2021", meta: "GPU-Driven Choreography" }
    ]
  }
];
