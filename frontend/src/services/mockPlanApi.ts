import { PlanData, APIErrorState, PlanStyleOption, PlanStep } from '../types/plan';

/**
 * Mock API Service simulating real-world asynchronous AI plan generation.
 * Classifies user prompt text, synthesizes custom/preset roadmaps, and handles async resolution.
 */

const PRESET_PLANS: Record<string, { title: string; description: string; steps: Omit<PlanStep, 'id'>[] }> = {
  launch: {
    title: 'Mobile App Launch Plan',
    description: 'A comprehensive step-by-step roadmap for publishing your application to store listings and launching your initial marketing push.',
    steps: [
      {
        title: 'Prepare launch assets & store metadata',
        description: 'Finalize app icons, screenshots, promo videos, privacy policy, and store descriptions.',
        status: 'pending',
        estimatedTime: '2 Days',
      },
      {
        title: 'Submit build to iOS App Store & Google Play',
        description: 'Prepare production release builds, configure submission checklists, and submit for review.',
        status: 'pending',
        estimatedTime: '1 Day',
      },
      {
        title: 'Execute product launch marketing campaign',
        description: 'Publish blog announcement, broadcast email newsletter, and share on social media channels.',
        status: 'pending',
        estimatedTime: '3 Days',
      },
      {
        title: 'Monitor telemetry, feedback & analytics',
        description: 'Track real-time crash reports, user signups, server load, and early reviews.',
        status: 'pending',
        estimatedTime: 'Ongoing',
      },
    ],
  },
  design: {
    title: 'Design System & UI Redesign',
    description: 'Structured roadmap for updating component library tokens, accessibility compliance, and design patterns.',
    steps: [
      {
        title: 'Audit existing visual hierarchy & tokens',
        description: 'Document current color palettes, typography scales, and button variant inconsistencies.',
        status: 'pending',
        estimatedTime: '1 Day',
      },
      {
        title: 'Build reusable core React components',
        description: 'Create responsive UI buttons, input fields, modal overlays, and skeleton loaders.',
        status: 'pending',
        estimatedTime: '4 Days',
      },
      {
        title: 'Conduct WCAG AA accessibility audit',
        description: 'Ensure color contrast, keyboard navigation, aria-labels, and focus indicators comply.',
        status: 'pending',
        estimatedTime: '2 Days',
      },
      {
        title: 'Publish design system documentation',
        description: 'Document component APIs, usage guidelines, and interactive storybook previews.',
        status: 'pending',
        estimatedTime: '2 Days',
      },
    ],
  },
  marketing: {
    title: 'Q4 Product Growth & Outreach Strategy',
    description: 'Multi-channel acquisition strategy focusing on content marketing, SEO optimization, and user referrals.',
    steps: [
      {
        title: 'Optimize high-intent landing page copy',
        description: 'A/B test headline copy, CTA placements, customer testimonials, and feature highlights.',
        status: 'pending',
        estimatedTime: '2 Days',
      },
      {
        title: 'Launch viral referral program',
        description: 'Implement invite rewards for existing active users to invite teammates.',
        status: 'pending',
        estimatedTime: '5 Days',
      },
      {
        title: 'Execute targeted search & social ads',
        description: 'Set up conversion tracking, define target personas, and allocate initial ad budget.',
        status: 'pending',
        estimatedTime: '3 Days',
      },
    ],
  },
  tech: {
    title: 'Tech Stack & Architecture Upgrade',
    description: 'Engineering plan for refactoring core modules to TypeScript 5, React 19, and optimized build pipelines.',
    steps: [
      {
        title: 'Perform static analysis & type audit',
        description: 'Identify implicit any types, broken interfaces, and deprecated library dependencies.',
        status: 'pending',
        estimatedTime: '2 Days',
      },
      {
        title: 'Migrate core application modules',
        description: 'Refactor state management hooks, API services, and page components to strict TypeScript.',
        status: 'pending',
        estimatedTime: '5 Days',
      },
      {
        title: 'Optimize build bundling & lazy loading',
        description: 'Configure Vite code splitting, dynamic imports, and static asset caching headers.',
        status: 'pending',
        estimatedTime: '2 Days',
      },
    ],
  },
};

export class MockPlanApiService {
  /**
   * Classifies user raw text input and generates a tailored plan.
   * Step 4 requirement:
   * - Matches keywords to preset templates if applicable.
   * - Falls through to a personalized custom plan embedding user text if unmatched.
   */
  static async generatePlan(
    prompt: string,
    options?: {
      forceError?: boolean;
      forceEmpty?: boolean;
      delayMs?: number;
      style?: PlanStyleOption;
    }
  ): Promise<PlanData> {
    const delay = options?.delayMs ?? 2800;

    await new Promise((resolve) => setTimeout(resolve, delay));

    if (options?.forceError) {
      throw {
        message: 'Unable to reach Travis AI engine. Please check your connection and try again.',
        code: 'SERVICE_UNAVAILABLE',
      } as APIErrorState;
    }

    if (options?.forceEmpty) {
      return {
        id: `plan-${Date.now()}`,
        title: `Plan for "${prompt}"`,
        description: 'No detailed steps could be automatically inferred for this request. Feel free to add custom steps below.',
        createdAt: new Date().toISOString(),
        style: options?.style || 'standard',
        steps: [],
      };
    }

    const lowerPrompt = prompt.toLowerCase();
    let templateData: { title: string; description: string; steps: Omit<PlanStep, 'id'>[] };

    // Step 4: Classify prompt via keyword analysis
    if (
      lowerPrompt.includes('mobile') ||
      lowerPrompt.includes('app') ||
      lowerPrompt.includes('launch') ||
      lowerPrompt.includes('publishing') ||
      lowerPrompt.includes('store') ||
      lowerPrompt.includes('ios') ||
      lowerPrompt.includes('android')
    ) {
      templateData = PRESET_PLANS.launch;
    } else if (
      lowerPrompt.includes('design') ||
      lowerPrompt.includes('ui') ||
      lowerPrompt.includes('component') ||
      lowerPrompt.includes('system') ||
      lowerPrompt.includes('redesign') ||
      lowerPrompt.includes('token')
    ) {
      templateData = PRESET_PLANS.design;
    } else if (
      lowerPrompt.includes('marketing') ||
      lowerPrompt.includes('growth') ||
      lowerPrompt.includes('strategy') ||
      lowerPrompt.includes('q4') ||
      lowerPrompt.includes('acquisition') ||
      lowerPrompt.includes('campaign') ||
      lowerPrompt.includes('seo')
    ) {
      templateData = PRESET_PLANS.marketing;
    } else if (
      lowerPrompt.includes('tech') ||
      lowerPrompt.includes('stack') ||
      lowerPrompt.includes('refactor') ||
      lowerPrompt.includes('upgrade') ||
      lowerPrompt.includes('typescript') ||
      lowerPrompt.includes('react') ||
      lowerPrompt.includes('codebase')
    ) {
      templateData = PRESET_PLANS.tech;
    } else {
      // Step 4 Fallthrough: Personalize unmatched custom input using user's actual text
      const cleanPromptSnippet = prompt.length > 50 ? `${prompt.substring(0, 50)}...` : prompt;
      const capitalizedSnippet = cleanPromptSnippet.charAt(0).toUpperCase() + cleanPromptSnippet.slice(1);

      templateData = {
        title: `Roadmap: ${capitalizedSnippet}`,
        description: `Tailored execution strategy synthesized for "${prompt}". Formulated to systematically accomplish your goal.`,
        steps: [
          {
            title: `Phase 1: Requirements analysis & scope definition`,
            description: `Audit key objectives, dependencies, and success criteria for "${cleanPromptSnippet}".`,
            status: 'pending',
            estimatedTime: '1 Day',
          },
          {
            title: `Phase 2: Core implementation & execution`,
            description: `Execute foundational modules and workflow logic tailored to ${cleanPromptSnippet}.`,
            status: 'pending',
            estimatedTime: '3 Days',
          },
          {
            title: `Phase 3: Validation, testing & verification`,
            description: `Conduct functional testing, edge-case checks, and quality assurance review.`,
            status: 'pending',
            estimatedTime: '2 Days',
          },
          {
            title: `Phase 4: Final deployment & workspace integration`,
            description: `Deploy completed deliverables to production environment and collect feedback metrics.`,
            status: 'pending',
            estimatedTime: '1 Day',
          },
        ],
      };
    }

    const selectedStyle = options?.style || 'standard';
    let styleTitleSuffix = '';
    if (selectedStyle === 'detailed') styleTitleSuffix = ' (Detailed Roadmap)';
    if (selectedStyle === 'agile') styleTitleSuffix = ' (Agile Sprint Plan)';

    return {
      id: `plan-${Date.now()}`,
      title: `${templateData.title}${styleTitleSuffix}`,
      description: templateData.description,
      createdAt: new Date().toISOString(),
      style: selectedStyle,
      steps: templateData.steps.map((step, idx) => ({
        id: `step-${Date.now()}-${idx + 1}`,
        ...step,
      })),
    };
  }

  /**
   * Finalize and register confirmed plan (Step 7)
   */
  static async confirmPlan(plan: PlanData): Promise<{ success: boolean; confirmedAt: string }> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      success: true,
      confirmedAt: new Date().toISOString(),
    };
  }
}

