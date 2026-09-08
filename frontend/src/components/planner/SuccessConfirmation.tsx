import React, { useState } from 'react';
import { PlanData } from '../../types/plan';

interface SuccessConfirmationProps {
  plan: PlanData;
  onReset: () => void;
}

export const SuccessConfirmation: React.FC<SuccessConfirmationProps> = ({ plan, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textSummary = `[CONFIRMED PLAN] ${plan.title}\n${plan.description}\n\nTasks:\n` +
      plan.steps.map((s, i) => `${i + 1}. ${s.title} — ${s.description} (${s.estimatedTime || '1 Day'})`).join('\n');
    
    navigator.clipboard.writeText(textSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(plan, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${plan.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_confirmed_plan.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="planner-success-card">
      <div className="planner-success-badge-icon">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" />
          <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <span className="planner-success-pill">✅ Plan Confirmed & Activated</span>
      <h3 className="planner-success-title">Your Plan is Ready for Execution!</h3>
      <p className="planner-success-desc">
        All {plan.steps.length} task items have been reviewed, approved, and registered in your workspace.
      </p>

      {/* Confirmed Plan Detail Box */}
      <div className="planner-confirmed-preview-box">
        <div className="planner-confirmed-header">
          <span className="planner-confirmed-badge">ACTIVE ROADMAP</span>
          <h4 className="planner-confirmed-title">{plan.title}</h4>
          <p className="planner-confirmed-subtitle">{plan.description}</p>
        </div>

        <div className="planner-confirmed-steps-list">
          {plan.steps.map((step, i) => (
            <div key={step.id} className="planner-confirmed-step-row">
              <span className="planner-confirmed-step-check">✓</span>
              <div className="planner-confirmed-step-info">
                <span className="planner-confirmed-step-title">{i + 1}. {step.title}</span>
                <span className="planner-confirmed-step-desc">{step.description}</span>
              </div>
              {step.estimatedTime && (
                <span className="planner-confirmed-step-time">{step.estimatedTime}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="planner-success-actions">
        <button className="planner-btn-primary" onClick={handleCopy}>
          {copied ? (
            <span>Copied to Clipboard! ✓</span>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              <span>Copy Summary</span>
            </>
          )}
        </button>

        <button className="planner-btn-secondary" onClick={handleExportJSON}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Export JSON</span>
        </button>

        <button className="planner-btn-secondary" onClick={onReset}>
          <span>Create Another Plan</span>
        </button>
      </div>
    </div>
  );
};

