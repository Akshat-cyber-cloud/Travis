import React, { useEffect } from 'react';
import { usePlanPlanner } from '../../hooks/usePlanPlanner';
import { PlannerHeader } from './PlannerHeader';
import { PromptInput } from './PromptInput';
import { PlanView } from './PlanView';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { SuccessConfirmation } from './SuccessConfirmation';
import './PlannerModal.css';

interface TravisPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const TravisPlannerModal: React.FC<TravisPlannerModalProps> = ({
  isOpen,
  onClose,
  initialPrompt = '',
}) => {
  const {
    prompt,
    setPrompt,
    status,
    plan,
    error,
    isConfirmed,
    simulateErrorToggle,
    setSimulateErrorToggle,
    handleGeneratePlan,
    handleRetry,
    handleUpdateStep,
    handleToggleStepStatus,
    handleAddStep,
    handleDeleteStep,
    handleConfirmPlan,
    handleReset,
  } = usePlanPlanner();

  // If initialPrompt is passed when modal opens, generate plan immediately
  useEffect(() => {
    if (isOpen && initialPrompt.trim()) {
      setPrompt(initialPrompt);
      handleGeneratePlan(initialPrompt);
    }
  }, [isOpen, initialPrompt]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="planner-modal-backdrop" onClick={onClose}>
      <div
        className="planner-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Travis AI Task Planner"
      >
        {/* Header with Orb & Editorial Typography */}
        <PlannerHeader onClose={onClose} />

        {/* Modal Main Content Area */}
        <div className="planner-modal-content">
          {isConfirmed && plan ? (
            <SuccessConfirmation plan={plan} onReset={handleReset} />
          ) : status === 'loading' ? (
            <LoadingState />
          ) : status === 'error' ? (
            <ErrorState error={error} onRetry={handleRetry} onReset={handleReset} />
          ) : (status === 'success' || status === 'empty') && plan ? (
            <PlanView
              plan={plan}
              onUpdateStep={handleUpdateStep}
              onToggleStatus={handleToggleStepStatus}
              onAddStep={handleAddStep}
              onDeleteStep={handleDeleteStep}
              onConfirmPlan={handleConfirmPlan}
              onReset={handleReset}
            />
          ) : (
            <PromptInput
              prompt={prompt}
              setPrompt={setPrompt}
              onSubmit={handleGeneratePlan}
              isLoading={false}
              simulateErrorToggle={simulateErrorToggle}
              setSimulateErrorToggle={setSimulateErrorToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
};
