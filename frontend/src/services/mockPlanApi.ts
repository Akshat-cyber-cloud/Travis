import { PlanData, APIErrorState, PlanStyleOption } from '../types/plan';

/**
 * Mock API Service simulating real-world asynchronous AI plan generation.
 * Handles latency, realistic responses, empty responses, and error conditions.
 */

const PRESET_PLANS: Record<string, Omit<PlanData, 'id' | 'createdAt'>> = {
  default: {
    title: 'Mobile App Launch Plan',
    description: 'A comprehensive step-by-step roadmap for publishing your application to store listings and launching your initial marketing push.',
    steps: [
      {
        id: 'step-1',
        title: 'Prepare launch assets & store metadata',
        description: 'Finalize app icons, screenshots, promo videos, privacy policy, and store descriptions.',
        status: 'pending',
        estimatedTime: '2 Days',
      },
      {
        id: 'step-2',
        title: 'Submit build to iOS App Store & Google Play',
        description: 'Prepare production release builds, configure submission checklists, and submit for review.',
        status: 'pending',
        estimatedTime: '1 Day',
      },
      {
        id: 'step-3',
        title: 'Execute product launch marketing campaign',
        description: 'Publish blog announcement, broadcast email newsletter, and share on social media channels.',
        status: 'pending',
        estimatedTime: '3 Days',
      },
      {
        id: 'step-4',
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
        id: 'step-101',
        title: 'Audit existing visual hierarchy & tokens',
        description: 'Document current color palettes, typography scales, and button variant inconsistencies.',
        status: 'pending',
        estimatedTime: '1 Day',
      },
      {
        id: 'step-102',
        title: 'Build reusable core React components',
        description: 'Create responsive UI buttons, input fields, modal overlays, and skeleton loaders.',
        status: 'pending',
        estimatedTime: '4 Days',
      },
      {
        id: 'step-103',
        title: 'Conduct WCAG AA accessibility audit',
        description: 'Ensure color contrast, keyboard navigation, aria-labels, and focus indicators comply.',
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
        id: 'step-201',
        title: 'Optimize high-intent landing page copy',
        description: 'A/B test headline copy, CTA placements, customer testimonials, and feature highlights.',
        status: 'pending',
        estimatedTime: '2 Days',
      },
      {
        id: 'step-202',
        title: 'Launch viral referral program',
        description: 'Implement invite rewards for existing active users to invite teammates.',
        status: 'pending',
        estimatedTime: '5 Days',
      },
    ],
  },
};

export class MockPlanApiService {
  /**
   * Simulates generating a structured plan from a natural language request.
   * Supports artificial delay, optional simulated error state, empty response state, and style variants.
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
    const delay = options?.delayMs ?? 3000;

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

    // Match prompt keywords or fallback to default
    const lowerPrompt = prompt.toLowerCase();
    let template = PRESET_PLANS.default;

    if (lowerPrompt.includes('design') || lowerPrompt.includes('ui') || lowerPrompt.includes('redesign')) {
      template = PRESET_PLANS.design;
    } else if (lowerPrompt.includes('marketing') || lowerPrompt.includes('growth') || lowerPrompt.includes('email')) {
      template = PRESET_PLANS.marketing;
    }

    const selectedStyle = options?.style || 'standard';
    let styleTitleSuffix = '';
    if (selectedStyle === 'detailed') styleTitleSuffix = ' (Detailed Roadmap)';
    if (selectedStyle === 'agile') styleTitleSuffix = ' (Agile Sprint Plan)';

    return {
      id: `plan-${Date.now()}`,
      title: `${template.title}${styleTitleSuffix}`,
      description: template.description,
      createdAt: new Date().toISOString(),
      style: selectedStyle,
      steps: template.steps.map((step) => ({ ...step, status: 'pending' })), // Initial pending state for review
    };
  }
}
