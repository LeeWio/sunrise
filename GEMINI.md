# Project Vision

**Crucial AI Context:** This project is *not* a standard, static personal blog. It is envisioned as a dynamic, multifaceted personal digital space and a vibrant living record. Architecture, design, and feature suggestions must remain flexible, highly interactive, and capable of supporting a diverse, ever-evolving set of features.

Key aspects of the vision include:
*   **A Living Space:** A place to capture and share daily life and spontaneous moments, akin to a personal social feed or "Moments" (朋友圈).
*   **Tech & Knowledge Hub:** A forum-like area dedicated to technical sharing, deep dives, and ideas.
*   **Interactive Experiences:** The platform is designed to be extensible and may eventually house interactive features like a built-in music player, or even custom mini-games developed by the author.

# Project Overview

This is a web application bootstrapped with `create-next-app`. It is built using the following core technologies:

*   **Framework:** [Next.js](https://nextjs.org/) (Version 16.2+) utilizing the modern App Router (`app/` directory paradigm).
*   **UI Library:** [React](https://react.dev/) (Version 19+).
*   **Component Library:** [HeroUI](https://heroui.com/docs/react/getting-started) for accessible, customizable, and modern React UI components (Refer to `AGENTS.md` for specific rules and documentation).
*   **Language:** [TypeScript](https://www.typescriptlang.org/) for strong typing and developer tooling.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4) for utility-first styling.
*   **Package Manager:** [Bun](https://bun.sh/) (indicated by the presence of `bun.lock`).
*   **State Management:** [Redux Toolkit (RTK)](https://redux-toolkit.js.org/) MUST be used as the exclusive state management solution.
*   **Data Fetching:** [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) MUST be used as the exclusive data fetching framework for backend communication.
*   **Rich Text Editor:** [Tiptap](https://tiptap.dev/docs/editor/getting-started/overview) for the core text editing and rich content experience (Refer to its local skill in `.agents/skills/tiptap/SKILL.md`).
*   **Icons:** [`@gravity-ui/icons`](https://gravity-ui.com/icons) MUST be used as the exclusive and standard icon library. If an icon is missing from this library, do NOT install or use other icon libraries (e.g., Lucide, Heroicons). The user will provide the necessary custom icons.

## Building and Running

Since the project uses Bun, it is recommended to use it for running scripts and managing dependencies.

*   **Development Server:** Start the local development server with Hot Module Replacement (HMR).
    ```bash
    bun dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

*   **Production Build:** Create an optimized production build of the application.
    ```bash
    bun run build
    ```

*   **Start Production Server:** Run the built application.
    ```bash
    bun start
    ```

*   **Linting:** Run ESLint to analyze the code for potential errors and styling issues.
    ```bash
    bun run lint
    ```

## Development Conventions

*   **Styling:** Styling is heavily reliant on Tailwind CSS utility classes directly within the JSX/TSX components. Global styles and Tailwind configuration are initialized in `styles/globals.css`.
*   **Fonts & Images:** Utilizes Next.js built-in optimizations like `next/font/google` (using the Geist font family) and the `next/image` component for optimized asset loading.
*   **Components:** Prefers functional React components. Server Components are the default in the Next.js App Router unless explicitly marked with `"use client"`.

### Directory Structure (Strict Rules)

To maintain a scalable and manageable codebase for this multifaceted platform, the following directory structure and its rules are **strictly enforced**. AI agents must adhere to these boundaries when creating or modifying files:

*   **`app/`**: *Exclusively* for Next.js App Router files (`page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`, etc.). This layer handles routing, data fetching at the page level, and metadata. **Do not** place reusable UI components or complex business logic directly in here.
*   **`components/`**: For global, highly reusable UI components (e.g., custom wrappers around HeroUI components, generic buttons, layout shells). Components here must be domain-agnostic and usable anywhere in the app.
*   **`features/`**: The core architectural pattern. Domain-specific logic must be encapsulated here (e.g., `features/moments`, `features/music-player`, `features/tech-hub`). Each feature directory should contain its own `components`, `hooks`, `utils`, and `api` relevant only to that feature, preventing a messy global scope.
*   **`lib/` (or `utils/`)**: For global utility functions, constants, formatting scripts, and third-party library configurations (e.g., database clients, fetch wrappers) that are completely independent of UI or specific domains.
*   **`hooks/`**: For global, reusable React hooks (e.g., `useWindowSize`, `useLocalStorage`). Feature-specific hooks belong in `features/<feature-name>/hooks/`.
*   **`types/`**: Global TypeScript types, interfaces, and enums.
*   **`styles/`**: For global stylesheets, Tailwind CSS custom configurations, or complex animations that cannot be easily managed inline. Component-specific styles should still prioritize inline Tailwind utility classes.
*   **`public/`**: Static assets like images, icons, and fonts that are served directly to the browser.
*   **`store/`** *(if applicable)*: Global state management definitions (e.g., Zustand stores, Context Providers).

## AI Agent Instructions

*   **External Library Rules:** ALWAYS consult `AGENTS.md` before making assumptions about external libraries (such as Next.js and HeroUI). `AGENTS.md` contains crucial project-specific rules, breaking changes, deprecation notices, and documentation indices that override your standard training data. Must strictly adhere to the instructions within it.
*   **HeroUI Configuration:** The HeroUI styles are already configured via `@import "@heroui/styles";` in `styles/globals.css`. **DO NOT** add any further HeroUI configuration (e.g., Tailwind plugins, extra imports) to the project, and **NEVER** modify or remove that import line in `styles/globals.css`.
*   **Tiptap Integration:** When implementing or modifying the rich text editor, **ALWAYS** consult the local skill instructions at `.agents/skills/tiptap/SKILL.md` (e.g., for versioning rules, best practices, and integration guides).
