export interface Project {
  id: string;
  title: string;
  domain: string;
  description: string;
  imageUrl: string;
  craftStack: string[];
  features: string[];
  metrics: {
    label: string;
    value: string;
  };
  narrative: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  philosophy: string;
  offerings: string[];
}

export interface SkillGroup {
  category: string;
  skills: {
    name: string;
    level: number; // 0-100 for elegant luxury meter
    vintage: string; // e.g. "Since 2018" (represents master craft duration)
    meta: string; // e.g. "Isomorphic State"
  }[];
}

export interface InquiryLead {
  id: string;
  clientName: string;
  firmName?: string;
  vision: string;
  budgetTier: string;
  archetype: "Editorial" | "Cyber-Minimalist" | "Sovereign-Sleek";
  createdAt: string;
  status: "Reviewing" | "Accepted" | "Archived";
}

export interface BespokeProposal {
  projectName: string;
  executiveSummary: string;
  aestheticArchetype: {
    name: string;
    atmosphere: string;
    colorPalette: string[];
    typographyPairing: string;
  };
  architecturalLayers: {
    layer: string;
    description: string;
    rationale: string;
  }[];
  phasedRoadmap: {
    phase: string;
    title: string;
    deliverables: string[];
    timeline: string;
  }[];
  commercialEstimation: {
    effortScore: string;
    complexity: "Moderate" | "Extremely High" | "Superb Mastercraft";
    estimatedWeeks: number;
    recommendedMethod: string;
  };
}
