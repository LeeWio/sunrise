# Sunrise - Personal Life Log

Sunrise is a personal website system designed to record every aspect of life. It is built to be a long-term, evolving platform with diverse features and interfaces.

## Vibe Coding Philosophy

- **Aesthetic & Modern**: Every UI element should feel polished and deliberate.
- **Fluid Transitions**: Use Motion for smooth, meaningful animations.
- **Robust State**: Leverage Redux and RTK Query for predictable state and data management.
- **Rich Interaction**: Tiptap provides a powerful, extensible writing experience.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Components**: [HeroUI v3](https://v3.heroui.com/) (React Aria + Tailwind CSS v4)
- **CSS**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Rich Text Editor**: [Tiptap](https://tiptap.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Data Fetching**: [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- **Animations**: [Motion](https://www.framer.com/motion/) (formerly Framer Motion)

## Project Structure & Conventions

- **Components**: Follow HeroUI's design patterns.
- **Styling**: Use Tailwind v4 utilities. Avoid custom CSS unless necessary.
- **State**: Centralized Redux store with sliced logic.
- **API**: RTK Query services for all data fetching.

## Development Rules (CRITICAL)

### 1. UI Components (HeroUI v3)

**NEVER write custom UI components from scratch if a HeroUI component exists.**

- **Mandatory Skill**: Always refer to `@.gemini/skills/heroui-react/**`.
- **Workflow**:
  1.  **Search**: Check available components (`node scripts/list_components.mjs`).
  2.  **Learn**: Read the documentation (`node scripts/get_component_docs.mjs ComponentName`).
  3.  **Implement**: Use the component following v3 patterns (compound components, no provider).

**Animations with Motion & HeroUI:**

When you need to animate HeroUI components (like Buttons), **DO NOT** wrap them in a `motion.div`. Instead, convert the HeroUI component into a motion component:

```typescript
import { motion } from 'motion/react';
import { Button } from '@heroui/react';

// Create a motion-enhanced version of the HeroUI component
const MotionButton = motion(Button);

// Use it with all standard Motion props
<MotionButton
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Animated Button
</MotionButton>
```

### 2. React Best Practices

**All React code must be performant and standardized.**

- **Mandatory Skill**: Always refer to `@.gemini/skills/vercel-react-best-practices/**`.
- **Key Areas**:
  - Server/Client Components usage.
  - Rendering performance (minimizing re-renders).
  - Data fetching strategies.
  - Bundle size optimization.

### 3. Redux & State Management

**Maintain a predictable and type-safe state.**

- **Mandatory Skill**: Always refer to `@.gemini/skills/redux-toolkit/BEST_PRACTICES.md` and `@.gemini/skills/redux-toolkit/**`.
- **Workflow**:
  - **Slice**: Use `createSlice` for feature-based state logic.
  - **Data Fetching**: PREFER **RTK Query** over `useEffect` or `createAsyncThunk` for API interactions.
  - **Typed Hooks**: ALWAYS use `useAppDispatch` and `useAppSelector`.
  - **Selectors**: Use `createSelector` for memoized derived state.

### 4. Web Design

**Ensure high-quality UX/UI.**

- **Mandatory Skill**: Always refer to `@.gemini/skills/web-design-guidelines/**`.
- **Goal**: Professional, accessible, and consistent design.

### 5. Git Workflow

**Maintain a clean and structured history.**

- **Mandatory Skill**: Always refer to `@.gemini/skills/git-workflow/**`.
- **Standards**:
  - **Commits**: Use Conventional Commits (`type(scope): subject`).
  - **Branches**: `type/ticket-description`.
  - **PRs**: Follow the template with clear summaries and test plans.

## Developer Guidelines

- Prioritize accessibility and performance.
- Use TypeScript strictly.
- Ensure all new features are documented here or in relevant sub-READMEs.
