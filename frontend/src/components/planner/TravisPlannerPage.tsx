import React, { useEffect, useState } from 'react';
import { usePlanPlanner } from '../../hooks/usePlanPlanner';
import { PlannerHeader } from './PlannerHeader';
import { PromptInput } from './PromptInput';
import { PlanView } from './PlanView';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { SuccessConfirmation } from './SuccessConfirmation';
import { PlannerSidebar } from './PlannerSidebar';
import { OnboardingTour } from './OnboardingTour';
import './PlannerModal.css';

interface TravisPlannerPageProps {
  onBackToHome: () => void;
  initialPrompt?: string;
}

export const TravisPlannerPage: React.FC<TravisPlannerPageProps> = ({
  onBackToHome,
  initialPrompt = '',
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Show onboarding tour on first visit
  const [showTour, setShowTour] = useState<boolean>(() => {
    try {
      return localStorage.getItem('travis_tour_seen') !== 'true';
    } catch {
      return true;
    }
  });

  const handleTourComplete = () => {
    setShowTour(false);
    try {
      localStorage.setItem('travis_tour_seen', 'true');
    } catch { /* ignore */ }
  };

  const {
    prompt,
    setPrompt,
    status,
    plan,
    error,
    isConfirmed,
    isLocked,
    planStyle,
    setPlanStyle,
    undoToast,
    historyList,
    handleDeleteHistoryItem,
    handleClearHistory,
    handleGeneratePlan,
    handleRetry,
    handleUpdateStep,
    handleToggleStepStatus,
    handleToggleStepCollapse,
    handleToggleCollapseAll,
    handleAddStep,
    handleDeleteStep,
    handleUndoDelete,
    handleDismissUndoToast,
    handleConfirmPlan,
    handleToggleLock,
    handleReset,
  } = usePlanPlanner();

  // Generate plan immediately if initialPrompt is passed
  useEffect(() => {
    if (initialPrompt.trim()) {
      setPrompt(initialPrompt);
      handleGeneratePlan(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSelectHistoryPrompt = (historyPrompt: string) => {
    setPrompt(historyPrompt);
    handleGeneratePlan(historyPrompt);
  };

  return (
    <div className={`planner-page-root ${isSidebarOpen ? 'has-sidebar' : 'no-sidebar'}`}>
      {/* ── First-visit onboarding tour ── */}
      {showTour && <OnboardingTour onComplete={handleTourComplete} />}
      {/* ── Left Collapsible History Sidebar ── */}
      <PlannerSidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(false)}
        onSelectHistory={handleSelectHistoryPrompt}
        onDeleteHistoryItem={handleDeleteHistoryItem}
        onClearHistory={handleClearHistory}
        historyList={historyList}
        onNewPlan={handleReset}
        onBackToHome={onBackToHome}
      />

      {/* ── Main Workspace Body ── */}
      <div className="planner-page-layout">
        {/* ── Top Navigation Bar ── */}
        <header className="planner-top-navbar">
          <div className="planner-nav-left">
            {!isSidebarOpen && (
              <button
                className="planner-sidebar-toggle-btn"
                onClick={() => setIsSidebarOpen(true)}
                title="Open history sidebar"
                aria-label="Open Sidebar"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 3v18" />
                </svg>
              </button>
            )}

            <div className="planner-nav-brand">
              <span className="planner-brand-dot" />
              <span className="planner-brand-title">Travis AI Workspace</span>
            </div>
          </div>

          <div className="planner-nav-right">
            {plan && (
              <button className="planner-nav-new-btn" onClick={handleReset}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
                <span>New Plan</span>
              </button>
            )}
          </div>
        </header>

        {/* ── Full Page Centered Main Content ── */}
        <main className={`planner-page-main ${status === 'idle' ? 'planner-page-main--centered' : ''}`}>
          {/* Render hero orb header ONLY on initial prompt screen */}
          {status === 'idle' && <PlannerHeader />}

          <div className="planner-page-content">
            {isConfirmed && plan ? (
              <SuccessConfirmation plan={plan} onReset={handleReset} />
            ) : status === 'loading' ? (
              <LoadingState />
            ) : status === 'error' ? (
              <ErrorState error={error} onRetry={handleRetry} onReset={handleReset} />
            ) : (status === 'success' || status === 'empty') && plan ? (
              <PlanView
                plan={plan}
                isLocked={isLocked}
                undoToast={undoToast}
                onUndoDelete={handleUndoDelete}
                onDismissUndo={handleDismissUndoToast}
                onToggleStepCollapse={handleToggleStepCollapse}
                onToggleCollapseAll={handleToggleCollapseAll}
                onToggleLock={handleToggleLock}
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
                planStyle={planStyle}
                setPlanStyle={setPlanStyle}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
