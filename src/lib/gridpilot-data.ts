export type EvidenceLevel =
  | "Measured"
  | "Recently measured"
  | "Historical"
  | "Predicted"
  | "Simulated"
  | "Assumed"
  | "User-provided"
  | "Operator confirmed";

export type ConfidenceLevel = "High" | "Medium" | "Low";
export type ReadinessState = "Ready now" | "Pilot ready" | "Simulation only" | "Not ready";
export type EventStatus =
  | "Draft"
  | "Reviewed"
  | "Approved"
  | "Simulated"
  | "Scheduled"
  | "In progress"
  | "Awaiting measurement"
  | "Measured"
  | "Closed";

export type ForecastPoint = {
  time: string;
  demand: number;
  renewable: number;
  shortfall: number;
  trustedFlexibility: number;
  residualRisk: number;
};

export type FlexResource = {
  id: string;
  resource: string;
  availableKw: number;
  plannedKw: number;
  evidence: EvidenceLevel;
  confidence: ConfidenceLevel;
  recommendedAction: string;
  selected: boolean;
  rationale: string[];
  rejectedReason?: string;
};

export type Area = {
  id: string;
  name: string;
  demand: number;
  renewable: number;
  shortfall: number;
  trustedFlexibility: number;
  residualRisk: number;
  readiness: ReadinessState;
  topAction: string;
};

export const demoScenario = {
  label: "North Chennai Mixed Commercial Cluster",
  mode: "Simulation mode",
  dataLabel: "Simulated demo data",
  scenarioTime: "18:00 IST",
  eventId: "north-chennai-evening-shortfall",
  eventTitle: "Evening Renewable Shortfall",
  eventWindow: "Tomorrow · 18:00–19:00",
  location: "North Chennai Cluster",
  status: "Draft" as EventStatus,
  requiredFlexibilityKw: 150,
};

export const forecastSeries: ForecastPoint[] = [
  { time: "16:00", demand: 620, renewable: 430, shortfall: 190, trustedFlexibility: 30, residualRisk: 160 },
  { time: "17:00", demand: 700, renewable: 360, shortfall: 340, trustedFlexibility: 90, residualRisk: 250 },
  { time: "18:00", demand: 800, renewable: 250, shortfall: 550, trustedFlexibility: 180, residualRisk: 370 },
  { time: "19:00", demand: 760, renewable: 280, shortfall: 480, trustedFlexibility: 140, residualRisk: 340 },
  { time: "20:00", demand: 690, renewable: 330, shortfall: 360, trustedFlexibility: 60, residualRisk: 300 },
  { time: "21:00", demand: 610, renewable: 300, shortfall: 310, trustedFlexibility: 30, residualRisk: 280 },
];

export const flexibilityResources: FlexResource[] = [
  {
    id: "ev",
    resource: "EV Charging",
    availableKw: 100,
    plannedKw: 100,
    evidence: "Recently measured",
    confidence: "High",
    recommendedAction: "Shift 18:00 → 20:00",
    selected: true,
    rationale: [
      "Flexibility window is confirmed from recent charging sessions.",
      "Customer impact is low because completion time remains protected.",
      "No critical operational constraint is detected for the event window.",
    ],
  },
  {
    id: "hvac",
    resource: "HVAC",
    availableKw: 70,
    plannedKw: 50,
    evidence: "Operator confirmed",
    confidence: "Medium",
    recommendedAction: "Pre-cool before event",
    selected: true,
    rationale: [
      "Operator confirmed a safe one-hour pre-cooling window.",
      "Comfort constraints are partially complete, so the action is bounded.",
    ],
  },
  {
    id: "pump",
    resource: "Water Pump",
    availableKw: 30,
    plannedKw: 30,
    evidence: "User-provided",
    confidence: "Medium",
    recommendedAction: "Shift 16:00 → 18:00",
    selected: true,
    rationale: [
      "Shiftability is declared by site staff and does not affect critical hours.",
      "Magnitude is kept conservative because interval measurements are limited.",
    ],
  },
  {
    id: "cold-storage",
    resource: "Cold Storage",
    availableKw: 50,
    plannedKw: 0,
    evidence: "Simulated",
    confidence: "Low",
    recommendedAction: "Do not dispatch",
    selected: false,
    rationale: [],
    rejectedReason: "Insufficient evidence for safe interruption during the shortfall window.",
  },
];

export const readinessFactors = [
  { label: "Data quality", value: "Hourly coverage is usable for pilot planning", state: "Strong" },
  { label: "Data resolution", value: "Hourly, not 15-minute", state: "Caution" },
  { label: "Recency", value: "14-day demo dataset uploaded", state: "Strong" },
  { label: "Resource evidence", value: "EV uses illustrative recent data; HVAC is declared; cold storage is simulated", state: "Mixed" },
  { label: "Constraint completeness", value: "Comfort limits need confirmation", state: "Caution" },
];

export const evidenceLadder = [
  { label: "Repeatedly measured", description: "Strongest evidence", strength: 5 },
  { label: "Recently measured", description: "Current but limited coverage", strength: 4 },
  { label: "Operator confirmed", description: "Known operating bounds", strength: 3 },
  { label: "User declared", description: "Useful for planning", strength: 2 },
  { label: "Simulated", description: "Scenario exploration only", strength: 1 },
];

export const whyNotReadyItems = [
  "EV flexibility is strong, but not all resources are measured.",
  "HVAC comfort constraints are incomplete for extended response windows.",
  "Cold storage can only be considered in simulation until safe interruption data exists.",
];

export const collectionPlan = [
  "Collect 15-minute EV charging interval data for the next 7 evenings.",
  "Confirm HVAC pre-cooling comfort limits with the facility operator.",
  "Measure cold storage thermal recovery before using it in an action plan.",
];

export const eventLifecycle: EventStatus[] = [
  "Draft",
  "Reviewed",
  "Approved",
  "Simulated",
  "Scheduled",
  "In progress",
  "Awaiting measurement",
  "Measured",
  "Closed",
];

export const portfolioAreas: Area[] = [
  {
    id: "area-a",
    name: "Area A · Tondiarpet",
    demand: 800,
    renewable: 250,
    shortfall: 550,
    trustedFlexibility: 180,
    residualRisk: 370,
    readiness: "Pilot ready",
    topAction: "Shift EV charging",
  },
  {
    id: "area-b",
    name: "Area B · Washermanpet",
    demand: 620,
    renewable: 310,
    shortfall: 310,
    trustedFlexibility: 155,
    residualRisk: 155,
    readiness: "Ready now",
    topAction: "Pre-cool HVAC",
  },
  {
    id: "area-c",
    name: "Area C · Royapuram",
    demand: 710,
    renewable: 210,
    shortfall: 500,
    trustedFlexibility: 90,
    residualRisk: 410,
    readiness: "Simulation only",
    topAction: "Collect interval data",
  },
  {
    id: "area-d",
    name: "Area D · Perambur",
    demand: 540,
    renewable: 280,
    shortfall: 260,
    trustedFlexibility: 120,
    residualRisk: 140,
    readiness: "Pilot ready",
    topAction: "Water pump shift",
  },
];

export const provenanceItems = [
  { label: "Demand", status: "Historical", source: "Uploaded CSV", coverage: "14 days", resolution: "Hourly", confidence: "High" },
  { label: "Renewable supply", status: "Predicted", source: "Demo forecast model", coverage: "Tomorrow", resolution: "Hourly", confidence: "Medium" },
  { label: "EV flexibility", status: "Recently measured", source: "Illustrative uploaded dataset", coverage: "10 demo sessions", resolution: "Hourly", confidence: "High" },
  { label: "Cold storage", status: "Simulated", source: "Assumption library", coverage: "Planning only", resolution: "Hourly", confidence: "Low" },
];

export type EvEvidenceSetting = "High" | "Medium" | "Unavailable";

export function calculatePlan(evEvidence: EvEvidenceSetting) {
  const evPlanned = evEvidence === "High" ? 100 : evEvidence === "Medium" ? 60 : 0;
  const evAvailable = evEvidence === "Unavailable" ? 0 : evEvidence === "Medium" ? 70 : 100;
  const hvacPlanned = 50;
  const pumpPlanned = 30;
  const trustedFlexibility = evPlanned + hvacPlanned + pumpPlanned;
  const residualRisk = 550 - trustedFlexibility;
  const confidence = evEvidence === "High" ? 82 : evEvidence === "Medium" ? 68 : 54;
  const readiness: ReadinessState =
    evEvidence === "High" ? "Pilot ready" : evEvidence === "Medium" ? "Simulation only" : "Not ready";
  const margin = trustedFlexibility - demoScenario.requiredFlexibilityKw;

  return {
    evEvidence,
    evAvailable,
    evPlanned,
    trustedFlexibility,
    residualRisk,
    confidence,
    readiness,
    margin,
    recommendation:
      evEvidence === "Unavailable"
        ? "Do not approve. Collect EV evidence and simulate alternatives."
        : evEvidence === "Medium"
          ? "Reduce EV shift to 60 kW and keep the plan in simulation review."
          : "Approve bounded pilot plan with measured EV flexibility.",
  };
}

export function calculateScenario(options: {
  solarReduction: number;
  evParticipationReduction: number;
  hvacAvailabilityReduction: number;
  comfort: "Standard" | "Tighter";
}) {
  const renewable = Math.round(250 * (1 - options.solarReduction / 100));
  const shortfall = 800 - renewable;
  const ev = Math.round(100 * (1 - options.evParticipationReduction / 100));
  const hvacBase = options.comfort === "Tighter" ? 40 : 50;
  const hvac = Math.round(hvacBase * (1 - options.hvacAvailabilityReduction / 100));
  const trustedFlexibility = ev + hvac + 30;
  return {
    baselineShortfall: 550,
    currentPlanResidual: 370,
    scenarioResidual: Math.max(shortfall - trustedFlexibility, 0),
    trustedFlexibility,
    shortfall,
    confidence: Math.max(52, Math.round(82 - options.solarReduction * 0.4 - options.evParticipationReduction * 0.3 - options.hvacAvailabilityReduction * 0.2 - (options.comfort === "Tighter" ? 8 : 0))),
  };
}
