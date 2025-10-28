# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Standards

**IMPORTANT: Language Requirements**
- **Communication Language:** All conversations, explanations, and discussions with me must be in **中文 (Chinese)**
- **Code Language:** All code, comments, variable names, and technical documentation must be in **English only**
- **Documentation:** All technical documentation, README files, and code comments should be written in English

When explaining concepts, debugging issues, or discussing implementation details, respond in Chinese. When writing or modifying code, use English for all code elements, comments, and documentation.

## Project Overview

This is a Next.js 16 project called "sunrise" using:
- **React 19.2.0** with TypeScript
- **HeroUI** (v3.0.0-alpha.35) for UI components
- **Redux Toolkit** for state management
- **Tailwind CSS v4** for styling
- **App Router** structure

## Development Commands

```bash
# Start development server
pnpm dev  # or npm run dev, yarn dev

# Build for production
pnpm build  # or npm run build

# Start production server
pnpm start  # or npm run start

# Lint code
pnpm lint  # or npm run lint
```

## Architecture

### Project Structure
```
sunrise/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout with font configuration
│   └── page.tsx        # Home page
├── lib/                # Core application logic
│   ├── store.ts        # Redux store configuration
│   └── hooks.ts        # Pre-typed Redux hooks
├── styles/             # Global styles
│   └── globals.css     # Tailwind + HeroUI imports + custom CSS
└── public/             # Static assets
```

### State Management
- Uses **Redux Toolkit** with `combineSlices` for automatic reducer combination
- Store is configured for SSR compatibility with `makeStore` function
- Pre-typed hooks exported from `lib/hooks.ts`:
  - `useAppDispatch` - Typed dispatch hook
  - `useAppSelector` - Typed selector hook
  - `useAppStore` - Typed store hook

### Styling
- **Tailwind CSS v4** with custom CSS variables for theming
- **HeroUI** component library imported in global styles
- Dark mode support via `prefers-color-scheme`
- Custom CSS variables: `--background`, `--foreground`

### Fonts
- **Geist Sans** and **Geist Mono** from Next.js font optimization
- Font variables: `--font-geist-sans`, `--font-geist-mono`

## Key Configuration

### TypeScript
- Path alias `@/*` maps to project root
- Strict mode enabled
- Target: ES2017

### Dependencies Note
- HeroUI is in alpha version (3.0.0-alpha.35)
- Uses modern React 19 and Next.js 16 versions

## Getting Started

The project uses `pnpm` as package manager (based on presence of `pnpm-lock.yaml`). Run `pnpm install` to install dependencies, then `pnpm dev` to start development server at http://localhost:3000.