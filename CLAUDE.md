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

## Design and Development Rules (CRITICAL)

### 🚨 MANDATORY Requirements - ALWAYS FOLLOW

These rules are **CRITICAL** and must be followed at all times. They are integrated from `.qoder/rules/` and represent the core development standards for this project.

### 1. HeroUI v3 Components are MANDATORY

**ALWAYS use HeroUI v3 components as the FIRST choice for ANY UI element:**
- ✅ **USE**: HeroUI Button, Card, Input, TextField, Tabs, etc.
- ❌ **NEVER**: Create custom buttons, cards, or form elements from scratch
- ❌ **NEVER**: Use other component libraries (MUI, Ant Design, Chakra, etc.)
- ❌ **NEVER**: Build basic UI components manually unless HeroUI doesn't provide them

#### HeroUI v3 Available Components (34 total)
- **Layout & Structure**: Card, Surface, Separator
- **Forms & Input**: Button, Input, TextField, TextArea, Checkbox, CheckboxGroup, RadioGroup, Switch, Select, Slider, Form, Fieldset, Label, FieldError, Description
- **Navigation**: Tabs, Link, ListBox
- **Feedback**: Alert, Spinner, Skeleton, Tooltip, Popover
- **Data Display**: Avatar, Chip, Kbd
- **Disclosure**: Accordion, Disclosure, DisclosureGroup
- **Specialized**: InputOTP, CloseButton

### 2. Motion (Framer Motion) is MANDATORY for Animations

**ALWAYS use Motion for ANY page animations and transitions:**
- ✅ **USE**: Motion (Framer Motion) for page animations, transitions, gestures
- ✅ **USE**: `motion.div`, `motion()` wrapper for HeroUI components
- ❌ **NEVER**: Use other animation libraries (GSAP, Anime.js, React Spring, etc.)
- ❌ **NEVER**: Use CSS animations for complex page transitions
- ❌ **NEVER**: Build custom animation systems from scratch

**Motion has the SAME priority as HeroUI v3 - both are MANDATORY.**

### 3. HeroUI Design Principles (STRICT)

Follow HeroUI's 10 core principles:
1. **Semantic Intent Over Visual Style** - Use `variant="primary"` not `color="blue"`
2. **Accessibility as Foundation** - Built-in WCAG compliance via React Aria
3. **Composition Over Configuration** - Use compound components (Card.Header, Card.Content)
4. **Progressive Disclosure** - Start simple, add complexity only when needed
5. **Predictable Behavior** - Consistent API across all components
6. **Type Safety First** - Full TypeScript support
7. **Separation of Styles and Logic** - @heroui/styles + @heroui/react
8. **Developer Experience Excellence** - Clear APIs, great IntelliSense
9. **Complete Customization** - CSS variables and BEM classes
10. **Open and Extensible** - Wrap and extend as needed

### 4. Component Usage Rules (MANDATORY)

#### Decision Tree for UI Components
```
需要 UI 组件?
    ↓
HeroUI v3 有这个组件?
    |
    ├─ YES → 使用 HeroUI 组件 ✅ (99% 的情况)
    |
    └─ NO → HeroUI 有类似组件?
           |
           ├─ YES → 使用 HeroUI 组件并定制 ✅
           |
           └─ NO → 能用 HeroUI 基础组件组合实现?
                  |
                  ├─ YES → 组合实现 ✅
                  |
                  └─ NO → 提 issue 给 HeroUI 团队 ⚠️
```

#### Compound Component Pattern (REQUIRED)
```tsx
// ✅ CORRECT - Always use compound pattern
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
  <Card.Content>Content</Card.Content>
</Card>

// ❌ WRONG - Never use flat props
<Card title="Title" description="Description">Content</Card>
```

#### Semantic Variants (REQUIRED)
```tsx
// ✅ CORRECT - Semantic naming
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="tertiary">Skip</Button>

// ❌ WRONG - Visual descriptions
<Button color="blue">Save</Button>
<Button variant="solid">Save</Button>
```

#### Event Handlers (REQUIRED)
```tsx
// ✅ CORRECT - Use onPress for better a11y
<Button onPress={() => handleClick()}>Click</Button>

// ❌ WRONG - Don't use onClick
<Button onClick={() => handleClick()}>Click</Button>
```

### 5. Animation Rules (MANDATORY)

#### Use Motion for Page Animations
```tsx
// ✅ CORRECT - Use Motion for page animations
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// ✅ CORRECT - Wrap HeroUI components with motion()
const MotionCard = motion(Card);
<MotionCard whileHover={{ scale: 1.05 }}>
  <Card.Header>Title</Card.Header>
</MotionCard>
```

#### Animation Priority
| 场景 | 使用工具 | 优先级 |
|------|---------|--------|
| 页面进入/退出动画 | **Motion** | 🔴 MANDATORY |
| 路由过渡动画 | **Motion** | 🔴 MANDATORY |
| 列表项动画(stagger) | **Motion** | 🔴 MANDATORY |
| 手势交互(drag, swipe) | **Motion** | 🔴 MANDATORY |
| 复杂时间线动画 | **Motion** | 🔴 MANDATORY |
| 卡片 hover 效果 | Motion + HeroUI | 🟡 推荐 Motion |
| 组件内置微交互 | HeroUI | ✅ 使用内置 |
| 简单淡入/旋转 | Tailwind | ✅ 可选 |

### 6. Tailwind CSS v4 Expert Rules

#### @apply Directive Usage
- **Use @apply for Tailwind utilities**: Convert properties that have direct Tailwind equivalents
- **Keep custom CSS properties**: Don't convert properties without Tailwind utilities
- **Combine utilities in single @apply**: Group all utilities together
- **Use tw-animate-css for animations**: Leverage the tw-animate-css package for enter/exit animations

```css
/* Good: Use @apply for Tailwind utilities */
.component {
  @apply bg-surface rounded-lg border p-4 shadow-md;

  /* Keep custom CSS for non-utility properties */
  cursor: var(--cursor-interactive);

  /* Complex CSS functions stay as regular CSS */
  text-decoration-color: color-mix(in oklch, var(--link) 50%, transparent);
}
```

#### HeroUI Component CSS Patterns
All HeroUI components MUST follow these patterns:

1. **Default Size Pattern (REQUIRED)**
   - Base class includes default dimensions equivalent to `--md` variant
   - Medium variant (`--md`) is empty with comment: `/* No styles as this is the default size */`
   - Size variants override the base defaults

2. **Interactive State Pattern (REQUIRED)**
   - Support both pseudo-class and data-attribute approaches
   - Use both `:hover` and `[data-hovered="true"]`
   - Use both `:active` and `[data-pressed="true"]`
   - Include comprehensive focus states
   - Use both `:disabled` and `[aria-disabled="true"]`

#### CSS Nesting and Modern Features
- Use native CSS nesting with `&` syntax (no plugins needed in v4)
- Leverage CSS custom properties for theming and dynamic values
- Use modern CSS features like `color-mix()`, `calc()`, and `@property`
- Implement pseudo-selectors and complex state management

### 7. Performance and Accessibility

#### Performance Guidelines
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Image Optimization**: Use modern formats (WebP, AVIF), responsive images, lazy loading
- **Font Optimization**: font-display: swap, subset fonts, variable fonts
- **CSS Optimization**: Remove unused CSS, critical CSS inlining, CSS animations over JS

#### Accessibility Standards
- **WCAG Compliance**: WCAG 2.1 AA minimum, AAA ideal
- **Keyboard Navigation**: All functionality accessible via keyboard
- **Screen Reader Support**: Semantic HTML, proper ARIA labels
- **Color Contrast**: 4.5:1 for normal text, 3:1 for large text

### 8. Code Quality Standards

#### Code Review Requirements
Code reviews MUST reject:
- Any non-HeroUI UI components
- Any non-Motion animation libraries (GSAP, Anime.js, React Spring, etc.)
- Custom buttons, cards, inputs, etc.
- Usage of other component libraries
- Flat props instead of compound components
- `onClick` instead of `onPress`
- Visual variants instead of semantic variants
- CSS animations for complex page transitions (use Motion instead)

#### Best Practices
- **Server Components First**: Use Server Components when possible
- **Type Safety**: Leverage full TypeScript support
- **Consistent Spacing**: Use Tailwind's spacing system (based on 4px)
- **Semantic HTML**: Use proper HTML elements for accessibility
- **Error Handling**: Implement comprehensive error boundaries

---

## Design Philosophy

### Vision

创建一个优雅、易用、高性能的个人网站,通过简洁的设计语言传达内容价值,让每一位访客都能获得愉悦的阅读体验。

### Core Values

1. **内容至上 (Content First)**
   - 设计服务于内容,而非喧宾夺主
   - 优化阅读体验是首要目标
   - 视觉元素应引导而非干扰阅读流程

2. **简洁明了 (Clarity Over Complexity)**
   - 拒绝过度设计,追求功能性美学
   - 每个设计决策都应有明确目的
   - 简单不等于简陋,而是精心提炼的结果

3. **渐进增强 (Progressive Enhancement)**
   - 确保基础功能在所有设备上可用
   - 为现代浏览器提供增强体验
   - 优雅降级,永不牺牲核心功能

4. **无障碍优先 (Accessibility First)**
   - 设计应服务于所有用户,无论其能力如何
   - WCAG AA 标准是底线,AAA 是目标
   - 键盘导航、屏幕阅读器支持不是附加功能

5. **性能为王 (Performance Matters)**
   - 快速加载是最佳的用户体验
   - 美丽的设计若加载缓慢则毫无意义
   - 优化每一个字节,珍惜用户时间