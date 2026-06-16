import { useState, useEffect, useRef, FormEvent } from "react";
import { 
  Compass, 
  Shield, 
  Sparkles, 
  Clock, 
  ArrowUpRight, 
  Lock, 
  X, 
  ChevronRight, 
  Download, 
  Award, 
  Terminal, 
  Sliders, 
  Globe, 
  Check, 
  FileText, 
  Users,
  Briefcase,
  Layers,
  Database
} from "lucide-react";
import { PROJECTS, SERVICES, TECHNICAL_SKILLS } from "./data";
import { Project, Service, BespokeProposal, InquiryLead } from "./types";

export default function App() {
  // Navigation states
  const [activeSection, setActiveSection] = useState("foyer");
  
  // Project Exhibit modal drawer state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // AI Atelier Form states
  const [clientName, setClientName] = useState("");
  const [firmName, setFirmName] = useState("");
  const [vision, setVision] = useState("");
  const [budgetTier, setBudgetTier] = useState("$50,000 - $75,000");
  const [archetype, setArchetype] = useState<"Editorial" | "Cyber-Minimalist" | "Sovereign-Sleek">("Cyber-Minimalist");
  
  // Consultation process state
  const [isFormulating, setIsFormulating] = useState(false);
  const [formulationStep, setFormulationStep] = useState(0);
  const [activeProposal, setActiveProposal] = useState<BespokeProposal | null>(null);
  const [isMockProposal, setIsMockProposal] = useState(false);
  
  // Live Ledger State
  const [leadsList, setLeadsList] = useState<InquiryLead[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);

  // Re-fetch historical premium leads from memory DB
  const fetchLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        setLeadsList(data);
      }
    } catch (e) {
      console.error("Failed to load prestige leads:", e);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Loading luxury statements ticker
  useEffect(() => {
    if (!isFormulating) return;
    const interval = setInterval(() => {
      setFormulationStep((prev) => {
        if (prev >= 3) {
          return 3;
        }
        return prev + 1;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, [isFormulating]);

  const formulationMessages = [
    "Consulting design aesthetic matrices with creative directors...",
    "Orchestrating hardware-accelerated viewport layer diagrams...",
    "Formulating micro-atomic commercial deliverables and timeline curves...",
    "Compiling prestige blueprint dossier..."
  ];

  // Submit Inquiry to the Server-Side AI Atelier
  const handleInitiateConsultation = async (e: FormEvent) => {
    e.preventDefault();
    if (!vision.trim()) return;

    setIsFormulating(true);
    setFormulationStep(0);
    setActiveProposal(null);

    try {
      const response = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: clientName || "Honorable Guest",
          firmName,
          vision,
          budgetTier,
          archetype
        })
      });

      if (response.ok) {
        const data = await response.json();
        setActiveProposal(data.proposal);
        setIsMockProposal(!!data.isMock);
        // Refresh our live prestgious CRM ledger!
        await fetchLeads();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Formulation failed");
      }
    } catch (err: any) {
      console.error("Consultation initiation failed:", err);
      // Construct native error feedback
      alert("Atelier System Calibration Required: " + (err.message || "Endpoint error. Please try again."));
    } finally {
      setIsFormulating(false);
    }
  };

  const loadPastProposal = (lead: any) => {
    if (lead.proposal) {
      setActiveProposal(lead.proposal);
      setIsMockProposal(false);
      
      const scrollTarget = document.getElementById("propsal-viewport");
      if (scrollTarget) {
        scrollTarget.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Simulate on the fly proposal if template wasn't complete
      setClientName(lead.clientName);
      setFirmName(lead.firmName || "");
      setVision(lead.vision);
      setArchetype(lead.archetype as any || "Cyber-Minimalist");
      setBudgetTier(lead.budgetTier);
      setActiveProposal(null);
      
      const formTarget = document.getElementById("atelier-salon");
      if (formTarget) {
        formTarget.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Plain-text formatted exporter for the clients to grab immediately
  const exportProposalToTxt = () => {
    if (!activeProposal) return;
    const t = activeProposal;
    const textContent = `
================================================================
           BESPOKE PROJECT DOSSIER | ATELIER VIRTUOSO           
================================================================
PROJECT CODE NAME: ${t.projectName.toUpperCase()}
ESTATE OWNER: ${clientName || "Honorable Guest"} (${firmName || "Private Firm"})
AESTHETIC SCHEME: ${t.aestheticArchetype.name}
ATMOSPHERE PROFILE: ${t.aestheticArchetype.atmosphere}
CURATED COLOR PALETTE: ${t.aestheticArchetype.colorPalette.join(", ")}
RECOMMENDED INTERFACE TYPE: ${t.aestheticArchetype.typographyPairing}

----------------------------------------------------------------
I. CUSTOM ARCHITECTURAL LAYERS
----------------------------------------------------------------
${t.architecturalLayers.map((layer, idx) => `${idx + 1}. [${layer.layer}]
   - Description: ${layer.description}
   - Technical Rationale: ${layer.rationale}`).join("\n\n")}

----------------------------------------------------------------
II. PHASED CORE ROADMAP
----------------------------------------------------------------
${t.phasedRoadmap.map(phase => `Phase ${phase.phase}: ${phase.title} (${phase.timeline})
   • Deliverables:
     - ${phase.deliverables.join("\n     - ")}`).join("\n\n")}

----------------------------------------------------------------
III. PROFESSIONAL METRICS & EFFORT VALUATION
----------------------------------------------------------------
Effort Score Category: ${t.commercialEstimation.effortScore}
Complexity Category: ${t.commercialEstimation.complexity}
Timeline Duration: ${t.commercialEstimation.estimatedWeeks} Weeks of Absolute Focus
Collaboration Method: ${t.commercialEstimation.recommendedMethod}

Generated dynamically by the Atelier AI systems.
All rights reserved © 2026.
================================================================`;

    const element = document.createElement("a");
    const file = new Blob([textContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${t.projectName.replace(/\s+/g, "_")}_Blueprint.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Scroll to section handler
  const scrollToId = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#EFECE5] text-[#1F2024] font-sans relative antialiased" id="luxury-applet-root">
      
      {/* Decorative Warm Ambient Glow Circle */}
      <div className="absolute top-10 right-1/4 w-[400px] h-[400px] rounded-full luxury-ambient-glow pointer-events-none" id="decorative-ambient-glow" />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] rounded-full luxury-ambient-glow opacity-10 pointer-events-none" id="decorative-ambient-glow-2" />

      {/* Persistent Elegant Luxury Frame Borders (Left & Right) */}
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-8 border-r border-black/5 bg-[#EFECE5]/80 z-45" id="left-structural-margin">
        <div className="h-full flex flex-col justify-between items-center py-10">
          <span className="font-mono text-[9px] text-[#1F2024]/30 tracking-[0.25em] rotate-270 uppercase">Atelier Virtuoso ©</span>
          <span className="text-lux-gold font-serif text-[13px] tracking-widest">A</span>
          <span className="font-mono text-[9px] text-[#1F2024]/30 tracking-[0.25em] rotate-180">2026</span>
        </div>
      </div>
      <div className="hidden lg:block fixed right-0 top-0 bottom-0 w-8 border-l border-black/5 bg-[#EFECE5]/80 z-45" id="right-structural-margin">
        <div className="h-full flex flex-col justify-between items-center py-10">
          <div className="flex flex-col gap-6 items-center">
            <span className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#B48E33]" />
          </div>
          <span className="font-mono text-[9px] text-[#1F2024]/30 tracking-[0.25em] rotate-90 uppercase">Bespoke Architectural Interface</span>
          <div className="text-lux-champagne flex flex-col gap-1 items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B48E33] animate-ping" />
          </div>
        </div>
      </div>

      {/* Header and Brand Navigation Workspace */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#EFECE5]/85 border-b border-black/5 px-6 lg:px-16" id="atelier-header">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-5">
          <div className="flex items-baseline gap-4" id="logo-block">
            <h1 className="font-serif text-xl md:text-2xl tracking-widest text-[#1F2024] uppercase">
              Atelier <span className="text-[#B48E33] text-lg italic tracking-normal font-normal">Virtuoso</span>
            </h1>
            <span className="hidden md:block text-[9px] font-mono tracking-[0.3em] uppercase text-[#1F2024]/40">Bespoke Tech Guild</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-10 font-mono text-[10px] tracking-[0.25em] uppercase text-[#1F2024]/60" id="desktop-routing">
            <button 
              onClick={() => scrollToId("foyer")}
              className={`hover:text-[#B48E33] transition-colors duration-300 ${activeSection === "foyer" ? "text-[#B48E33]" : ""}`}
              id="nav-foyer-btn"
            >
              Foyer
            </button>
            <button 
              onClick={() => scrollToId("exhibits")}
              className={`hover:text-[#B48E33] transition-colors duration-300 ${activeSection === "exhibits" ? "text-[#B48E33]" : ""}`}
              id="nav-exhibiting-btn"
            >
              Exhibits
            </button>
            <button 
              onClick={() => scrollToId("services")}
              className={`hover:text-[#B48E33] transition-colors duration-300 ${activeSection === "services" ? "text-[#B48E33]" : ""}`}
              id="nav-philosophy-btn"
            >
              Atelier Services
            </button>
            <button 
              onClick={() => scrollToId("competency")}
              className={`hover:text-[#B48E33] transition-colors duration-300 ${activeSection === "competency" ? "text-[#B48E33]" : ""}`}
              id="nav-competencies-btn"
            >
              Metrics
            </button>
            <button 
              onClick={() => scrollToId("atelier-salon")}
              className="clay-button-secondary px-5 py-2 font-mono text-[9px] tracking-widest text-[#1F2024] hover:text-[#B48E33]"
              id="nav-salon-trigger"
            >
              Blueprint Salon
            </button>
          </nav>

          {/* Mobile indicator layout */}
          <div className="md:hidden flex items-center gap-3" id="mobile-indicator-action">
            <button 
              onClick={() => scrollToId("atelier-salon")}
              className="clay-button-secondary text-[8px] tracking-[0.15em] px-3 py-1.5 uppercase font-mono"
            >
              Salon
            </button>
          </div>
        </div>
      </header>

      {/* Main Long-Form Museum Container */}
      <main className="max-w-7xl mx-auto px-6 lg:px-16 py-12 md:py-20 relative z-30 flex flex-col gap-32 md:gap-48" id="client-museum-stage">
        
        {/* SECTION 1: THE FOYER (Hero Showcase) */}
        <section className="flex flex-col gap-8 min-h-[70vh] md:min-h-[80vh] justify-center relative select-none" id="foyer">
          
          <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#A2855F] flex items-center gap-2" id="hero-prefix-element">
            <span className="w-8 h-[1px] bg-[#A2855F]" />
            Vanguard Fullstack Craft
          </div>

          <div className="flex flex-col gap-4 max-w-4xl" id="hero-heading-block">
            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#1F2024] leading-[1.1] tracking-tight">
              Engineering interfaces with <span className="font-serif italic font-normal text-[#A2855F]">absolute reverence</span>.
            </h2>
            <p className="font-sans text-[#1F2024]/75 text-lg md:text-xl font-light tracking-wide max-w-2xl mt-4 leading-relaxed">
              We translate conceptual mechanics, physical architecture, and prestigious visions into responsive, hardware-accelerated codebases for demanding clients.
            </p>
          </div>

          {/* Quick interactive call to action row */}
          <div className="flex flex-wrap gap-6 mt-8" id="hero-callouts">
            <button 
              onClick={() => scrollToId("atelier-salon")}
              className="clay-button-primary px-8 py-4 font-mono text-xs tracking-[0.2em] uppercase font-semibold text-center"
              id="hero-cta-formulate"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Initiate Formulation <ChevronRight className="w-4 h-4" />
              </span>
            </button>
            <button 
              onClick={() => scrollToId("exhibits")}
              className="clay-button-secondary px-8 py-4 font-mono text-xs tracking-[0.2em] uppercase text-[#1F2024] font-semibold text-center"
              id="hero-cta-explore"
            >
              Explore Exhibits
            </button>
          </div>

          {/* Visual Trust Indicator Block */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 md:pt-20 border-t border-black/5 mt-12 md:mt-20 font-mono" id="hero-statistics-grid">
            <div className="flex flex-col gap-2" id="stat-latency">
              <span className="text-[10px] tracking-widest uppercase text-[#1F2024]/40">Max Latency Goal</span>
              <span className="text-xl md:text-2xl font-light text-[#B48E33] font-serif tracking-wider">50ms Interactive</span>
            </div>
            <div className="flex flex-col gap-2" id="stat-standards">
              <span className="text-[10px] tracking-widest uppercase text-[#1F2024]/40">Design Standard</span>
              <span className="text-xl md:text-2xl font-light text-[#B48E33] font-serif tracking-wider">Couture Grid Layout</span>
            </div>
            <div className="flex flex-col gap-2" id="stat-integrity">
              <span className="text-[10px] tracking-widest uppercase text-[#1F2024]/40">Interface Quality</span>
              <span className="text-xl md:text-2xl font-light text-[#B48E33] font-serif tracking-wider">Strict JS-Type Guard</span>
            </div>
            <div className="flex flex-col gap-2" id="stat-experience">
              <span className="text-[10px] tracking-widest uppercase text-[#1F2024]/40">Studio Vintage</span>
              <span className="text-xl md:text-2xl font-light text-[#B48E33] font-serif tracking-wider">Established 2017</span>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE EXHIBITS (Curated Portfolio Archive) */}
        <section className="flex flex-col gap-12 border-t border-black/5 pt-20" id="exhibits">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6" id="exhibiting-header">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#A2855F]">Archive Exhibits</span>
              <h3 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-[#1F2024]">
                The Masterwork Archive
              </h3>
            </div>
            <p className="text-sm font-sans font-light tracking-wide text-[#1F2024]/60 max-w-sm leading-relaxed" id="exhibits-disclaimer">
              Each dynamic exhibit demonstrates deep mastery of modern responsive frameworks, rendering optimization layers, and architectural modularity.
            </p>
          </div>

          {/* Exhibition Grid Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="portfolio-cards-grid">
            {PROJECTS.map((project) => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer clay-card relative flex flex-col justify-between overflow-hidden"
                id={`project-card-${project.id}`}
              >
                {/* Image and Hover Detail */}
                <div className="aspect-[4/3] w-full relative overflow-hidden bg-[#FAF8F5]" id={`project-media-host-${project.id}`}>
                  <img 
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    id={`project-img-${project.id}`}
                  />
                  {/* Subtle metric overlay pill */}
                  <div className="absolute bottom-4 left-4 bg-[#FAF8F5]/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-[#1F2024]/5" id={`metric-badge-${project.id}`}>
                    <span className="font-mono text-[9px] text-[#1F2024]/40 tracking-wider block">{project.metrics.label}</span>
                    <span className="font-mono text-xs font-semibold text-[#B48E33] tracking-wider">{project.metrics.value}</span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between" id={`project-details-${project.id}`}>
                  <div className="flex flex-col gap-3">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#1F2024]/50">{project.domain}</span>
                    <h4 className="font-serif text-xl font-light text-[#1F2024] group-hover:text-[#B48E33] transition-colors duration-300">
                      {project.title}
                    </h4>
                    <p className="text-xs text-[#1F2024]/70 font-light font-sans max-w-xs mt-1 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Curated craft-stack item badges */}
                  <div className="flex flex-wrap gap-2 mt-6 border-t border-black/5 pt-4" id={`project-badges-row-${project.id}`}>
                    {project.craftStack.map((tech) => (
                      <span 
                        key={tech} 
                        className="font-mono text-[9px] text-[#A2855F] bg-[#FAF8F5] px-2.5 py-1 border border-black/5 rounded-full shadow-inner"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-[#B48E33] mt-6 group-hover:gap-2 transition-all duration-300" id={`project-trigger-${project.id}`}>
                    Examine Blueprint <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXHIBIT DRAWER SLIDE-OUT PANEL OVERLAY */}
        {selectedProject && (
          <div className="fixed inset-0 z-100 flex justify-end" id="exhibit-drawer-backdrop">
            {/* Clickable Backdrop overlay blur */}
            <div 
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            />
            {/* Slide Out Panel card */}
            <div className="w-full max-w-2xl bg-[#EFECE5] border-l border-black/5 relative z-40 h-full overflow-y-auto p-6 md:p-12 shadow-2xl flex flex-col justify-between" id="exhibit-drawer-contents">
              <div id="drawer-scrollable-body">
                {/* Header Actions */}
                <div className="flex justify-between items-center border-b border-black/5 pb-6 mb-8" id="drawer-nav">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#A2855F]">Technical Exhibit Specification</span>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="clay-button-secondary p-1.5 px-4 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2"
                    id="close-drawer-btn"
                  >
                    Close <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Image background block */}
                <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8 bg-[#FAF8F5] shadow-inner" id="drawer-media-host">
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Scope Identity */}
                <div className="flex flex-col gap-2 mb-6" id="drawer-title-block">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#1F2024]/50">{selectedProject.domain}</span>
                  <h3 className="font-serif text-3xl md:text-4xl font-light text-[#1F2024]">{selectedProject.title}</h3>
                </div>

                {/* Interactive metrics key metrics card */}
                <div className="grid grid-cols-2 gap-4 clay-well p-5 rounded-2xl mb-8" id="drawer-metrics-pad">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-[#1F2024]/50 tracking-widest uppercase">Validated Performance</span>
                    <span className="font-mono text-xl text-[#B48E33] font-semibold tracking-wide">{selectedProject.metrics.value}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] text-[#1F2024]/50 tracking-widest uppercase">Stack Dimension</span>
                    <span className="font-mono text-xs text-[#A2855F] tracking-wide leading-relaxed mt-1">Strict Isomorphism Type Checked</span>
                  </div>
                </div>

                {/* The Narrative Deep Dive */}
                <div className="mb-8" id="drawer-text-body">
                  <h4 className="font-serif text-[15px] tracking-wider uppercase text-[#1F2024]/50 mb-3">Architectural Narrative</h4>
                  <p className="font-sans text-sm text-[#1F2024]/80 font-light leading-relaxed tracking-wide">
                    {selectedProject.narrative}
                  </p>
                </div>

                {/* Highlight Features checklist */}
                <div className="mb-8" id="drawer-features-list">
                  <h4 className="font-serif text-[15px] tracking-wider uppercase text-[#1F2024]/50 mb-3">High-integrity Features</h4>
                  <div className="flex flex-col gap-3">
                    {selectedProject.features.map((feat) => (
                      <div key={feat} className="flex gap-3 items-start" id={`feat-line-${feat.replace(/\s+/g, "_")}`}>
                        <span className="p-1 rounded-full bg-[#B48E33]/10 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-[#B48E33]" />
                        </span>
                        <p className="font-sans text-xs text-[#1F2024]/90 font-light tracking-wide">{feat}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Stack list */}
                <div className="mb-8" id="drawer-stack-list">
                  <h4 className="font-serif text-[15px] tracking-wider uppercase text-[#1F2024]/50 mb-3">Modular Stack Definitions</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.craftStack.map((tech) => (
                      <span 
                        key={tech} 
                        className="font-mono text-[10px] text-[#A2855F] bg-[#FAF8F5] border border-black/5 rounded-full px-4 py-2 hover:scale-105 transition-all shadow-inner"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Consultation redirection footer inside drawer */}
              <div className="border-t border-black/5 pt-6 mt-8 flex flex-col gap-4" id="drawer-footer">
                <p className="text-[11px] font-sans font-light tracking-wide text-[#1F2024]/50">
                  Need a similar high-performance architecture developed?
                </p>
                <button 
                  onClick={() => {
                    setSelectedProject(null);
                    scrollToId("atelier-salon");
                  }}
                  className="clay-button-primary w-full py-4 font-mono text-xs tracking-widest rounded-full uppercase font-semibold text-center"
                >
                  Initiate Formulation Sequence
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: ATELIER SERVICES (Our Philosophy & Offerings) */}
        <section className="flex flex-col gap-12 border-t border-black/5 pt-20" id="services">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6" id="services-title-layer">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#A2855F]">Atelier Philosophy</span>
              <h3 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-[#1F2024]">
                Couture Digital Services
              </h3>
            </div>
            <p className="text-sm font-sans font-light tracking-wide text-[#1F2024]/60 max-w-sm leading-relaxed">
              We do not believe in templates. Dynamic, bespoke implementations crafted using exact mathematics and luxury styling standards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="services-cards-grid">
            {SERVICES.map((service, index) => {
              // Icon matcher
              const getIconComponent = (key: string) => {
                switch(key) {
                  case "Compass": return <Compass className="w-5 h-5 text-[#B48E33]" />;
                  case "Shield": return <Shield className="w-5 h-5 text-[#B48E33]" />;
                  case "Sparkles": return <Sparkles className="w-5 h-5 text-[#B48E33]" />;
                  default: return <Sparkles className="w-5 h-5 text-[#B48E33]" />;
                }
              };

              return (
                <div 
                  key={service.id}
                  className="clay-card p-8 flex flex-col justify-between relative group overflow-hidden"
                  id={`service-card-${service.id}`}
                >
                  <div className="flex flex-col gap-6" id={`service-main-${service.id}`}>
                    <div className="flex items-center justify-between" id={`service-header-${service.id}`}>
                      <div className="p-3 bg-[#1F2024]/5 border border-black/5 rounded-full" id={`service-icon-box-${service.id}`}>
                        {getIconComponent(service.iconName)}
                      </div>
                      <span className="font-mono text-xs text-[#1F2024]/20 font-semibold">0{index + 1}</span>
                    </div>

                    <div className="flex flex-col gap-3" id={`service-tag-line-${service.id}`}>
                      <h4 className="font-serif text-xl font-light text-[#1F2024] group-hover:text-[#B48E33] transition-colors duration-300">
                        {service.title}
                      </h4>
                      <p className="text-xs font-sans font-light text-[#1F2024]/70 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-black/5 pt-4 mt-2" id={`service-offerings-${service.id}`}>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-[#1F2024]/40">Bespoke Craft Items</p>
                      <div className="flex flex-col gap-2">
                        {service.offerings.map((offering) => (
                          <div key={offering} className="flex gap-2 items-center" id={`service-bullet-${offering.replace(/\s+/g, "_")}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B48E33]" />
                            <span className="font-mono text-[9px] text-[#1F2024]/80 tracking-wide">{offering}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-black/5" id={`service-philosophy-row-${service.id}`}>
                    <span className="font-mono text-[10px] text-[#A2855F] tracking-widest uppercase block mb-1">Guiding Principle</span>
                    <p className="font-serif italic text-xs text-[#1F2024]/50 leading-relaxed">
                      "{service.philosophy}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: METRICS & TECHNICAL COMPETENCIES (Skill Radar Metres) */}
        <section className="flex flex-col gap-12 border-t border-black/5 pt-20" id="competency">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6" id="competencies-header">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#A2855F]">Architectural Precision</span>
              <h3 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-[#1F2024]">
                The Competency Matrix
              </h3>
            </div>
            <p className="text-sm font-sans font-light tracking-wide text-[#1F2024]/60 max-w-sm leading-relaxed">
              We quantify technical capabilities with meticulous performance, code quality tracking, and historical design experience variables.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12" id="skills-groups-grid">
            {TECHNICAL_SKILLS.map((group) => (
              <div key={group.category} className="clay-card p-6 flex flex-col gap-6" id={`skill-category-${group.category.replace(/\s+/g, "_")}`}>
                <h4 className="font-serif text-lg font-light text-[#B48E33] border-b border-[#B48E33]/10 pb-3" id={`category-title-${group.category.replace(/\s+/g, "_")}`}>
                  {group.category}
                </h4>

                <div className="flex flex-col gap-6" id={`skills-list-${group.category.replace(/\s+/g, "_")}`}>
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="flex flex-col gap-2" id={`skill-item-${skill.name.replace(/\s+/g, "_")}`}>
                      <div className="flex justify-between items-baseline" id={`skill-label-${skill.name.replace(/\s+/g, "_")}`}>
                        <span className="font-sans text-sm font-light text-[#1F2024]">{skill.name}</span>
                        <div className="flex gap-2 items-center font-mono text-[9px]" id={`skill-meta-${skill.name.replace(/\s+/g, "_")}`}>
                          <span className="text-[#1F2024]/40">{skill.vintage}</span>
                          <span className="text-[#B48E33] font-bold">{skill.level}%</span>
                        </div>
                      </div>

                      {/* Animated Gauge meter container */}
                      <div className="h-2 bg-[#F4F1EA] w-full rounded-full overflow-hidden border border-black/5 shadow-inner" id={`meter-track-${skill.name.replace(/\s+/g, "_")}`}>
                        <div 
                          className="h-full bg-gradient-to-r from-[#A2855F] to-[#B48E33] rounded-full"
                          style={{ width: `${skill.level}%` }}
                          id={`meter-bar-${skill.name.replace(/\s+/g, "_")}`}
                        />
                      </div>
                      
                      <div className="flex justify-between text-[9px] font-mono text-[#1F2024]/40" id={`skill-subtext-${skill.name.replace(/\s+/g, "_")}`}>
                        <span>System Tier: mastercraft</span>
                        <span>{skill.meta}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: THE BLUEPRINT SALON (Advanced Interactive Fullstack Proposal Engine) */}
        <section className="flex flex-col gap-12 border-t border-black/5 pt-20" id="atelier-salon">
          
          <div className="flex flex-col gap-3" id="salon-header-block">
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#A2855F]">The Proposal Room</span>
            <h3 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-[#1F2024]">
              Atelier Blueprint Formulation
            </h3>
            <p className="font-sans text-sm font-light tracking-wide text-[#1F2024]/60 max-w-xl leading-relaxed mt-1">
              Do you have a prestigious software digital vision? Supply details of your project context below. Our server-side Atelier AI Director will instantly evaluate your vision and compile a beautiful bespoke proposal dossier.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="salon-work-grid">
            
            {/* INQUIRY FORM COLUMN (Lg: 5 Units) */}
            <div className="lg:col-span-5 clay-card p-6 md:p-8" id="intake-form-box">
              <h4 className="font-serif text-lg font-light text-[#B48E33] border-b border-black/5 pb-4 mb-6 flex items-center gap-2">
                <Sliders className="w-4 h-4" /> Client Specifications
              </h4>

              <form onSubmit={handleInitiateConsultation} className="flex flex-col gap-5" id="intake-form">
                
                {/* Client Name Input */}
                <div className="flex flex-col gap-2" id="field-client-name">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#1F2024]/50">Estate / Client Name</label>
                  <input 
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    required
                    placeholder="e.g. Countess de Valois, Baron Croft"
                    className="clay-input rounded-xl px-4 py-3 text-xs tracking-wider placeholder-[#1F2024]/30"
                    id="input-client-name"
                  />
                </div>

                {/* Firm Name Input */}
                <div className="flex flex-col gap-2" id="field-firm-name">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#1F2024]/50">Firm / Estate Name (Optional)</label>
                  <input 
                    type="text"
                    value={firmName}
                    onChange={(e) => setFirmName(e.target.value)}
                    placeholder="e.g. Aethelgard Heritage Group"
                    className="clay-input rounded-xl px-4 py-3 text-xs tracking-wider placeholder-[#1F2024]/30"
                    id="input-firm-name"
                  />
                </div>

                {/* Select Archetype design scheme */}
                <div className="flex flex-col gap-2" id="field-archetype">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#1F2024]/50">Aesthetic Paradigm Paradigm</label>
                  <div className="grid grid-cols-3 gap-2" id="archetype-options">
                    {[
                      { name: "Editorial", style: "Elegant Serif Layout" },
                      { name: "Cyber-Minimalist", style: "Mechanical Obsidian Track" },
                      { name: "Sovereign-Sleek", style: "Monolithic Dark Platinum" }
                    ].map((arch) => (
                      <button
                        key={arch.name}
                        type="button"
                        onClick={() => setArchetype(arch.name as any)}
                        className={`text-left p-3 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-20 ${archetype === arch.name ? "border-[#B48E33] bg-[#B48E33]/5 shadow-inner" : "border-black/5 hover:border-[#B48E33]/40 bg-[#FAF8F5]/80"}`}
                        id={`btn-arch-${arch.name}`}
                      >
                        <span className="font-serif text-[11px] font-semibold text-[#1F2024]">{arch.name}</span>
                        <span className="text-[7px] font-mono text-[#1F2024]/40 uppercase leading-tight tracking-wider">{arch.style}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Select Budget Tier */}
                <div className="flex flex-col gap-2" id="field-budget">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#1F2024]/50">Investment Intent Limit</label>
                  <select 
                    value={budgetTier}
                    onChange={(e) => setBudgetTier(e.target.value)}
                    className="clay-input rounded-xl px-4 py-3 text-xs tracking-wider text-[#1F2024] appearance-none relative select-none"
                    id="input-budget-tier"
                  >
                    <option value="$25,000 - $50,000">$25,000 - $50,000 (Vanguard Architecture)</option>
                    <option value="$50,000 - $75,000">$50,000 - $75,000 (Bespoke Studio Core)</option>
                    <option value="$75,000 - $120,000">$75,000 - $120,000+ (Prestige Masterclass Service)</option>
                    <option value="Privè Portfolio Allocation">Privè Portfolio Allocation (Unlimited Custom Focus)</option>
                  </select>
                </div>

                {/* Project Vision text block */}
                <div className="flex flex-col gap-2" id="field-vision">
                  <label className="font-mono text-[9px] uppercase tracking-widest text-[#1F2024]/50">Project Vision & Architecture Requirements</label>
                  <textarea 
                    value={vision}
                    onChange={(e) => setVision(e.target.value)}
                    required
                    rows={4}
                    placeholder="Describe your design specifications, intended audience, low-latency desires, and desired visual atmosphere..."
                    className="clay-input rounded-xl px-4 py-3 text-xs tracking-wider placeholder-[#1F2024]/30 leading-relaxed font-sans"
                    id="input-vision"
                  />
                </div>

                {/* Submit Action Button */}
                <button 
                  type="submit"
                  disabled={isFormulating || !vision.trim()}
                  className="clay-button-primary w-full py-4 text-xs font-mono tracking-widest uppercase font-semibold text-center disabled:opacity-40"
                  id="btn-init-formulation"
                >
                  {isFormulating ? formulationMessages[formulationStep] : "Initiate Bespoke Formulation"}
                </button>
              </form>

              {/* Secure Token Notice */}
              <div className="mt-8 border-t border-black/5 pt-4 flex gap-3 text-[10px] font-mono text-[#1F2024]/30 items-center justify-center select-none" id="secure-key-card">
                <Lock className="w-3.5 h-3.5 text-[#B48E33]/60" /> 
                <span>Server-Safe Google GenAI Client Routing Mode</span>
              </div>
            </div>

            {/* DOSSIER PROPOSAL EXPORT DISPLAY (Lg: 7 Units) */}
            <div className="lg:col-span-7" id="propsal-viewport">
              <div className="clay-card relative overflow-hidden h-full flex flex-col justify-between" id="blueprint-dossier">
                
                {/* Visual placeholder when no active proposal is loaded */}
                {!activeProposal && !isFormulating && (
                  <div className="flex flex-col items-center justify-center py-24 px-6 text-center flex-grow" id="empty-proposal-indicator">
                    <div className="p-4 bg-[#B48E33]/5 rounded-full border border-[#B48E33]/15 mb-4 animate-pulse">
                      <FileText className="w-8 h-8 text-[#B48E33]" />
                    </div>
                    <h5 className="font-serif text-lg font-light text-[#1F2024]">Awaiting Estate Vision</h5>
                    <p className="text-xs font-mono text-[#1F2024]/40 tracking-wider max-w-sm mt-3 uppercase leading-relaxed">
                      Select project specifications on the left to activate the AI Atelier Blueprint Formulation Engine.
                    </p>
                  </div>
                )}

                {/* Formulation state loader */}
                {isFormulating && (
                  <div className="flex flex-col items-center justify-center py-24 px-6 text-center flex-grow" id="loading-proposal-indicator">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-full border-t border-[#B48E33] animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center text-[#B48E33] font-serif text-lg italic">A</div>
                    </div>
                    <h5 className="font-serif text-lg font-light text-[#B48E33] italic animate-pulse">
                      Formulating Bespoke Architecture...
                    </h5>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#A2855F] mt-4 px-3 py-1.5 bg-[#FAF8F5] border border-[#1F2024]/5 rounded-xl shadow-inner">
                      {formulationMessages[formulationStep]}
                    </span>
                  </div>
                )}

                {/* Active Blueprint Proposal Dossier Cards */}
                {activeProposal && !isFormulating && (
                  <div className="p-6 md:p-10 flex-grow" id="proposal-wrapper">
                    
                    {/* Golden luxury seal header */}
                    <div className="flex justify-between items-start border-b border-black/5 pb-6 mb-8" id="proposal-branding">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#1F2024]/40">Bespoke Formula Result</span>
                        <h4 className="font-serif text-2xl font-semibold text-[#B48E33]">
                          {activeProposal.projectName}
                        </h4>
                      </div>
                      <div className="flex flex-col items-end gap-1" id="blue-print-meta">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#B48E33] font-semibold">Status: Calibrated</span>
                        {isMockProposal && (
                          <span className="font-mono text-[70%] text-[#1F2024]/40 uppercase tracking-widest">High-Fidelity Offline</span>
                        )}
                      </div>
                    </div>

                    {/* Executive summary block */}
                    <div className="mb-8" id="proposals-exec-summary">
                      <h5 className="font-serif text-xs uppercase tracking-widest text-[#1F2024]/40 border-l-2 border-[#B48E33] pl-3 mb-3">
                        Executive Strategy Statement
                      </h5>
                      <p className="font-sans text-xs text-[#1F2024]/80 font-light leading-relaxed tracking-wide">
                        {activeProposal.executiveSummary}
                      </p>
                    </div>

                    {/* Aesthetic visual palette deck */}
                    <div className="mb-8 clay-well p-5 rounded-2xl" id="proposals-aesthetic-deck">
                      <h5 className="font-serif text-xs uppercase tracking-widest text-[#1F2024]/40 mb-4">
                        Curated Visual Theme Recommendations
                      </h5>
                      
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center" id="aesthetic-wrapper">
                        
                        {/* Interactive Color swatch list */}
                        <div className="md:col-span-6 flex gap-2" id="swatch-list">
                          {activeProposal.aestheticArchetype.colorPalette.map((color, index) => (
                            <div key={index} className="flex-1 flex flex-col gap-1 items-center" id={`swatch-${index}`}>
                              <div 
                                className="w-full aspect-square rounded-xl border border-black/10 shadow-lg hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-pointer"
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                              <span className="font-mono text-[8px] uppercase text-[#1F2024]/40 mt-1">{color}</span>
                            </div>
                          ))}
                        </div>

                        {/* Typography Pairing details */}
                        <div className="md:col-span-6 flex flex-col gap-1 text-[11px]" id="typography-spec">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-mono text-[9px] uppercase text-[#1F2024]/40 tracking-widest">Theme Atmosphere</span>
                            <span className="text-[#1F2024]/80 font-light italic text-xs leading-normal">"{activeProposal.aestheticArchetype.atmosphere}"</span>
                          </div>
                          <div className="flex flex-col gap-0.5 mt-2">
                            <span className="font-mono text-[9px] uppercase text-[#1F2024]/40 tracking-widest">Aesthetic Font Pairing</span>
                            <span className="text-[#B48E33] font-mono font-bold text-xs">{activeProposal.aestheticArchetype.typographyPairing}</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Technical Layers list */}
                    <div className="mb-8" id="proposals-architectural-specs">
                      <h5 className="font-serif text-xs uppercase tracking-widest text-[#1F2024]/40 mb-4">
                        Bespoke Architectural Engineering Layers
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="architectural-matrix">
                        {activeProposal.architecturalLayers.map((layer, index) => (
                          <div key={index} className="p-5 bg-[#FAF8F5]/80 border border-black/5 rounded-2xl shadow-inner flex flex-col justify-between" id={`layer-pane-${index}`}>
                            <div className="flex flex-col gap-2">
                              <div className="flex justify-between items-center" id={`layer-title-box-${index}`}>
                                <span className="font-mono text-[9px] text-[#1F2024]/40 tracking-widest">LAYER CODE 0{index + 1}</span>
                                <span className="font-mono text-[8px] text-[#B48E33] bg-[#B48E33]/5 border border-[#B48E33]/10 rounded-full px-2 py-0.5 uppercase font-bold">Modular</span>
                              </div>
                              <h6 className="font-serif text-[13px] font-semibold text-[#1F2024]">{layer.layer}</h6>
                              <p className="font-sans text-[11px] text-[#1F2024]/70 font-light leading-relaxed">{layer.description}</p>
                            </div>
                            <p className="font-serif italic text-[11px] text-[#A2855F] pt-2 border-t border-black/5 mt-3">
                              "Technical necessity: {layer.rationale}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Project Roadmap delivery */}
                    <div className="mb-8" id="proposals-roadmap-phases">
                      <h5 className="font-serif text-xs uppercase tracking-widest text-[#1F2024]/40 mb-4">
                        Execution Phases & Quality Deliverables
                      </h5>
                      <div className="flex flex-col gap-4" id="phases-list">
                        {activeProposal.phasedRoadmap.map((phase, index) => (
                          <div key={index} className="flex gap-4 items-start" id={`phase-row-${index}`}>
                            <div className="p-2 border border-[#B48E33]/20 bg-[#FAF8F5]/95 shadow-sm rounded-xl font-serif font-bold text-[#B48E33] text-xs aspect-square flex items-center justify-center w-9" id={`phase-seal-${index}`}>
                              {phase.phase}
                            </div>
                            <div className="flex flex-col gap-2 flex-grow mt-1" id={`phase-content-${index}`}>
                              <div className="flex justify-between items-baseline" id={`phase-header-${index}`}>
                                <h6 className="font-serif text-sm font-semibold text-[#1F2024]">{phase.title}</h6>
                                <span className="font-mono text-[9px] uppercase tracking-wider text-[#A2855F]">{phase.timeline}</span>
                              </div>
                              <div className="flex flex-wrap gap-2" id={`phase-deliverables-${index}`}>
                                {phase.deliverables.map((item, dIdx) => (
                                  <span key={dIdx} className="font-mono text-[9px] text-[#1F2024]/60 bg-[#FAF8F5] border border-black/5 rounded-full px-3 py-1 shadow-inner">
                                    • {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Valuation / timeline projections row */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-black/5 font-mono text-[10px]" id="proposals-metrics-footing">
                      <div className="flex flex-col gap-1">
                        <span className="text-[#1F2024]/40 uppercase text-[9px]">Complexity Tier</span>
                        <span className="text-[#B48E33] uppercase font-bold tracking-wide">{activeProposal.commercialEstimation.complexity}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[#1F2024]/40 uppercase text-[9px]">Timeline Range</span>
                        <span className="text-[#B48E33] uppercase font-bold tracking-wide">{activeProposal.commercialEstimation.estimatedWeeks} Weeks Allocation</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[#1F2024]/40 uppercase text-[9px]">Atelier Effort Grade</span>
                        <span className="text-[#B48E33] uppercase font-bold tracking-wide">{activeProposal.commercialEstimation.effortScore}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[#1F2024]/40 uppercase text-[9px]">Calibrated Method</span>
                        <span className="text-[#1F2024]/80 uppercase font-normal tracking-wide italic leading-normal">"Custom Preview Salons"</span>
                      </div>
                    </div>

                    {/* Exporter triggers */}
                    <div className="mt-8 pt-6 border-t border-black/5 flex justify-end gap-3" id="proposals-exporter-bar">
                      <button 
                        onClick={exportProposalToTxt}
                        className="clay-button-secondary px-5 py-2.5 font-mono text-[9px] uppercase tracking-widest flex items-center gap-2"
                        id="btn-export-dossier"
                      >
                        <Download className="w-3.5 h-3.5" /> Grab Bespoke Dossier
                      </button>
                    </div>

                  </div>
                )}

              </div>
            </div>

          </div>

          {/* HISTORICAL INTENT LEDGER (Elite memorized client inquiries list representing real pipeline) */}
          <div className="flex flex-col gap-6 mt-12 clay-card p-6 md:p-10" id="crm-prestige-ledger">
            <div className="flex justify-between items-baseline border-b border-black/5 pb-4" id="ledger-title-line">
              <div className="flex flex-col gap-1">
                <h4 className="font-serif text-lg font-light text-[#B48E33] flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#B48E33]" /> Registry of Client Intents
                </h4>
                <p className="text-[10px] font-mono tracking-widest text-[#1F2024]/40 uppercase">
                  Memorized inquiries cataloguing full-stack engineering calibrations
                </p>
              </div>
              <span className="font-mono text-[9px] text-[#A2855F] bg-[#FAF8F5] border border-black/5 shadow-inner px-3 py-1.5 rounded-full uppercase">
                {leadsList.length} Active Intakes
              </span>
            </div>

            {isLoadingLeads ? (
              <p className="text-xs font-mono text-[#1F2024]/40 py-4 animate-pulse uppercase tracking-wider">
                Recalibrating CRM intake metrics...
              </p>
            ) : leadsList.length === 0 ? (
              <p className="text-xs font-mono text-[#1F2024]/40 py-4 uppercase tracking-wider">
                No active luxury inquiries. Make history by submitting yours above.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="leads-grid">
                {leadsList.map((lead) => (
                  <div 
                    key={lead.id}
                    className="p-5 bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] border border-black/5 hover:border-[#B48E33]/30 rounded-2xl flex justify-between items-center transition-all duration-300 shadow-sm hover:shadow-md relative group"
                    id={`lead-item-${lead.id}`}
                  >
                    <div className="flex flex-col gap-2 max-w-[80%]" id={`lead-meta-${lead.id}`}>
                      <div className="flex gap-2 items-baseline" id={`lead-header-${lead.id}`}>
                        <span className="font-serif text-sm font-semibold text-[#1F2024]">{lead.clientName}</span>
                        {lead.firmName && (
                          <span className="font-mono text-[9px] text-[#1F2024]/40">({lead.firmName})</span>
                        )}
                      </div>
                      <p className="text-[10.5px] font-sans font-light text-[#1F2024]/70 leading-relaxed truncate" id={`lead-vision-${lead.id}`}>
                        "{lead.vision}"
                      </p>
                      
                      <div className="flex gap-3 text-[9px] font-mono mt-1" id={`lead-info-chips-${lead.id}`}>
                        <span className="text-[#B48E33] font-semibold uppercase">{lead.budgetTier}</span>
                        <span className="text-[#1F2024]/20">|</span>
                        <span className="text-[#A2855F] font-semibold">{lead.archetype || "Editorial"} Archetype</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2" id={`lead-action-${lead.id}`}>
                      <span className="font-mono text-[8.5px] text-[#1F2024]/40">
                        {new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {lead.proposal ? (
                        <button 
                          onClick={() => loadPastProposal(lead)}
                          className="clay-button-secondary px-3 py-1 text-[8.5px] font-mono tracking-widest uppercase"
                          id={`lead-recall-${lead.id}`}
                        >
                          Dossier
                        </button>
                      ) : (
                        <span className="text-[8px] font-mono tracking-wider text-[#B48E33] bg-[#B48E33]/5 border border-[#B48E33]/20 rounded-full px-2 py-1 uppercase animate-pulse select-none font-bold">
                          In formulation
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
 
      </main>

      {/* FOOTER SECTION */}
      <footer className="border-t border-black/5 bg-[#EFECE5]/90 px-6 lg:px-16 py-12 text-[#1F2024]/45 text-xs font-mono font-light relative z-30 animate-fade-in" id="atelier-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2" id="footer-logo">
            <h5 className="font-serif text-sm tracking-widest text-[#1F2024] uppercase font-bold">
              Atelier <span className="text-[#B48E33] italic tracking-normal font-normal">Virtuoso</span>
            </h5>
            <p className="text-[9px] text-[#1F2024]/40 uppercase tracking-wider">
              Bespoke Software Craft & Technical Blueprints
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-2 text-[9px] text-[#1F2024]/40 uppercase tracking-widest" id="footer-copyright">
            <span>Operating dynamically over Secure fullstack cloud corridors</span>
            <span>All rights reserved © 2026. Custom crafted specifications.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
