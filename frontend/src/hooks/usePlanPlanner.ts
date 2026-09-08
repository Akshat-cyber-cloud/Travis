import { useState, useCallback } from 'react';
import { PlanData, PlanStep, APIStatus, APIErrorState, PlanStyleOption } from '../types/plan';
import { MockPlanApiService } from '../services/mockPlanApi';

export function usePlanPlanner() {
  const [prompt, setPrompt] = useState<string>('');
  const [status, setStatus] = useState<APIStatus>('idle');
  const [plan, setPlan] = useState<PlanData | null>(null);
  const [error, setError] = useState<APIErrorState | null>(null);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [planStyle, setPlanStyle] = useState<PlanStyleOption>('standard');
  const [simulateErrorToggle, setSimulateErrorToggle] = useState<boolean>(false);
  const [simulateEmptyToggle, setSimulateEmptyToggle] = useState<boolean>(false);

  /**
   * Request plan generation from AI service
   */
  const handleGeneratePlan = useCallback(
    async (requestPrompt?: string) => {
      const activePrompt = (requestPrompt ?? prompt).trim();
      if (!activePrompt) return;

      setPrompt(activePrompt);
      setStatus('loading');
      setError(null);
      setIsConfirmed(false);

      try {
        const result = await MockPlanApiService.generatePlan(activePrompt, {
          forceError: simulateErrorToggle,
          forceEmpty: simulateEmptyToggle,
          style: planStyle,
        });

        setPlan(result);
        setStatus(result.steps.length === 0 ? 'empty' : 'success');
      } catch (err) {
        const errorPayload = err as APIErrorState;
        setError(errorPayload);
        setStatus('error');
      }
    },
    [prompt, simulateErrorToggle, simulateEmptyToggle, planStyle]
  );

  /**
   * Retry generating plan after an error
   */
  const handleRetry = useCallback(() => {
    setSimulateErrorToggle(false);
    handleGeneratePlan(prompt);
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
   * Add a new step to the plan
   */
  const handleAddStep = useCallback(() => {
    setPlan((prevPlan) => {
      if (!prevPlan) return null;
      const newStep: PlanStep = {
        id: `step-custom-${Date.now()}`,
        title: 'New Plan Task Item',
        description: 'Click to edit task description...',
        status: 'pending',
        estimatedTime: '1 Day',
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
   * Remove a step from the plan
   */
  const handleDeleteStep = useCallback((stepId: string) => {
    setPlan((prevPlan) => {
      if (!prevPlan) return null;
      const filtered = prevPlan.steps.filter((s) => s.id !== stepId);
      return {
        ...prevPlan,
        steps: filtered,
      };
    });
  }, []);

  /**
   * Finalize and confirm plan
   */
  const handleConfirmPlan = useCallback(() => {
    setIsConfirmed(true);
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
  }, []);

  return {
    prompt,
    setPrompt,
    status,
    plan,
    error,
    isConfirmed,
    planStyle,
    setPlanStyle,
    simulateErrorToggle,
    setSimulateErrorToggle,
    simulateEmptyToggle,
    setSimulateEmptyToggle,
    handleGeneratePlan,
    handleRetry,
    handleUpdateStep,
    handleToggleStepStatus,
    handleAddStep,
    handleDeleteStep,
    handleConfirmPlan,
    handleReset,
  };
}

