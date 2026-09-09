import React, { useState } from 'react';

interface OnboardingTourProps {
  onComplete: () => void;
}

const STEPS = [
  {
    step: 1,
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="18" fill="url(#g1)" />
        <defs>
          <radialGradient id="g1" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </radialGradient>
        </defs>
        <path d="M18 10v4M18 22v4M10 18h4M22 18h4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <path d="M13 13l2.5 2.5M20.5 20.5l2.5 2.5M20.5 15.5l2.5-2.5M13 23l2.5-2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    tag: 'Step 1 of 3',
    title: 'Type any goal in plain English',
    description:
      'The input bar at the centre accepts free-form text — describe a project, a strategy, or any roadmap you need. You can also pick one of the four example prompts below it to see the planner in action immediately.',
    hint: 'Try: "Plan a mobile app launch" or "Draft a Q4 growth strategy"',
  },
  {
    step: 2,
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="18" fill="url(#g2)" />
        <defs>
          <radialGradient id="g2" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7c3aed" />
          </radialGradient>
        </defs>
        <rect x="11" y="12" width="14" height="12" rx="2" stroke="#fff" strokeWidth="1.5" fill="none" />
        <path d="M14 16h8M14 19h5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="26" cy="24" r="4" fill="#84cc16" />
        <path d="M24.3 24l1 1.2 2-2.2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tag: 'Step 2 of 3',
    title: 'Travis AI reasons & builds your plan',
    description:
      'After submitting, Travis locks the input and runs through a 4-stage reasoning sequence — Parsing Prompt → Synthesising Tasks → Structuring Hierarchy → Finalising Roadmap. Each stage completes sequentially with a live timer, then the full structured plan appears.',
    hint: 'The reasoning animation reflects the actual classification & template selection logic inside the service.',
  },
  {
    step: 3,
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="18" fill="url(#g3)" />
        <defs>
          <radialGradient id="g3" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#bef264" />
            <stop offset="100%" stopColor="#84cc16" />
          </radialGradient>
        </defs>
        <path d="M13 23l2-5 9-9 3 3-9 9-5 2z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
        <path d="M21 11l3 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    tag: 'Step 3 of 3',
    title: 'Edit steps, confirm & execute',
    description:
      'Every step card is editable — click the title or description to rewrite it inline. Add or remove steps freely. When ready, hit Confirm Plan to lock it into Active Execution mode and track completion per step. Every plan is saved automatically to the left sidebar.',
    hint: 'Confirmed plans are locked — click the lock icon to re-enter edit mode at any time.',
  },
  {
    step: 4,
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="18" fill="url(#g4)" />
        <defs>
          <linearGradient id="g4" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#84cc16" />
          </linearGradient>
        </defs>
        <path d="M18 10c0 0 6 4 6 9a6 6 0 01-12 0c0-5 6-9 6-9z" stroke="#fff" strokeWidth="1.5" fill="none" />
        <circle cx="18" cy="19" r="2" fill="#fff" />
        <path d="M15 25l-2 2M21 25l2 2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    tag: 'Ready',
    title: "You're all set — dive in!",
    description:
      'Four sample plans are pre-loaded in the history sidebar so you can explore how previous sessions look. Click any history item to regenerate that plan instantly, or type your own goal to start fresh.',
    hint: null,
  },
];

export const OnboardingTour: React.FC<OnboardingTourProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const step = STEPS[currentStep];
  const isLast = currentStep === STEPS.length - 1;
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="onboarding-overlay" role="dialog" aria-modal="true" aria-label="Getting started tour">
      <div className="onboarding-backdrop" />
      <div className="onboarding-card">
        {/* Progress bar */}
        <div className="onboarding-progress-track">
          <div className="onboarding-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="onboarding-body">
          <div className="onboarding-icon-wrap">{step.icon}</div>

          <span className="onboarding-tag">{step.tag}</span>
          <h2 className="onboarding-title">{step.title}</h2>
          <p className="onboarding-description">{step.description}</p>

          {step.hint && (
            <div className="onboarding-hint">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="8" cy="8" r="7" stroke="#0284c7" strokeWidth="1.4" />
                <path d="M8 7v4M8 5.5v.5" stroke="#0284c7" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <span>{step.hint}</span>
            </div>
          )}

          {/* Step dots */}
          <div className="onboarding-dots">
            {STEPS.map((_, i) => (
              <button
                key={i}
                className={`onboarding-dot ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'done' : ''}`}
                onClick={() => setCurrentStep(i)}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>

          <div className="onboarding-actions">
            {currentStep > 0 && (
              <button
                className="onboarding-btn onboarding-btn--ghost"
                onClick={() => setCurrentStep((s) => s - 1)}
              >
                Back
              </button>
            )}

            {!isLast ? (
              <button
                className="onboarding-btn onboarding-btn--primary"
                onClick={() => setCurrentStep((s) => s + 1)}
              >
                Next
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ) : (
              <button className="onboarding-btn onboarding-btn--launch" onClick={onComplete}>
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M6 8l2 2 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Start Planning
              </button>
            )}
          </div>

          {!isLast && (
            <button className="onboarding-skip" onClick={onComplete}>
              Skip tour
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
