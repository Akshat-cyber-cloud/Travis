/**
 * Types definition for Travis AI Task Planner
 */

export type StepStatus = 'pending' | 'in_progress' | 'completed';

export type PlanStyleOption = 'standard' | 'detailed' | 'agile';

export interface PlanStep {
  id: string;
  title: string;
  description: string;
  status: StepStatus;
  estimatedTime?: string;
}

export interface PlanData {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  style?: PlanStyleOption;
  steps: PlanStep[];
}

export type APIStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error';

export interface APIErrorState {
  message: string;
  code?: string;
}

export interface ExamplePrompt {
  id: string;
  title: string;
  prompt: string;
  category: 'launch' | 'design' | 'marketing' | 'tech';
  icon: string;
}
