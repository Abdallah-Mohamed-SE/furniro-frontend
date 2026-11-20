<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
# Frontend Engineering Rules (Next.js + React + Tailwind)

## 1. Tech Stack & Architecture
- Framework: Next.js (App Router) with TypeScript (Strict mode).
- Styling: Tailwind CSS exclusively. Do not create `.css` files except `globals.css`.
- Icons: Use `lucide-react` for all icons.

## 2. Component Standards
- Always use Functional Components with named exports (e.g., `export function Navbar() {}`).
- Define explicit TypeScript `interface` for all component props. Never use `any`.
- Keep components small and focused (under 150 lines). Split complex UIs into sub-components inside `src/components/`.
- Default to Server Components. Only add `'use client'` at the very top when the component explicitly requires state (`useState`), effects (`useEffect`), or browser event listeners (`onClick`, `onChange`).

## 3. UI & Responsiveness
- Follow a Mobile-First approach (`base` classes for mobile, `md:` for tablet, `lg:` for desktop).
- Use semantic HTML tags (`<header>`, `<main>`, `<section>`, `<nav>`, `<article>`, `<footer>`).
- Ensure accessibility: include `alt` attributes for images and `aria-label` for icon-only buttons.

## 4. Execution Workflow
- Never write placeholder comments like `// TODO: add logic here`. Write complete, working code.
- Before finishing any task, verify there are no TypeScript or lint errors.