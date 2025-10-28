{
  "commands": [
    {
      "name": "Review Pull Request Description",
      "description": "Check the PR description for clarity, completeness, and professionalism.",
      "prompt": "Please review the following pull request description. Check if it clearly explains what was changed, why it was changed, and how to test it. Suggest improvements in tone, clarity, or structure if necessary.\n\n{{selection}}"
    },
    {
      "name": "Rewrite PR in Professional Tone",
      "description": "Rewrite the PR content in a clear, professional, and concise style.",
      "prompt": "Rewrite the following pull request description in a professional, concise, and developer-friendly tone. Preserve technical accuracy but improve readability and flow.\n\n{{selection}}"
    },
    {
      "name": "Summarize PR Changes",
      "description": "Summarize the main changes in this pull request.",
      "prompt": "Summarize the key changes and intentions of the following pull request description. Present it as a clear, bullet-point summary suitable for reviewers.\n\n{{selection}}"
    },
    {
      "name": "Add Test Instructions",
      "description": "Add or improve test steps in the PR.",
      "prompt": "Review the following PR text and add clear, step-by-step testing instructions (how to verify the changes). If some are missing, create them.\n\n{{selection}}"
    },
    {
      "name": "Improve Commit Messages",
      "description": "Refine commit messages for better readability and consistency.",
      "prompt": "Rewrite the following commit messages or changelog entries to follow conventional commit style (e.g., feat:, fix:, refactor:), keeping them concise and meaningful.\n\n{{selection}}"
    },
    {
      "name": "Add Release Notes",
      "description": "Generate release notes based on PR content.",
      "prompt": "Based on the following PR description or changelog, generate a short and clear release note entry (summary of key updates or fixes).\n\n{{selection}}"
    },
    {
      "name": "Detect Missing Context",
      "description": "Check if important context or links are missing in the PR description.",
      "prompt": "Analyze the following PR text and identify if any context is missing (e.g., issue links, screenshots, or reasons for changes). Suggest what to add for clarity.\n\n{{selection}}"
    },
    {
      "name": "Grammar and Style Check",
      "description": "Check grammar, spelling, and tone for professional English.",
      "prompt": "Check the following text for grammar, spelling, and tone issues. Fix any mistakes and rewrite awkward sentences while keeping the meaning unchanged.\n\n{{selection}}"
    },
    {
      "name": "Generate PR Template",
      "description": "Create a well-structured PR template.",
      "prompt": "Generate a clean and professional pull request template in Markdown with sections for description, motivation, changes, testing steps, and screenshots."
    },
    {
      "name": "Review React Component",
      "description": "Review React component code for best practices, hooks usage, and performance.",
      "prompt": "Review this React component code. Check for: proper hooks usage, performance issues (unnecessary re-renders, missing memoization), prop types/TypeScript types, code structure, and React best practices. Suggest improvements.\n\n{{selection}}"
    },
    {
      "name": "Check Accessibility",
      "description": "Analyze code for accessibility (a11y) issues and WCAG compliance.",
      "prompt": "Analyze this code for accessibility issues. Check for: proper ARIA attributes, keyboard navigation, color contrast, semantic HTML, focus management, and WCAG compliance. Suggest specific improvements.\n\n{{selection}}"
    },
    {
      "name": "Optimize CSS/Tailwind",
      "description": "Review and optimize CSS or Tailwind classes for best practices.",
      "prompt": "Review and optimize this CSS or Tailwind code. Check for: unused styles, proper responsive breakpoints, CSS specificity issues, modern CSS features, and performance. Suggest improvements with explanations.\n\n{{selection}}"
    },
    {
      "name": "Performance Audit",
      "description": "Identify performance bottlenecks and optimization opportunities.",
      "prompt": "Analyze this code for performance issues. Look for: heavy re-renders, large bundle sizes, inefficient algorithms, memory leaks, unnecessary DOM manipulations, and lazy loading opportunities. Provide actionable recommendations.\n\n{{selection}}"
    },
    {
      "name": "Mobile Responsive Check",
      "description": "Review responsiveness across different screen sizes.",
      "prompt": "Review this code for mobile responsiveness. Check for: proper viewport settings, responsive units (rem, %, vw/vh), media queries, flexible layouts, touch-friendly interactions, and mobile-first approach. Suggest improvements for tablets and mobile devices.\n\n{{selection}}"
    },
    {
      "name": "Fix TypeScript Errors",
      "description": "Fix TypeScript type errors and improve type safety.",
      "prompt": "Review and fix TypeScript errors in this code. Improve type definitions, add proper interfaces, fix type narrowing issues, and enhance type safety while maintaining functionality.\n\n{{selection}}"
    },
    {
      "name": "Debug Console Errors",
      "description": "Help debug JavaScript/console errors.",
      "prompt": "Analyze this code and the console error message. Identify the root cause, explain why the error occurs, and provide a fixed version with clear comments explaining the solution.\n\nError: {{selection}}"
    },
    {
      "name": "Review API Integration",
      "description": "Review API calls and data fetching logic.",
      "prompt": "Review this API integration code. Check for: proper error handling, loading states, caching strategy, request optimization, data validation, and security (headers, CORS). Suggest improvements.\n\n{{selection}}"
    },
    {
      "name": "Optimize State Management",
      "description": "Review and improve state management (Context, Redux, Zustand, etc.).",
      "prompt": "Review this state management code. Check for: unnecessary re-renders, proper state structure, efficient updates, selector optimizations, and architectural patterns. Suggest improvements for better performance and maintainability.\n\n{{selection}}"
    },
    {
      "name": "Add Error Boundaries",
      "description": "Add React error boundary to component.",
      "prompt": "Add proper error handling and error boundaries to this React component. Include fallback UI for graceful error display and user experience.\n\n{{selection}}"
    },
    {
      "name": "Convert to TypeScript",
      "description": "Convert JavaScript code to TypeScript with proper types.",
      "prompt": "Convert this JavaScript code to TypeScript. Add proper type annotations, interfaces, and type safety while maintaining all functionality.\n\n{{selection}}"
    },
    {
      "name": "Generate Component Tests",
      "description": "Generate unit tests for a React component.",
      "prompt": "Generate comprehensive unit tests for this React component using React Testing Library. Include tests for user interactions, edge cases, and accessibility.\n\n{{selection}}"
    },
    {
      "name": "Add Loading States",
      "description": "Add proper loading and skeleton states to components.",
      "prompt": "Add loading states, skeleton screens, and loading indicators to this component. Ensure smooth user experience during data fetching and async operations.\n\n{{selection}}"
    },
    {
      "name": "Refactor Component",
      "description": "Refactor component for better readability and maintainability.",
      "prompt": "Refactor this component to improve code quality. Extract smaller components, remove code duplication, improve naming, and enhance maintainability while keeping the same functionality.\n\n{{selection}}"
    }
  ]
}
