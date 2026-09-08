import React from 'react';
import { PlanData } from '../../types/plan';
import { StepCard } from './StepCard';

interface PlanViewProps {
  plan: PlanData;
  onUpdateStep: (stepId: string, field: 'title' | 'description', value: string) => void;
  onToggleStatus: (stepId: string) => void;
  onAddStep: () => void;
  onDeleteStep: (stepId: string) => void;
  onConfirmPlan: () => void;
  onReset: () => void;
}

export const PlanView: React.FC<PlanViewProps> = ({
  plan,
  onUpdateStep,
  onToggleStatus,
  onAddStep,
  onDeleteStep,
  onConfirmPlan,
  onReset,
}) => {
  const completedCount = plan.steps.filter((s) => s.status === 'completed').length;
  const totalCount = plan.steps.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="plan-view-container">
      {/* ── Plan Overview Header ── */}
      <div className="plan-summary-card">
        <div className="plan-summary-top">
          <div className="plan-title-block">
            <div className="plan-badge-group">
              <span className="plan-badge">AI Plan Generated</span>
              {plan.style && (
                <span className="plan-style-badge">
                  {plan.style === 'detailed' ? 'Detailed Roadmap' : plan.style === 'agile' ? 'Agile Sprints' : 'Standard Plan'}
                </span>
              )}
            </div>
            <h3 className="plan-main-title">{plan.title}</h3>
            <p className="plan-main-desc">{plan.description}</p>
          </div>

          <button className="plan-reset-btn" onClick={onReset} title="Start new prompt">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
            </svg>
            <span>New Request</span>
          </button>
        </div>

        {/* Progress Bar */}
        {totalCount > 0 && (
          <div className="plan-progress-wrapper">
            <div className="plan-progress-labels">
              <span>Progress: {completedCount} of {totalCount} steps completed</span>
              <span className="plan-progress-pct">{progressPct}%</span>
            </div>
            <div className="plan-progress-track">
              <div className="plan-progress-fill" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        )}
      </div>

      {/* ── Steps Stack ── */}
      <div className="plan-steps-stack">
        <div className="plan-steps-header">
          <h4 className="plan-steps-heading">Plan Action Items ({totalCount})</h4>
          <span className="plan-steps-hint">Click step title or description to edit inline</span>
        </div>

        {totalCount === 0 ? (
          <div className="plan-empty-state-card">
            <div className="plan-empty-icon-wrap">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="3 3" />
                <path d="M12 8v8M8 12h8" strokeLinecap="round" />
              </svg>
            </div>
            <h5 className="plan-empty-title">Zero Action Items Inferred</h5>
            <p className="plan-empty-desc">
              The AI model returned an empty step list for this prompt. You can build your custom roadmap by adding items below.
            </p>
            <button className="plan-add-step-btn primary-empty-btn" onClick={onAddStep}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
              <span>Add First Task Item</span>
            </button>
          </div>
        ) : (
          <>
            {plan.steps.map((step, idx) => (
              <StepCard
                key={step.id}
                step={step}
                index={idx}
                onUpdateStep={onUpdateStep}
                onToggleStatus={onToggleStatus}
                onDeleteStep={onDeleteStep}
              />
            ))}

            {/* Add Step Button */}
            <button className="plan-add-step-btn" onClick={onAddStep}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
              <span>Add Custom Plan Item</span>
            </button>
          </>
        )}
      </div>

      {/* ── Bottom Confirm Bar (Core Flow Step 7 Requirement) ── */}
      <div className="plan-actions-footer">
        <button
          className="plan-confirm-btn"
          onClick={onConfirmPlan}
          disabled={totalCount === 0}
          title={totalCount === 0 ? 'Add at least one step before confirming plan' : 'Finalize and approve plan'}
        >
          <span>Confirm & Activate Plan</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};

