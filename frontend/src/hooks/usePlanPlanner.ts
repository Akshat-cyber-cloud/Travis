import { useState, useCallback, useRef } from 'react';
import { PlanData, PlanStep, APIStatus, APIErrorState, PlanStyleOption, UndoToastState, HistoryItem } from '../types/plan';
import { MockPlanApiService } from '../services/mockPlanApi';

const DEFAULT_HISTORY: HistoryItem[] = [
  {
    id: 'h1',
    title: 'Mobile App Launch Plan',
    prompt: 'Help me plan a product launch for a new mobile app.',
    timestamp: new Date().toISOString(),
    timeFormatted: '10m ago',
    group: 'Today',
    iconType: 'launch',
  },
  {
    id: 'h2',
    title: 'Design System & UI Roadmap',
    prompt: 'Create a roadmap for building a design system and UI components.',
    timestamp: new Date().toISOString(),
    timeFormatted: '2h ago',
    group: 'Today',
    iconType: 'design',
  },
  {
    id: 'h3',
    title: 'Q4 Growth Strategy',
    prompt: 'Draft a marketing strategy for scaling high-intent user acquisition.',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    timeFormatted: 'Yesterday',
    group: 'Yesterday',
    iconType: 'marketing',
  },
  {
    id: 'h4',
    title: 'Tech Stack React Upgrade',
    prompt: 'Outline a plan for refactoring web architecture to TypeScript & React 19.',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    timeFormatted: 'Yesterday',
    group: 'Yesterday',
    iconType: 'tech',
  },
];

export function usePlanPlanner() {
  const [prompt, setPrompt] = useState<string>('');
  const [status, setStatus] = useState<APIStatus>('idle');
  const [plan, setPlan] = useState<PlanData | null>(null);
  const [error, setError] = useState<APIErrorState | null>(null);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [planStyle, setPlanStyle] = useState<PlanStyleOption>('standard');
  const [undoToast, setUndoToast] = useState<UndoToastState | null>(null);
  const [historyList, setHistoryList] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('travis_ai_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load history from localStorage', e);
    }
    return DEFAULT_HISTORY;
  });

  const undoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Request plan generation from AI service and automatically save to history
   */
  const handleGeneratePlan = useCallback(
    async (
      requestPrompt?: string,
      overrideOptions?: { forceError?: boolean; forceEmpty?: boolean }
    ) => {
      const activePrompt = (requestPrompt ?? prompt).trim();
      if (!activePrompt) return;

      setPrompt(activePrompt);
      setStatus('loading');
      setError(null);
      setIsConfirmed(false);
      setIsLocked(false);
      setUndoToast(null);

      const forceError = overrideOptions?.forceError ?? false;
      const forceEmpty = overrideOptions?.forceEmpty ?? false;

      try {
        const result = await MockPlanApiService.generatePlan(activePrompt, {
          forceError,
          forceEmpty,
          style: planStyle,
        });

        setPlan(result);
        setStatus(result.steps.length === 0 ? 'empty' : 'success');

        // Dynamically prepend new generated plan to History
        const lower = activePrompt.toLowerCase();
        let iconType: HistoryItem['iconType'] = 'custom';
        if (lower.includes('mobile') || lower.includes('app') || lower.includes('launch')) iconType = 'launch';
        else if (lower.includes('design') || lower.includes('ui') || lower.includes('system')) iconType = 'design';
        else if (lower.includes('marketing') || lower.includes('growth') || lower.includes('strategy')) iconType = 'marketing';
        else if (lower.includes('tech') || lower.includes('stack') || lower.includes('typescript')) iconType = 'tech';

        const newHistoryItem: HistoryItem = {
          id: `hist-${Date.now()}`,
          title: result.title,
          prompt: activePrompt,
          timestamp: new Date().toISOString(),
          timeFormatted: 'Just now',
          group: 'Today',
          iconType,
        };

        setHistoryList((prev) => {
          const filtered = prev.filter((item) => item.prompt.toLowerCase() !== activePrompt.toLowerCase());
          const nextList = [newHistoryItem, ...filtered];
          try {
            localStorage.setItem('travis_ai_history', JSON.stringify(nextList));
          } catch (e) {
            console.error('Failed to save history to localStorage', e);
          }
          return nextList;
        });
      } catch (err) {
        const errorPayload = err as APIErrorState;
        setError(errorPayload);
        setStatus('error');
      }
    },
    [prompt, planStyle]
  );

  /**
   * Delete an individual history item
   */
  const handleDeleteHistoryItem = useCallback((id: string) => {
    setHistoryList((prev) => {
      const nextList = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem('travis_ai_history', JSON.stringify(nextList));
      } catch (e) {
        console.error('Failed to update history', e);
      }
      return nextList;
    });
  }, []);

  /**
   * Clear all history items
   */
  const handleClearHistory = useCallback(() => {
    setHistoryList([]);
    try {
      localStorage.removeItem('travis_ai_history');
    } catch (e) {
      console.error('Failed to clear history', e);
    }
  }, []);

  /**
   * Retry generating plan after an error
   */
  const handleRetry = useCallback(() => {
    handleGeneratePlan(prompt, { forceError: false, forceEmpty: false });
  }, [handleGeneratePlan, prompt]);

  /**
   * Edit an individual step's title or description
   */
  const handleUpdateStep = useCallback((stepId: string, field: 'title' | 'description', value: string) => {
    setPlan((prevPlan) => {
      if (!prevPlan) return null;
      return {
        ...prevPlan,
        steps: prevPlan.steps.map((step) =>
          step.id === stepId ? { ...step, [field]: value } : step
        ),
      };
    });
  }, []);

  /**
   * Toggle a step status between completed and pending
   */
  const handleToggleStepStatus = useCallback((stepId: string) => {
    setPlan((prevPlan) => {
      if (!prevPlan) return null;
      return {
        ...prevPlan,
        steps: prevPlan.steps.map((step) => {
          if (step.id !== stepId) return step;
          const nextStatus = step.status === 'completed' ? 'pending' : 'completed';
          return { ...step, status: nextStatus };
        }),
      };
    });
  }, []);

  /**
   * Toggle individual step collapse state
   */
  const handleToggleStepCollapse = useCallback((stepId: string) => {
    setPlan((prevPlan) => {
      if (!prevPlan) return null;
      return {
        ...prevPlan,
        steps: prevPlan.steps.map((step) =>
          step.id === stepId ? { ...step, isCollapsed: !step.isCollapsed } : step
        ),
      };
    });
  }, []);

  /**
   * Global collapse or expand all steps
   */
  const handleToggleCollapseAll = useCallback((shouldCollapse: boolean) => {
    setPlan((prevPlan) => {
      if (!prevPlan) return null;
      return {
        ...prevPlan,
        steps: prevPlan.steps.map((step) => ({ ...step, isCollapsed: shouldCollapse })),
      };
    });
  }, []);

  /**
   * Add a new step to the plan
   */
  const handleAddStep = useCallback(() => {
    setPlan((prevPlan) => {
      if (!prevPlan) return null;
      const newStep: PlanStep = {
        id: `step-custom-${Date.now()}`,
        title: 'New Custom Plan Task',
        description: 'Click to edit task details, timeline, and dependencies...',
        status: 'pending',
        estimatedTime: '1 Day',
        isCollapsed: false,
      };
      return {
        ...prevPlan,
        steps: [...prevPlan.steps, newStep],
      };
    });
    if (status === 'empty') {
      setStatus('success');
    }
  }, [status]);

  /**
   * Remove a step from the plan with Undo capability
   */
  const handleDeleteStep = useCallback((stepId: string) => {
    setPlan((prevPlan) => {
      if (!prevPlan) return null;
      const stepIndex = prevPlan.steps.findIndex((s) => s.id === stepId);
      const stepToDelete = prevPlan.steps[stepIndex];
      if (!stepToDelete) return prevPlan;

      // Clear existing undo timer if active
      if (undoTimerRef.current) {
        clearTimeout(undoTimerRef.current);
      }

      setUndoToast({ step: stepToDelete, index: stepIndex });

      // Auto-dismiss undo toast after 5 seconds
      undoTimerRef.current = setTimeout(() => {
        setUndoToast(null);
      }, 5000);

      const filtered = prevPlan.steps.filter((s) => s.id !== stepId);
      return {
        ...prevPlan,
        steps: filtered,
      };
    });
  }, []);

  /**
   * Restore deleted step from Undo toast
   */
  const handleUndoDelete = useCallback(() => {
    if (!undoToast) return;
    if (undoTimerRef.current) {
      clearTimeout(undoTimerRef.current);
    }

    setPlan((prevPlan) => {
      if (!prevPlan) return null;
      const nextSteps = [...prevPlan.steps];
      const targetIndex = Math.min(undoToast.index, nextSteps.length);
      nextSteps.splice(targetIndex, 0, undoToast.step);

      return {
        ...prevPlan,
        steps: nextSteps,
      };
    });

    setUndoToast(null);
  }, [undoToast]);

  const handleDismissUndoToast = useCallback(() => {
    if (undoTimerRef.current) {
      clearTimeout(undoTimerRef.current);
    }
    setUndoToast(null);
  }, []);

  /**
   * Finalize and confirm plan
   */
  const handleConfirmPlan = useCallback(() => {
    setIsConfirmed(true);
    setIsLocked(true);
  }, []);

  /**
   * Toggle lock state (allows user to unlock confirmed plan to edit)
   */
  const handleToggleLock = useCallback(() => {
    setIsLocked((prev) => !prev);
  }, []);

  /**
   * Reset planner back to initial empty state
   */
  const handleReset = useCallback(() => {
    setPrompt('');
    setStatus('idle');
    setPlan(null);
    setError(null);
    setIsConfirmed(false);
    setIsLocked(false);
    setUndoToast(null);
    if (undoTimerRef.current) {
      clearTimeout(undoTimerRef.current);
    }
  }, []);

  return {
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
  };
}


