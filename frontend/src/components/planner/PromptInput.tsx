import React, { useState } from 'react';
import { ExamplePrompt, PlanStyleOption } from '../../types/plan';

interface PromptInputProps {
  prompt: string;
  setPrompt: (val: string) => void;
  onSubmit: (prompt?: string) => void;
  isLoading: boolean;
  planStyle: PlanStyleOption;
  setPlanStyle: (style: PlanStyleOption) => void;
  simulateErrorToggle: boolean;
  setSimulateErrorToggle: (val: boolean) => void;
  simulateEmptyToggle: boolean;
  setSimulateEmptyToggle: (val: boolean) => void;
}

interface PresetsWithSvg extends Omit<ExamplePrompt, 'icon'> {
  iconType: 'launch' | 'design' | 'marketing' | 'tech';
}

const PRESET_EXAMPLES: PresetsWithSvg[] = [
  {
    id: '1',
    title: 'Mobile App Launch',
    prompt: 'Help me plan a product launch for a new mobile app.',
    category: 'launch',
    iconType: 'launch',
  },
  {
    id: '2',
    title: 'Design System & UI',
    prompt: 'Create a roadmap for building a design system and UI components.',
    category: 'design',
    iconType: 'design',
  },
  {
    id: '3',
    title: 'Q4 Growth Strategy',
    prompt: 'Draft a marketing strategy for scaling high-intent user acquisition.',
    category: 'marketing',
    iconType: 'marketing',
  },
  {
    id: '4',
    title: 'Tech Stack Upgrade',
    prompt: 'Outline a plan for refactoring web architecture to TypeScript & React 19.',
    category: 'tech',
    iconType: 'tech',
  },
];

const renderPresetIcon = (type: PresetsWithSvg['iconType']) => {
  switch (type) {
    case 'launch':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
          <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-3.05 11a22.35 22.35 0 01-3.95 2z" />
        </svg>
      );
    case 'design':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      );
    case 'marketing':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" />
        </svg>
      );
    case 'tech':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
};

export const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  onSubmit,
  isLoading,
  planStyle,
  setPlanStyle,
  simulateErrorToggle,
  setSimulateErrorToggle,
  simulateEmptyToggle,
  setSimulateEmptyToggle,
}) => {
  const [activeChip, setActiveChip] = useState<string | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (prompt.trim() && !isLoading) {
        onSubmit();
      }
    }
  };

  const handleChipClick = (item: PresetsWithSvg) => {
    setActiveChip(item.id);
    setPrompt(item.prompt);
    onSubmit(item.prompt);
  };

  return (
    <div className="planner-prompt-section">
      {/* ── Main Input Box matching Genie Reference (Screenshot 1) ── */}
      <div className="planner-input-card">
        <div className="planner-input-body">
          <svg className="planner-sparkle-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
              fill="currentColor"
            />
          </svg>
          <textarea
            className="planner-textarea"
            placeholder="Ask AI a question or describe a task plan to accomplish..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            disabled={isLoading}
          />
        </div>

        {/* ── Controls Toolbar ── */}
        <div className="planner-input-toolbar">
          <div className="planner-pill-group">
            <button className="planner-pill-btn" type="button" tabIndex={-1}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
              </svg>
              <span>Attach</span>
            </button>

            {/* Fully Functional Plan Style Select Dropdown */}
            <div className="planner-select-wrapper">
              <select
                className="planner-pill-btn planner-style-select"
                value={planStyle}
                onChange={(e) => setPlanStyle(e.target.value as PlanStyleOption)}
                aria-label="Select Plan Style"
              >
                <option value="standard">⚡ Standard Plan</option>
                <option value="detailed">📋 Detailed Roadmap</option>
                <option value="agile">🏃 Agile Sprints</option>
              </select>
            </div>

            {/* Empty response simulation toggle */}
            <label className="planner-error-toggle" title="Toggle to simulate 0 steps returned for testing empty state">
              <input
                type="checkbox"
                checked={simulateEmptyToggle}
                onChange={(e) => setSimulateEmptyToggle(e.target.checked)}
              />
              <span>Simulate Empty</span>
            </label>

            {/* Error simulation toggle for testing candidate requirements */}
            <label className="planner-error-toggle" title="Toggle to simulate API error state for testing">
              <input
                type="checkbox"
                checked={simulateErrorToggle}
                onChange={(e) => setSimulateErrorToggle(e.target.checked)}
              />
              <span>Simulate Error</span>
            </label>
          </div>

          <button
            className={`planner-submit-btn ${prompt.trim() ? 'active' : ''}`}
            onClick={() => onSubmit()}
            disabled={!prompt.trim() || isLoading}
            aria-label="Generate Plan"
          >
            {isLoading ? (
              <span className="planner-btn-spinner" />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Example Suggestions Grid (Screenshot 1) ── */}
      <div className="planner-examples-wrap">
        <span className="planner-examples-label">GET STARTED WITH AN EXAMPLE BELOW</span>
        <div className="planner-examples-grid">
          {PRESET_EXAMPLES.map((item) => (
            <button
              key={item.id}
              className={`planner-example-card ${activeChip === item.id ? 'selected' : ''}`}
              onClick={() => handleChipClick(item)}
              disabled={isLoading}
            >
              <p className="planner-example-text">{item.prompt}</p>
              <div className="planner-example-footer">
                <span className="planner-example-icon">{renderPresetIcon(item.iconType)}</span>
                <span className="planner-example-title">{item.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
