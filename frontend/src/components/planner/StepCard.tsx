import React, { useState } from 'react';
import { PlanStep } from '../../types/plan';

interface StepCardProps {
  step: PlanStep;
  index: number;
  isLocked?: boolean;
  onUpdateStep: (stepId: string, field: 'title' | 'description', value: string) => void;
  onToggleStatus: (stepId: string) => void;
  onToggleCollapse?: (stepId: string) => void;
  onDeleteStep: (stepId: string) => void;
}

export const StepCard: React.FC<StepCardProps> = ({
  step,
  index,
  isLocked = false,
  onUpdateStep,
  onToggleStatus,
  onToggleCollapse,
  onDeleteStep,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);

  const formattedIndex = (index + 1).toString().padStart(2, '0');
  const isCompleted = step.status === 'completed';
  const isCollapsed = step.isCollapsed ?? false;
  const isEditing = isEditingTitle || isEditingDesc;

  const handleStartTitleEdit = () => {
    if (!isLocked) setIsEditingTitle(true);
  };

  const handleStartDescEdit = () => {
    if (!isLocked) setIsEditingDesc(true);
  };

  return (
    <div
      className={`step-card ${isCompleted ? 'step-card--completed' : ''} ${
        isEditing ? 'step-card--editing' : ''
      } ${isLocked ? 'step-card--locked' : ''} ${
        isCollapsed ? 'step-card--collapsed' : ''
      }`}
    >
      {/* ── Active Editing Visual Indicator Chip ── */}
      {isEditing && (
        <div className="step-editing-banner">
          <span className="step-editing-chip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span>Editing mode • Press Enter or click outside to save</span>
          </span>
        </div>
      )}

      {/* ── Card Header Line ── */}
      <div className="step-card-header">
        {/* Step Checkbox Control */}
        <button
          className={`step-checkbox ${isCompleted ? 'checked' : ''}`}
          onClick={() => onToggleStatus(step.id)}
          aria-label={isCompleted ? 'Mark step as pending' : 'Mark step as completed'}
          title={isCompleted ? 'Mark step pending' : 'Mark step completed'}
        >
          {isCompleted && (
            <svg width="11" height="9" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M1 5L4.5 8.5L11 1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        {/* Index Badge (Subtle quiet visual weight) */}
        <span className="step-index-badge">{formattedIndex}</span>

        {/* Primary Focus: Step Title */}
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
              className={`step-title ${!isLocked ? 'step-title--editable' : ''}`}
              onClick={handleStartTitleEdit}
              title={isLocked ? 'Plan is locked (confirm active)' : 'Click to edit title'}
            >
              <span className="step-title-text">{step.title || 'Untitled Step'}</span>
              {!isLocked && (
                <span className="step-edit-icon-svg" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </span>
              )}
            </h4>
          )}
        </div>

        {/* Controls & Metadata (Low visual weight - quiet layout) */}
        <div className="step-meta-controls">
          {/* Time estimate badge */}
          {step.estimatedTime && (
            <span className="step-time-badge" title="Estimated duration">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span>{step.estimatedTime}</span>
            </span>
          )}

          {/* Expand/Collapse Chevron Button */}
          {onToggleCollapse && (
            <button
              className="step-collapse-btn"
              onClick={() => onToggleCollapse(step.id)}
              title={isCollapsed ? 'Expand step details' : 'Collapse step details'}
              aria-label={isCollapsed ? 'Expand step details' : 'Collapse step details'}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* Delete Action Button (Ghost quiet weight - hidden until hover or focused) */}
          {!isLocked && (
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
          )}
        </div>
      </div>

      {/* ── Step Body / Description (Progressive Disclosure) ── */}
      {!isCollapsed && (
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
              className={`step-desc ${!isLocked ? 'step-desc--editable' : ''}`}
              onClick={handleStartDescEdit}
              title={isLocked ? 'Plan is locked (confirm active)' : 'Click to edit description'}
            >
              {step.description || 'No description provided. Click to add details...'}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
