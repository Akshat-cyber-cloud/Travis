import React from 'react';
import { APIErrorState } from '../../types/plan';

interface ErrorStateProps {
  error: APIErrorState | null;
  onRetry: () => void;
  onReset: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry, onReset }) => {
  return (
    <div className="planner-error-card">
      <div className="planner-error-icon-wrap">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
        </svg>
      </div>

      <h4 className="planner-error-title">Failed to Generate Plan</h4>
      <p className="planner-error-desc">
        {error?.message || 'An unexpected error occurred while communicating with Travis AI engine.'}
      </p>

      <div className="planner-error-actions">
        <button className="planner-btn-primary" onClick={onRetry}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M23 4v6h-6M1 20v-6h6" />
            <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
          </svg>
          <span>Retry Request</span>
        </button>

        <button className="planner-btn-secondary" onClick={onReset}>
          <span>Start Over</span>
        </button>
      </div>
    </div>
  );
};
