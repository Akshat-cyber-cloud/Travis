import React, { useState } from 'react';
import { PlanData, UndoToastState } from '../../types/plan';
import { StepCard } from './StepCard';

interface PlanViewProps {
  plan: PlanData;
  isLocked?: boolean;
  undoToast?: UndoToastState | null;
  onUndoDelete?: () => void;
  onDismissUndo?: () => void;
  onToggleStepCollapse?: (stepId: string) => void;
  onToggleCollapseAll?: (shouldCollapse: boolean) => void;
  onToggleLock?: () => void;
  onUpdateStep: (stepId: string, field: 'title' | 'description', value: string) => void;
  onToggleStatus: (stepId: string) => void;
  onAddStep: () => void;
  onDeleteStep: (stepId: string) => void;
  onConfirmPlan: () => void;
  onReset: () => void;
}

export const PlanView: React.FC<PlanViewProps> = ({
  plan,
  isLocked = false,
  undoToast = null,
  onUndoDelete,
  onDismissUndo,
  onToggleStepCollapse,
  onToggleCollapseAll,
  onToggleLock,
  onUpdateStep,
  onToggleStatus,
  onAddStep,
  onDeleteStep,
  onConfirmPlan,
  onReset,
}) => {
  const [areAllCollapsed, setAreAllCollapsed] = useState(false);

  const completedCount = plan.steps.filter((s) => s.status === 'completed').length;
  const totalCount = plan.steps.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleGlobalCollapseToggle = () => {
    const nextState = !areAllCollapsed;
    setAreAllCollapsed(nextState);
    if (onToggleCollapseAll) {
      onToggleCollapseAll(nextState);
    }
  };

  return (
    <div className={`plan-view-container ${isLocked ? 'plan-view--locked' : ''}`}>
      {/* ── Plan Overview Header (Plan-Level Anchor) ── */}
      <div className="plan-summary-card">
        <div className="plan-summary-top">
          <div className="plan-title-block">
            <div className="plan-badge-group">
              {isLocked ? (
                <span className="plan-badge plan-badge--locked" title="Plan activated and locked for execution">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  <span>LIVE EXECUTION (LOCKED)</span>
                </span>
              ) : (
                <span className="plan-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  <span>AI Plan Review (Draft)</span>
                </span>
              )}

              {plan.style && (
                <span className="plan-style-badge">
                  {plan.style === 'detailed' ? 'Detailed Roadmap' : plan.style === 'agile' ? 'Agile Sprints' : 'Standard Plan'}
                </span>
              )}
            </div>

            <h3 className="plan-main-title">{plan.title}</h3>
            <p className="plan-main-desc">{plan.description}</p>
          </div>

          <div className="plan-summary-actions">
            {isLocked && onToggleLock && (
              <button
                className="plan-unlock-btn"
                onClick={onToggleLock}
                title="Unlock plan to edit steps"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 019.9-1" />
                </svg>
                <span>Unlock to Edit</span>
              </button>
            )}

            <button className="plan-reset-btn" onClick={onReset} title="Start new request prompt">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
              <span>New Request</span>
            </button>
          </div>
        </div>

        {/* Progress Bar (Visible pre- & post-confirm) */}
        {totalCount > 0 && (
          <div className="plan-progress-wrapper">
            <div className="plan-progress-labels">
              <span>
                {isLocked ? 'Execution Progress:' : 'Review Progress:'} {completedCount} of {totalCount} tasks completed
              </span>
              <span className="plan-progress-pct">{progressPct}%</span>
            </div>
            <div className="plan-progress-track">
              <div
                className={`plan-progress-fill ${isLocked ? 'plan-progress-fill--active' : ''}`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Steps Stack Section ── */}
      <div className="plan-steps-stack">
        <div className="plan-steps-header">
          <div className="plan-steps-heading-block">
            <h4 className="plan-steps-heading">
              Plan Action Items <span className="plan-count-chip">{totalCount}</span>
            </h4>
            <span className="plan-steps-hint">
              {isLocked
                ? 'Execution Mode: Check off tasks as completed'
                : 'Progressive Disclosure: Click titles or descriptions to edit inline'}
            </span>
          </div>

          {/* Progressive Disclosure: Global Collapse/Expand All Button */}
          {totalCount > 0 && (
            <button
              className="plan-collapse-all-btn"
              onClick={handleGlobalCollapseToggle}
              title={areAllCollapsed ? 'Expand all step descriptions' : 'Collapse all step descriptions'}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{ transform: areAllCollapsed ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
              >
                <path d="M7 11l5-5 5 5M7 17l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{areAllCollapsed ? 'Expand All' : 'Collapse All'}</span>
            </button>
          )}
        </div>

        {/* ── Rich Empty State (Satisfies Requirement 2) ── */}
        {totalCount === 0 ? (
          <div className="plan-empty-state-card">
            <div className="plan-empty-illustration">
              <div className="plan-empty-icon-halo">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                  <path d="M14 2v6h6M12 18v-6M9 15h6" strokeLinecap="round" />
                </svg>
              </div>
              <span className="plan-empty-sparkle-1">✦</span>
              <span className="plan-empty-sparkle-2">✦</span>
            </div>

            <h5 className="plan-empty-title">Zero Action Items Inferred</h5>
            <p className="plan-empty-desc">
              The AI model returned 0 task steps for this prompt. You can build your custom roadmap from scratch or try a preset prompt.
            </p>

            <div className="plan-empty-actions">
              <button className="plan-empty-btn primary" onClick={onAddStep}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
                <span>Add First Task Item</span>
              </button>

              <button className="plan-empty-btn secondary" onClick={onReset}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38l5.67-5.67" strokeLinecap="round" />
                </svg>
                <span>Try Presets / Re-prompt</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Step Cards List */}
            {plan.steps.map((step, idx) => (
              <StepCard
                key={step.id}
                step={step}
                index={idx}
                isLocked={isLocked}
                onUpdateStep={onUpdateStep}
                onToggleStatus={onToggleStatus}
                onToggleCollapse={onToggleStepCollapse}
                onDeleteStep={onDeleteStep}
              />
            ))}

            {/* Task-Level Item Control: Add Custom Plan Item */}
            {!isLocked && (
              <button className="plan-add-step-btn" onClick={onAddStep}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
                <span>Add Custom Plan Item</span>
              </button>
            )}
          </>
        )}
      </div>

      {/* ── Undo Toast Notification (Requirement 2) ── */}
      {undoToast && (
        <div className="plan-undo-toast" role="alert">
          <div className="plan-undo-toast-left">
            <span className="plan-undo-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg>
            </span>
            <div className="plan-undo-text">
              <span className="plan-undo-msg">
                Step <strong>"{undoToast.step.title}"</strong> deleted
              </span>
            </div>
          </div>

          <div className="plan-undo-toast-right">
            <button className="plan-undo-btn" onClick={onUndoDelete}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 10h10a5 5 0 015 5v2M3 10l6-6M3 10l6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Undo</span>
            </button>
            {onDismissUndo && (
              <button className="plan-undo-close" onClick={onDismissUndo} aria-label="Dismiss undo">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>

          {/* Animated 5s Countdown Progress Line */}
          <div className="plan-undo-progress-line" />
        </div>
      )}

      {/* ── Plan-Level Action Dock (Requirement 3) ── */}
      <div className="plan-actions-footer">
        {isLocked ? (
          <div className="plan-confirmed-bar">
            <div className="plan-confirmed-status">
              <span className="plan-status-dot-active" />
              <span>Plan Confirmed & Active</span>
            </div>
            <button className="plan-confirm-btn plan-confirm-btn--locked" onClick={onConfirmPlan}>
              <span>View Confirmed Summary</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};
