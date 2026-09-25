import {
  calculatePlan,
  calculateScenario,
  collectionPlan,
  demoScenario,
  eventLifecycle,
  evidenceLadder,
  flexibilityResources,
  forecastSeries,
  portfolioAreas,
  provenanceItems,
  readinessFactors,
  whyNotReadyItems,
  type EvEvidenceSetting,
} from "@/lib/gridpilot-data";

export const gridPilotServices = {
  getScenario: () => demoScenario,
  getForecast: () => forecastSeries,
  getResources: () => flexibilityResources,
  getReadiness: () => ({ factors: readinessFactors, evidenceLadder, whyNotReadyItems, collectionPlan }),
  getEventLifecycle: () => eventLifecycle,
  getPortfolioAreas: () => portfolioAreas,
  getProvenance: () => provenanceItems,
  calculatePlan: (evEvidence: EvEvidenceSetting) => calculatePlan(evEvidence),
  calculateScenario,
};
