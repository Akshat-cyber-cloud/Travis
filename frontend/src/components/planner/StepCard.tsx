import React, { useState } from 'react';
import { PlanStep } from '../../types/plan';

interface StepCardProps {
  step: PlanStep;
  index: number;
  onUpdateStep: (stepId: string, field: 'title' | 'description', value: string) => void;
  onToggleStatus: (stepId: string) => void;
  onDeleteStep: (stepId: string) => void;
}

export const StepCard: React.FC<StepCardProps> = ({
  step,
  index,
  onUpdateStep,
  onToggleStatus,
  onDeleteStep,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);

  const formattedIndex = (index + 1).toString().padStart(2, '0');
  const isCompleted = step.status === 'completed';

  return (
    <div className={`step-card ${isCompleted ? 'step-card--completed' : ''}`}>
      <div className="step-card-header">
        {/* Step status checkbox toggle */}
        <button
          className={`step-checkbox ${isCompleted ? 'checked' : ''}`}
          onClick={() => onToggleStatus(step.id)}
          aria-label={isCompleted ? 'Mark step as pending' : 'Mark step as completed'}
        >
          {isCompleted && (
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 5L4.5 8.5L11 1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        <span className="step-index-badge">{formattedIndex}</span>

        {/* Step Title (Click to edit inline) */}
        <div className="step-title-wrapper">
          {isEditingTitle ? (
            <input
              type="text"
              className="step-inline-input step-inline-input--title"
              value={step.title}
              onChange={(e) => onUpdateStep(step.id, 'title', e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
              autoFocus
            />
          ) : (
            <h4
              className="step-title"
              onClick={() => setIsEditingTitle(true)}
              title="Click to edit title"
            >
              {step.title || 'Untitled Step'}
              <span className="step-edit-icon">✏️</span>
            </h4>
          )}
        </div>

        {/* Time estimate badge if available */}
        {step.estimatedTime && (
          <span className="step-time-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            {step.estimatedTime}
          </span>
        )}

        {/* Delete action button */}
        <button
          className="step-delete-btn"
          onClick={() => onDeleteStep(step.id)}
          title="Remove step"
          aria-label="Remove step"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
        </button>
      </div>

      {/* Step Description (Click to edit inline) */}
      <div className="step-card-body">
        {isEditingDesc ? (
          <textarea
            className="step-inline-input step-inline-input--desc"
            value={step.description}
            onChange={(e) => onUpdateStep(step.id, 'description', e.target.value)}
            onBlur={() => setIsEditingDesc(false)}
            rows={2}
            autoFocus
          />
        ) : (
          <p
            className="step-desc"
            onClick={() => setIsEditingDesc(true)}
            title="Click to edit description"
          >
            {step.description || 'No description provided. Click to add details...'}
          </p>
        )}
      </div>
    </div>
  );
};
