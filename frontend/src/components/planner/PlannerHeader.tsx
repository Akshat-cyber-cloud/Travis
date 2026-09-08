import React from 'react';

interface PlannerHeaderProps {
  onClose?: () => void;
}

export const PlannerHeader: React.FC<PlannerHeaderProps> = ({ onClose }) => {
  return (
    <div className="planner-header-wrap">
      {onClose && (
        <button
          className="planner-close-btn"
          onClick={onClose}
          aria-label="Close Travis AI Planner"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1L13 13M1 13L13 1"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}

      {/* ── Translucent Glass Orb with Inner Blue Fluid Motion (Screenshot 2) ── */}
      <div className="planner-glass-orb-container">
        <div className="planner-glass-orb">
          <div className="planner-glass-specular-top" />
          <div className="planner-glass-specular-bottom" />
          
          {/* Inner Fluid Waves */}
          <div className="planner-fluid-wrap">
            <div className="planner-fluid-wave planner-fluid-wave-1" />
            <div className="planner-fluid-wave planner-fluid-wave-2" />
            <div className="planner-fluid-wave planner-fluid-wave-3" />
          </div>
        </div>

        {/* Ambient Soft Glow Aura */}
        <div className="planner-glass-ambient-glow" />
      </div>

      {/* ── Editorial Display Greeting matching Landing Page Typography ── */}
      <div className="planner-heading-group">
        <div className="planner-kicker-pill">
          <span className="planner-kicker-dot" />
          <span>Travis AI Agent v2.4</span>
        </div>
        <h2 className="planner-headline">
          What would you like to{' '}
          <span className="headline-serif-italic">accomplish</span>?
        </h2>
      </div>
    </div>
  );
};
