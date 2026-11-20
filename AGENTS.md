<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
# Frontend Engineering Rules — Production E-Commerce Storefront

## 1. Tech Stack & Architecture
- Framework: Next.js (App Router) with TypeScript (Strict mode).
- Design System: All components and pages MUST strictly adhere to the Furniro design system defined in `DESIGN_SYSTEM.md` (colors `#B88E2F`, `#FFF3E3`, `#F4F5F7`, `#3A3A3A`, spacing, and typography).
- Styling: Tailwind CSS exclusively. Do not create `.css` files except `globals.css`.
- Icons: Use `lucide-react` for all icons.
- Language & Direction: Arabic RTL (`lang="ar" dir="rtl"`). All UI copy is in Arabic.

## 2. Component Standards
- Always use Functional Components with named exports (e.g., `export function Navbar() {}`).
- **Exception:** Page and layout files (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`) MUST use `export default function`.
- Define explicit TypeScript `interface` for all component props. Never use `any`.
- Keep components small and focused (under 150 lines). Split complex UIs into sub-components inside `src/components/`.
- Default to Server Components. Only add `'use client'` at the very top when the component explicitly requires state (`useState`), effects (`useEffect`), or browser event listeners (`onClick`, `onChange`).

## 3. UI & Responsiveness
- Follow a Mobile-First approach (`base` classes for mobile, `md:` for tablet, `lg:` for desktop).
- Use semantic HTML tags (`<header>`, `<main>`, `<section>`, `<nav>`, `<article>`, `<footer>`).
- Ensure accessibility: include `alt` attributes for images and `aria-label` for icon-only buttons. Add `aria-hidden="true"` to decorative icons.

## 4. E-Commerce Architecture Rules
- **Product URLs:** Always use `slug` (not `id`) for product page routes: `/products/[slug]`.
- **Network Layer:** All API fetch calls go in `src/services/`. Never call `fetch()` directly inside a component or page.
- **API Client:** Use `src/lib/api-client.ts` for all HTTP requests. It reads `NEXT_PUBLIC_API_URL` from env and attaches `Authorization: Bearer <token>` automatically.
- **Cart State:** Manage cart state exclusively via `src/context/CartContext.tsx`. Never store cart data in local component state.
- **Fallback Mock Data:** Every service function must gracefully fall back to realistic mock data when the Laravel API is unavailable (e.g., during local development before the backend is ready). The UI must always be runnable without a live backend.
- **Environment Variables:** API base URL is set in `.env.local` as `NEXT_PUBLIC_API_URL=http://localhost:8000/api`.

## 5. File & Folder Structure
```
src/
  app/              # Next.js App Router pages & layouts
  components/
    ui/             # Small reusable primitives (Button, Card, Badge, …)
    sections/       # Large page sections (Navbar, Footer, Hero, …)
    cart/           # Cart-specific components (CartDrawer, CartItem, …)
  context/          # React Contexts (CartContext)
  lib/              # Shared utilities (api-client.ts, utils.ts, …)
  services/         # Network/API calls (product.service.ts, order.service.ts, …)
  types/            # Shared TypeScript interfaces (product.ts, cart.ts, order.ts, user.ts)
  data/             # Fallback mock data only (products.ts, …)
```

## 6. Execution Workflow
- Never write placeholder comments like `// TODO: add logic here`. Write complete, working code.
- Before finishing any task, verify there are no TypeScript or lint errors.
- Run `npm run build` to confirm a clean production build before marking a task done.
