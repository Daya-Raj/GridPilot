# GridPilot

### Evidence-qualified flexibility planning for reliable renewable energy.

> Renewable variability. Reliable energy.

GridPilot is a decision-support platform designed to help local energy
programme operators understand, assess, and plan flexible electricity
demand during periods of renewable supply stress.

Instead of treating every available flexible load as equally reliable,
GridPilot evaluates the evidence behind each resource before using it
in a flexibility plan.

---

## 🌐 Product

**Live Demo:** [GridPilot](YOUR_NETLIFY_URL)

**Challenge:** Yuva Yodha Energy Tech Hackathon 2026  
**Challenge 03:** Grid Reliability — Renewable Intermittency

---

## ⚡ The Problem

Renewable generation can vary significantly while local electricity
demand continues to change.

During a period of supply stress, an operator needs to answer:

- How much flexibility is actually available?
- Which loads can be shifted?
- How trustworthy is the available flexibility?
- What happens if a resource becomes unavailable?
- How much residual risk remains after planning?

GridPilot focuses on the planning layer between **available data**
and **trusted flexibility action**.

---

## 💡 The GridPilot Approach

```text
                    ┌─────────────────────┐
                    │   Energy Data       │
                    │ Demand / Renewable  │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Evidence &          │
                    │ Provenance          │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Readiness           │
                    │ Assessment          │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Forecast &          │
                    │ Stress Detection    │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Trusted Flexibility │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Action Planning     │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Human Approval      │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ What-if Simulation  │
                    └──────────┬──────────┘
                               ↓
                    ┌─────────────────────┐
                    │ Impact & Risk       │
                    └─────────────────────┘

🧠 How GridPilot Works
01 — Understand

GridPilot brings together demand, renewable generation and flexible
resource information.

02 — Assess

Not every declared flexible resource has the same level of evidence.

GridPilot distinguishes between resources based on the strength of
the available evidence.
              FLEXIBILITY READINESS

        ┌──────────────────────────────┐
        │        MEASURED              │
        │     Highest evidence         │
        └──────────────┬───────────────┘
                       ↓
        ┌──────────────────────────────┐
        │    OPERATOR CONFIRMED        │
        └──────────────┬───────────────┘
                       ↓
        ┌──────────────────────────────┐
        │       USER PROVIDED          │
        └──────────────┬───────────────┘
                       ↓
        ┌──────────────────────────────┐
        │         SIMULATED            │
        │       Planning only          │
        └──────────────────────────────┘
The evidence level influences whether a resource can be trusted by the
planning process.

03 — Plan

GridPilot identifies periods where renewable supply and local demand
create a potential stress condition.

The planning layer then considers:

Available flexible loads
Evidence strength
Operating constraints
Resource availability
Participation limits
Timing requirements

The result is a human-reviewable flexibility action plan.

04 — Simulate

Before relying on a plan, operators can explore what happens when
conditions change.

For example:
EV Flexibility
GridPilot can recompute the planning scenario and expose changes in:

Trusted flexibility
Recommended actions
Residual risk
Reliability indicators

🔬 Core Innovation
Not every kW deserves the same level of trust.

A conventional flexibility view can treat declared capacity as
available capacity.

GridPilot introduces an evidence-qualified planning layer.
Declared Flexibility
        │
        ▼
┌─────────────────────┐
│ Evidence Strength   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Readiness State     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Trusted Flexibility │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Action Plan         │
└─────────────────────┘
This means uncertainty is not simply displayed as a confidence badge.
It influences what the planning workflow is allowed to rely upon.

🖥️ Product Experience
Command Center

A high-level view of current system conditions, renewable supply,
demand stress and available flexibility.

Data & Flexibility Readiness

Understand which resources have strong evidence and which require
additional verification.

Event Workspace

The main planning workspace for a renewable supply stress event.

What-if Simulation

Explore how changes in resource availability affect the planned
response.

Map & Portfolio

A secondary portfolio view for understanding local residual risk and
resource distribution.

Reports

Evidence-based decision records showing scenario assumptions,
planning results, provenance and simulated impact.
🏗️ System Architecture
┌──────────────────────────────────────────────────────────────┐
│                         DATA SOURCES                         │
│                                                              │
│ Demand │ Renewable │ Weather │ Flexible Loads │ User Input  │
└──────────────────────────────┬───────────────────────────────┘
                               ↓
┌──────────────────────────────────────────────────────────────┐
│                 DATA VALIDATION & PROVENANCE                 │
└──────────────────────────────┬───────────────────────────────┘
                               ↓
┌──────────────────────────────────────────────────────────────┐
│                    READINESS ASSESSMENT                      │
└──────────────────────────────┬───────────────────────────────┘
                               ↓
┌──────────────────────────────────────────────────────────────┐
│               FORECASTING & STRESS DETECTION                 │
└──────────────────────────────┬───────────────────────────────┘
                               ↓
┌──────────────────────────────────────────────────────────────┐
│              EVIDENCE-QUALIFIED FLEXIBILITY                  │
└──────────────────────────────┬───────────────────────────────┘
                               ↓
┌──────────────────────────────────────────────────────────────┐
│                CONSTRAINED ACTION PLANNING                   │
└──────────────────────────────┬───────────────────────────────┘
                               ↓
┌──────────────────────────────────────────────────────────────┐
│                     HUMAN REVIEW                             │
└──────────────────────────────┬───────────────────────────────┘
                               ↓
┌──────────────────────────────────────────────────────────────┐
│                 DETERMINISTIC SIMULATION                     │
└──────────────────────────────┬───────────────────────────────┘
                               ↓
┌──────────────────────────────────────────────────────────────┐
│                 IMPACT & DECISION REPORT                     │
└──────────────────────────────────────────────────────────────┘
Frontend Architecture
React / TypeScript
        │
        ├── Application Shell
        │
        ├── Command Center
        │
        ├── Readiness
        │
        ├── Stress Events
        │
        ├── Event Workspace
        │
        ├── What-if Simulation
        │
        ├── Map & Portfolio
        │
        └── Reports
📊 Demonstration Scenario
North Chennai Mixed Commercial Cluster

SIMULATED DEMO SCENARIO

The current prototype uses a deterministic demonstration scenario to
illustrate the planning workflow.

Example stress condition:

Parameter	Example
Demand	800 kW
Renewable supply	250 kW
Raw shortfall	550 kW
Trusted flexibility	180 kW

Example flexible resources include:

Resource	Evidence
EV charging	Measured
HVAC	Operator confirmed
Water pump	User provided
Cold storage	Simulation-only

Prototype values are simulated or user-provided and should not be
interpreted as measurements of real grid performance.

📈 Reliability View

GridPilot uses scenario-level reliability indicators to compare a
baseline with a planned flexibility scenario.

Example simulated result:

Metric	Baseline	Planned
Residual shortfall proxy	2,230 kWh	1,750 kWh
SWSA	22.6%	39.2%
Stress hours	6	4

These values represent a simulated demonstration scenario, not
actual measured grid performance.

🇮🇳 India Deployment Model

GridPilot is designed around a staged deployment path.
UPLOAD
  ↓
MEASURE
  ↓
VERIFY
  ↓
PLAN
  ↓
AUTHORISE
  ↓
INTEGRATE
The initial workflow does not require direct physical control of
devices.

This allows local operators, cooperatives, ESCOs or aggregators to
begin with available data and progressively improve evidence quality.

💰 Affordability

The prototype follows an upload-first approach.

The initial model avoids making specialised hardware mandatory for
participation.

The intended deployment path is:
Low-data onboarding
        ↓
Evidence improvement
        ↓
Measured participation
        ↓
Larger verified portfolio
        ↓
Future authorised integration
This allows instrumentation and integration to be introduced
progressively rather than requiring every site to begin with expensive
hardware.

🛠️ Technology Stack
Frontend
React
TypeScript
Vite
Tailwind CSS
TanStack Router
Framer Motion
Lucide React
Current Prototype
Client-side scenario data
Interactive planning workflows
Deterministic demonstration scenarios
Responsive application UI
Planned Backend
Python
FastAPI
SQLite
Forecasting pipeline
Constrained optimisation
Persistent scenario storage
🚀 Getting Started
Prerequisites
Node.js
npm
Installation
This allows instrumentation and integration to be introduced
progressively rather than requiring every site to begin with expensive
hardware.

🛠️ Technology Stack
Frontend
React
TypeScript
Vite
Tailwind CSS
TanStack Router
Framer Motion
Lucide React
Current Prototype
Client-side scenario data
Interactive planning workflows
Deterministic demonstration scenarios
Responsive application UI
Planned Backend
Python
FastAPI
SQLite
Forecasting pipeline
Constrained optimisation
Persistent scenario storage
🚀 Getting Started
Prerequisites
Node.js
npm
Installation
Run locally
npm run dev

Open the local development URL shown in the terminal.

Production build
npm run build
📁 Project Structure
GridPilot/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── gridpilot/
│   │   └── ui/
│   │
│   ├── hooks/
│   │
│   ├── lib/
│   │
│   ├── routes/
│   │
│   ├── router.tsx
│   └── styles.css
│
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
Current
 Interactive frontend
 Command Center
 Readiness workflow
 Event Workspace
 What-if Simulation
 Map & Portfolio
 Reports
Next
 Backend API
 Persistent scenario storage
 Forecasting pipeline
 Constrained optimisation engine
 Real measurement ingestion
 Expanded portfolio management
 Future authorised integrations
⚠️ Prototype Scope

GridPilot is currently a decision-support prototype.

It does not currently:

Directly control physical devices
Operate a live electrical grid
Replace a DERMS or VPP
Provide live DISCOM control
Claim measured outage reduction
Treat simulated results as real-world measurements

The prototype is intended to demonstrate the planning and
decision-support workflow.

🏆 Built For
Yuva Yodha Energy Tech Hackathon 2026
Challenge 03 — Grid Reliability: Renewable Intermittency

GridPilot addresses the challenge through:

Forecasting → Smart Load Management → Demand Response →
Local Coordination → Reliability Planning

👤 Team
Daya Raj

Student Developer

DSA • Web Development • Java • Python • AI/ML

⭐ Project

GridPilot

Determine what flexibility is trustworthy enough to plan with
before anyone attempts to use it.

---

## But here's the important GitHub-professional part

**Don't create those `docs/screenshots/*.png` paths manually with fake images.**

You already have a running frontend. We should take **actual screenshots of your actual GridPilot application** and put them into:

```text
docs/
└── screenshots/
    ├── command-center.png
    ├── readiness.png
    ├── event-workspace.png
    ├── simulation.png
    ├── map.png
    └── reports.png
