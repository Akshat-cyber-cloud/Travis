import React, { useEffect, useState } from 'react';

const THINKING_STEPS = [
  { id: 1, label: 'Parsing natural language intent', detail: 'Identified core objectives and operational context' },
  { id: 2, label: 'Synthesizing operational milestones', detail: 'Decomposing plan into sequential, actionable tasks' },
  { id: 3, label: 'Structuring task timelines & dependencies', detail: 'Calculating task estimates & status initializers' },
  { id: 4, label: 'Finalizing interactive Travis plan', detail: 'Preparing editable step cards & progress overview' },
];

export const LoadingState: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    // Pace step transitions every 750ms over the 3-second AI reasoning delay
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < THINKING_STEPS.length - 1 ? prev + 1 : prev));
    }, 750);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="planner-loading-card">
      <div className="planner-thinking-header">
        <div className="planner-thinking-badge">
          <span className="planner-thinking-spinner" />
          <span>Travis AI Reasoning Engine</span>
        </div>
        <h3 className="planner-thinking-title">Synthesizing Operational Plan...</h3>
      </div>

      {/* ── AI Reasoning Stepper ── */}
      <div className="planner-reasoning-stepper">
        {THINKING_STEPS.map((step, idx) => {
          const isDone = idx < activeStep;
          const isCurrent = idx === activeStep;
          const isPending = idx > activeStep;

          return (
            <div
              key={step.id}
              className={`reasoning-step-item ${isDone ? 'done' : ''} ${isCurrent ? 'active' : ''} ${isPending ? 'pending' : ''}`}
            >
              <div className="reasoning-step-status-icon">
                {isDone ? (
                  <svg width="12" height="12" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M1 5L4.5 8.5L11 1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : isCurrent ? (
                  <span className="reasoning-step-pulse-dot" />
                ) : (
                  <span className="reasoning-step-empty-dot" />
                )}
              </div>

              <div className="reasoning-step-text">
                <span className="reasoning-step-label">{step.label}</span>
                <span className="reasoning-step-detail">{step.detail}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Animated shimmer placeholder cards */}
      <div className="planner-skeleton-stack">
        <div className="planner-skeleton-card" />
        <div className="planner-skeleton-card short" />
      </div>
    </div>
  );
};
