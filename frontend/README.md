# Travis AI Task Planner

A high-polish, full-page AI-powered Task Planner web application designed for **Travis AI**. Built with React, TypeScript, and modern UI design principles matching the brand aesthetic of Travis.

![Travis AI Planner](https://img.shields.io/badge/Status-Completed-success) ![React 19](https://img.shields.io/badge/React-19-blue) ![TypeScript 5](https://img.shields.io/badge/TypeScript-5-blue)

---

## 🌟 Key Features & Core Flow Alignment

The application strictly implements and satisfies the complete **Section 3 Core User Flow (Steps 1–8)** as requested:

1. **Natural Language Input & Example Suggestions**:
   - Clean, elevated prompt textarea featuring an AI sparkle icon.
   - 4 prompt presets covering **Mobile App Launch**, **Design System & UI**, **Q4 Growth Strategy**, and **Tech Stack Upgrade**.
   - **Plan Style Selection Dropdown**: Supports `⚡ Standard Plan`, `📋 Detailed Roadmap`, and `🏃 Agile Sprints`.

2. **Multi-Stage AI Reasoning State (Loading View)**:
   - Dynamic progress stepper showcasing simulated multi-stage reasoning: `Parsing Prompt → Synthesizing Tasks → Structuring Hierarchy → Finalizing Roadmap`.
   - Real-time step duration timer, progress indicator, and skeleton loading cards.

3. **Structured Plan View & Overview**:
   - Displays plan title, badge, description, and interactive progress bar (`X of Y steps completed`).
   - Clean step cards with status badges, day estimates, and contextual icons.

4. **Inline Step Editing (Step 5)**:
   - Click on any task title or description to edit text inline. Preserves user modifications smoothly.

5. **Dynamic Item Management (Step 6)**:
   - Add new custom action items with **"Add Custom Plan Item"**.
   - Delete unwanted steps via the trash action icon on each step card.

6. **Plan Confirmation Action (Step 7 - Core Requirement)**:
   - High-visibility primary CTA button: **`Confirm & Activate Plan →`** anchored at the bottom of the plan card.
   - Transition state from review mode to active execution mode.

7. **Success & Confirmation State Screen (Step 8 - Section 3.8 Requirement)**:
   - Full-page victory view (`✅ Plan Confirmed & Activated`).
   - Detailed summary card showing all approved tasks and estimated timelines.
   - Quick action controls: **Copy Plan Summary to Clipboard**, **Export Plan as JSON**, and **Create Another Plan**.

8. **Handled Edge Cases & Dev Testing Toggles**:
   - **Simulate Error State**: Interactive checkbox in the input toolbar to force an API failure state. Displays diagnostic details (`SERVICE_UNAVAILABLE`) with a **Retry Request** CTA.
   - **Simulate Empty Response State**: Interactive checkbox to simulate 0 steps returned. Displays a clean empty state card with guidance to add custom tasks manually.

---

## 🎨 Visual Design & Aesthetics

- **Hero Glass Orb & Fluid Dynamics**: 3D translucent glass orb header with rotating internal blue fluid waves (`#0284c7`, `#38bdf8`, `#818cf8`), specular light highlights, and ambient glow.
- **Collapsible History Sidebar**: Smooth ChatGPT/Claude-style drawer featuring grouped chat history (Today, Yesterday, Last 7 Days), SVG icon branding, quick actions, and collapsible layout.
- **Zero Scrollbar Policy**: Custom CSS rule hiding browser scrollbars across all scrollable containers (`.planner-page-main`, `.planner-sidebar-scroll`) while keeping smooth scrolling intact.
- **Color Palette & Typography**:
  - Primary Accent: `#0284c7` (Sky Blue) & `#84cc16` (Lime Accent)
  - Dark Neutral: `#08090c`
  - Off-white Background: `#fbfbfd` with subtle radial gradient mesh
  - Typography: `Plus Jakarta Sans`

---

## 🛠️ Architecture & Project Structure

```
frontend/src/
├── components/planner/
│   ├── TravisPlannerPage.tsx    # Parent workspace page container
│   ├── PlannerHeader.tsx        # Hero 3D glass orb & page title
│   ├── PlannerSidebar.tsx       # Collapsible chat history sidebar
│   ├── PromptInput.tsx          # Input card, toolbar, plan style & testing toggles
│   ├── StepCard.tsx             # Interactive step card with inline editing & status toggle
│   ├── PlanView.tsx             # Main plan container, empty state, & Confirm CTA button
│   ├── LoadingState.tsx         # Multi-stage reasoning stepper & skeleton loader
│   ├── ErrorState.tsx           # Error state card with diagnostic code & retry CTA
│   ├── SuccessConfirmation.tsx  # Confirmed plan screen with JSON export & copy summary
│   └── PlannerModal.css         # Complete styling, keyframes, & hidden scrollbars
├── hooks/
│   └── usePlanPlanner.ts        # Central state management hook for planner lifecycle
├── services/
│   └── mockPlanApi.ts           # Decoupled mock API service with delay & error/empty simulation
└── types/
    └── plan.ts                  # TypeScript interfaces for PlanData, PlanStep, & APIStatus
```

---

## 🚀 How to Run Locally

1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📝 Key Technical & Design Decisions

- **Decoupled Asynchronous Mock API (`mockPlanApi.ts`)**: Kept separate from UI code using clean TypeScript interfaces (`PlanData`, `PlanStep`), ensuring real-world async simulation (3000ms delay, error codes, empty states).
- **Centralized State Machine Hook (`usePlanPlanner.ts`)**: Managed all state transitions (Prompting $\rightarrow$ Loading $\rightarrow$ Reviewing $\rightarrow$ Confirmed / Error / Empty) cleanly in a reusable custom hook.
- **Full-Screen SaaS Workspace Experience**: Architected as a full-page app with a collapsible sidebar drawer (Claude / ChatGPT style) rather than a cramped modal dialog.

---

## 💡 Assumptions & Trade-offs

- **Step Completion Tracking vs. Plan Confirmation**: The prompt asks for plan review and confirmation. Step checkboxes were kept as an interactive feature to allow toggling step completion both during review and post-activation.
- **Mock Service vs. Live LLM**: Utilized preset templates mapped to prompt keywords (`design`, `launch`, `marketing`) with random fallbacks to guarantee predictable performance during evaluation without requiring third-party API keys.

---

## 🔮 What I Would Improve With More Time

1. **Drag-and-Drop Step Reordering**: Integrate `@hello-pangea/dnd` to allow users to visually reorder plan action items via handle grip icons.
2. **Persistent Workspace History**: Connect the chat history sidebar to `localStorage` or IndexedDB so created plans persist across browser reloads.
3. **Live AI Streaming Integration**: Replace the mock timer with Server-Sent Events (SSE) streaming using Vercel AI SDK or OpenAI API.
4. **PDF / Markdown Export**: Expand export features beyond JSON to include one-click PDF generation and formatted GitHub Markdown downloads.
