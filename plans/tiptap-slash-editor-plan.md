# Tiptap + Slash Command Editor Integration Plan

Below is the step-by-step checklist we will follow. Tick each box as you complete the task.

- [X] **Add Tiptap packages** (`@tiptap/react`, `@tiptap/starter-kit`, plus slash-command extension or custom implementation).
- [X] **Create `RichTextEditor` wrapper component** in `src/components/editor/` that initializes Tiptap with required extensions.
- [X] **Implement / configure Slash Command extension** (community package or custom) with a pop-over command palette.
- [X] **Hook `RichTextEditor` into existing `FormattingToolbar`** so toolbar buttons invoke editor commands.
- [X] **Insert editor into left pane** of `src/app/instructions-editor/page.tsx`, replacing the placeholder.
- [X] **Provide TypeScript types & helpers** (e.g., `SlashCommandItem`, utility commands).
- [X] **Update Tailwind/theme tokens** for editor elements and slash-palette styling.
- [ ] **Integrate autosave logic** using Tiptap `onUpdate`, respecting `isAutosave` toggle.
- [ ] **Ensure accessibility & keyboard navigation** for slash palette and toolbar controls.
- [ ] **Quality Assurance**: add Storybook story and integration tests (Playwright/Cypress).
- [ ] **Update documentation** (README or internal docs) explaining editor usage and extension guidelines.
- [ ] **Optional polishing & enhancements**: analytics events, emoji autocomplete, collaborative editing support. 