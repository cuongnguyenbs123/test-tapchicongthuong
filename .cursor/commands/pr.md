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
    }
  ]
}
