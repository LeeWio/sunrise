# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Standards

**IMPORTANT: Language Requirements**
- **Communication Language:** All conversations, explanations, and discussions with me must be in **中文 (Chinese)**
- **Code Language:** All code, comments, variable names, and technical documentation must be in **English only**
- **Documentation:** All technical documentation, README files, and code comments should be written in English

When explaining concepts, debugging issues, or discussing implementation details, respond in Chinese. When writing or modifying code, use English for all code elements, comments, and documentation.

## Project Overview

This is a modern multimedia blog platform called "sunrise" built with:
- **React 19.2.0** with TypeScript and Next.js 16 App Router
- **HeroUI** (v3.0.0-alpha.35) for UI components
- **Redux Toolkit** with Redux Persist for state management
- **Tailwind CSS v4** for styling
- **TipTap v3.10.1** for rich text editing with extensive extensions
- **next-intl v4.4.0** for internationalization (Chinese/English)
- **music-metadata v11.9.0** for audio processing

### Key Features
- **Rich Text Editor**: Advanced TipTap-based editor with image upload, audio embedding, mathematics (KaTeX), multi-column layouts, and extensive formatting options
- **Music Player**: Integrated audio player with metadata extraction and playback controls
- **Multilingual**: Full Chinese/English internationalization support
- **Modern Architecture**: Server Components compatible with SSR-optimized Redux store

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
├── app/                     # Next.js App Router pages
│   ├── layout.tsx          # Root layout with i18n and font configuration
│   ├── page.tsx            # Home page with rich text editor and music player
│   ├── store-provider.tsx  # Redux store provider for SSR compatibility
│   └── error.tsx           # Error boundary handling
├── components/              # Reusable UI components
│   ├── music-player/       # Audio player with metadata extraction
│   ├── rich-text/          # TipTap-based rich text editor (see DEVELOPMENT_GUIDE.md)
│   │   ├── extensions/     # TipTap extensions (image, audio, math, multi-column)
│   │   ├── menus/          # Editor menus (text, link, content item)
│   │   └─��� panels/         # Editor panels (link editor/preview)
│   ├── icons.tsx           # Icon components collection
│   ├── lang-switch.tsx     # Language switcher (zh/en)
│   └── theme-switch.tsx    # Theme toggle component
├── lib/                    # Core application logic
│   ├── store.ts            # Redux store configuration with SSR support
│   ├── hooks.ts            # Pre-typed Redux hooks
│   └── features/           # Redux feature slices
├── config/                 # Configuration files
│   ├── fonts.ts            # Font optimization configuration
│   └── site.ts             # Site metadata and configuration
├── i18n/                   # Internationalization setup
│   ├── config.ts           # i18n configuration
│   ├── index.ts            # i18n utilities
│   └── request.ts          # Request handling for i18n
├── locales/                # Language files
│   ├── zh.json             # Chinese translations
│   └── en.json             # English translations
├── types/                  # TypeScript type definitions
├── styles/                 # Global styles
│   ├── globals.css         # Tailwind + HeroUI imports + custom CSS
│   └── themes/             # Theme-specific styles
└── public/                 # Static assets
```

### State Management
- Uses **Redux Toolkit** with `combineSlices` for automatic reducer combination
- **Redux Persist** for local state persistence across sessions
- Store is configured for SSR compatibility with `makeStore` function
- Pre-typed hooks exported from `lib/hooks.ts`:
  - `useAppDispatch` - Typed dispatch hook
  - `useAppSelector` - Typed selector hook
  - `useAppStore` - Typed store hook

### Rich Text Editor Architecture
- **TipTap v3.10.1** with ProseMirror core for rich text editing
- **Modular Extension System**: Extensions organized in `components/rich-text/extensions/`
  - Image block and upload functionality
  - Audio embedding and playback
  - Mathematics support with KaTeX rendering
  - Multi-column layouts
  - Link management with preview panels
  - Text formatting and typography
- **Menu System**: Separate menus for text formatting, links, and content items
- **React Integration**: Custom React nodes for TipTap extensions
- **Development Guide**: See `components/rich-text/DEVELOPMENT_GUIDE.md` for detailed editor specifications

### Internationalization
- **next-intl v4.4.0** for comprehensive i18n support
- **Languages**: Chinese (default) and English
- **Dynamic Language Switching**: Runtime language change without page reload
- **SSR Compatible**: Works with Next.js Server Components
- **Configuration**: Centralized in `i18n/` directory with locale files in `locales/`

### Styling
- **Tailwind CSS v4** with custom CSS variables for theming
- **HeroUI** component library imported in global styles
- Dark mode support via `prefers-color-scheme`
- Custom CSS variables: `--background`, `--foreground`

### Fonts
- **Geist Sans** and **Geist Mono** from Next.js font optimization
- Font variables: `--font-geist-sans`, `--font-geist-mono`

## Development Guidelines

### Rich Text Editor Development
- **Reference**: Always consult `components/rich-text/DEVELOPMENT_GUIDE.md` for detailed editor specifications
- **Extension Development**: Create new TipTap extensions in `components/rich-text/extensions/`
- **Custom React Nodes**: Use TipTap's React node integration for complex UI components
- **Menu System**: Follow the existing menu patterns in `components/rich-text/menus/`
- **Styling**: Editor styles are organized in `components/rich-text/styles/`

### Music Player Development
- **Audio Processing**: Uses `music-metadata` library for extracting audio file information
- **State Management**: Player state is managed through Redux with persistence
- **File Support**: Handles common audio formats with metadata extraction
- **UI Components**: Built with HeroUI components and Tailwind CSS styling

### Internationalization Development
- **Translation Files**: Add new translations to `locales/zh.json` and `locales/en.json`
- **Language Switching**: Use the `lang-switch.tsx` component for language toggling
- **Dynamic Content**: Ensure all user-facing text supports i18n
- **Default Language**: Chinese is the default language, English is secondary

## Key Configuration

### Next.js Configuration
- **API Proxy**: Development API requests are proxied to `http://127.0.0.1:8080/api/*`
- **Image Domains**: Configured for `ui-avatars.com` and `heroui.com`
- **TypeScript Build**: Build errors are ignored (use with caution)
- **Internationalization**: Integrated with next-intl plugin

### TypeScript
- Path alias `@/*` maps to project root
- Strict mode enabled
- Target: ES2017
- CSS files included in compilation for Tailwind v4

### Package Management
- **Package Manager**: Uses `pnpm` (recommended for consistency)
- **HeroUI Alpha**: Using alpha version (3.0.0-alpha.35) - expect breaking changes
- **Modern Stack**: React 19 and Next.js 16 with latest ecosystem packages

### Styling Configuration
- **Tailwind CSS v4**: Latest version with atomic CSS approach
- **CSS Variables**: Custom theme variables in `styles/globals.css`
- **HeroUI Integration**: Component styles imported globally
- **Dark Mode**: Supports system preference detection

## Getting Started

1. **Install dependencies**: `pnpm install`
2. **Start development server**: `pnpm dev` (runs on http://localhost:3000)
3. **Build for production**: `pnpm build`
4. **Start production server**: `pnpm start`
5. **Lint code**: `pnpm lint`

The development server includes hot reloading, TypeScript checking, and full internationalization support.