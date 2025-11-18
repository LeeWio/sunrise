---
trigger: always_on
alwaysApply: true
---
# Modern Personal Website Design Standard (2024-2025)

**A Comprehensive Design System for Contemporary Web Experiences**

This document establishes the design language, visual principles, and interaction patterns for creating a world-class personal website. Inspired by industry leaders (Apple, Vercel, Linear, Stripe, Figma), this standard represents the cutting edge of web design in 2024-2025.

---

## Core Design Philosophy

### 1. **Intentional Brutalism Meets Minimalism**

**Modern minimalism isn't about removing everything—it's about being bold with what remains.**

- **Oversized Typography as Interface**: Text isn't decoration; it's the primary visual element. Hero titles should dominate the screen (100px-200px font size on desktop).
- **Dramatic Whitespace**: Generous spacing (80-200px vertical gaps between sections) creates breathing room and hierarchy.
- **Asymmetric Layouts**: Break the grid intentionally. Off-center elements, unexpected alignments, and deliberate imbalance create visual tension.
- **Functional Constraints**: Every element must justify its existence. If it doesn't serve the user or content, remove it.

### 2. **Depth Through Layering**

**Flat design is outdated. Modern interfaces embrace sophisticated depth.**

- **Glassmorphism**: Semi-transparent surfaces with background blur create floating, ethereal interfaces.
- **Multi-Layer Backgrounds**: Combine gradients, mesh patterns, and subtle textures for visual richness.
- **Elevated Surfaces**: Cards and containers should feel like they're hovering above the background through shadows and blur.
- **Z-Axis Hierarchy**: Use visual depth (not just color) to establish importance.

### 3. **Motion as Content**

**Animation isn't embellishment—it's storytelling.**

- **Entrance Choreography**: Elements should reveal themselves with purposeful sequencing, creating narrative flow.
- **Scroll-Driven Experiences**: Content responds to scroll position, creating parallax, reveals, and transformations.
- **Gesture Feedback**: Every interaction receives immediate, satisfying visual confirmation.
- **Micro-Interactions**: Subtle animations (button states, loading indicators) enhance perceived quality.

### 4. **Performance as Design Constraint**

**Beauty that loads slowly is failed design.**

- **Perceived Performance**: Design for the loading state. Skeletons, placeholders, and progressive reveals maintain engagement.
- **Optimize for Speed**: Image optimization, lazy loading, and efficient animations are design decisions, not engineering afterthoughts.
- **Content Prioritization**: Above-the-fold content must be instantly visible. Below-the-fold can progressively enhance.

### 5. **Accessibility as Foundation**

**Accessible design isn't a separate consideration—it's better design for everyone.**

- **Inclusive Color**: High contrast ratios (minimum 4.5:1 for text) ensure readability for all.
- **Keyboard Navigation**: Every interactive element must be keyboard accessible with visible focus states.
- **Screen Reader Optimization**: Semantic structure and proper labeling create parallel experiences.
- **Reduced Motion Support**: Provide static alternatives for users with motion sensitivity.

---

## Typography System

### Hierarchy Through Extreme Scale Contrast

**Contemporary typography uses dramatic size differences to create unmistakable hierarchy.**

#### Display Typography (Hero Sections)

- **Size Range**: 80px - 200px on desktop, 48px - 96px on mobile
- **Weight**: 700-900 (Bold to Black)
- **Line Height**: 0.9 - 1.0 (tight, for visual impact)
- **Letter Spacing**: -2% to -4% (tighter for large sizes)
- **Purpose**: Command immediate attention, establish brand voice
- **Best Practices**: 
  - Keep hero text to 1-3 words per line
  - Use line breaks strategically for visual rhythm
  - Consider gradient overlays or text effects

#### Heading Typography (Section Titles)

- **Size Range**: 48px - 72px on desktop, 32px - 48px on mobile
- **Weight**: 600-700 (Semibold to Bold)
- **Line Height**: 1.0 - 1.2
- **Letter Spacing**: -1% to -2%
- **Purpose**: Section differentiation, content organization

#### Subheading Typography

- **Size Range**: 24px - 36px on desktop, 20px - 28px on mobile
- **Weight**: 500-600 (Medium to Semibold)
- **Line Height**: 1.2 - 1.3
- **Purpose**: Subsection titles, callouts

#### Body Typography

- **Size Range**: 18px - 22px (larger than traditional 16px for modern readability)
- **Weight**: 400-500 (Regular to Medium)
- **Line Height**: 1.6 - 1.8 (generous for reading comfort)
- **Letter Spacing**: Normal to +0.5%
- **Max Width**: 65-75 characters (optimal reading length)
- **Purpose**: Long-form content, descriptions

#### Caption & Metadata

- **Size Range**: 14px - 16px
- **Weight**: 400-500
- **Purpose**: Timestamps, labels, secondary information

### Font Selection Criteria

**Choose typefaces that balance personality with functionality.**

#### Primary Characteristics:
- **Variable Font Support**: Single file with multiple weights/styles
- **OpenType Features**: Ligatures, tabular figures, stylistic alternates
- **Unicode Coverage**: Support for international characters
- **Web Optimization**: Subset for Latin characters, optimized file size

#### Recommended Pairings:
- **Display + Body**: Same family (e.g., Inter Variable for both)
- **Geometric + Humanist**: Geometric sans for headings, humanist for body
- **Maximum Families**: 2 (one for display, one for body)

### Text Treatment Effects

**Modern typography embraces visual effects without compromising readability.**

#### Gradient Text
- **Use Case**: Emphasis, brand moments, hero titles
- **Direction**: Diagonal gradients (45-135°) feel more dynamic
- **Color Count**: 2-3 colors maximum for smooth transitions
- **Contrast**: Ensure gradient maintains readability

#### Outlined Text
- **Use Case**: Large display text, overlay on busy backgrounds
- **Stroke Width**: 1-3px depending on size
- **Fill**: Transparent or semi-transparent

#### Text Shadows
- **Use Case**: Text on images, depth creation
- **Subtlety**: Soft shadows (20-40px blur) for elegance
- **Color**: Dark semi-transparent (not pure black)

---

## Color System & Visual Language

### Modern Color Thinking

**Color is perceptual, not mathematical. Use perceptually uniform color spaces.**

#### OKLCH: The Future of Color

**OKLCH (Oklab LCH) provides perceptually uniform colors that look consistent across the spectrum.**

- **Lightness (L)**: 0-100% (perceived brightness)
- **Chroma (C)**: 0-0.4 (saturation intensity)
- **Hue (H)**: 0-360° (color angle)

**Why OKLCH over RGB/HSL:**
- Colors with same lightness appear equally bright
- Predictable color mixing and gradients
- Better for programmatic color generation
- Future-proof for wide-gamut displays

### Dark Mode First Approach

**Design for dark mode as the primary experience. Light mode is the variation.**

#### Dark Mode Principles:

**Base Colors:**
- **Background**: Near-black (not pure black) - OKLCH(15%, 0.01, 264°)
- **Surface Elevated**: Slightly lighter - OKLCH(20%, 0.015, 264°)
- **Text Primary**: Near-white - OKLCH(95%, 0.01, 264°)
- **Text Secondary**: Medium gray - OKLCH(65%, 0.02, 264°)

**Why Near-Black:**
- Reduces eye strain vs pure black
- Provides depth range for elevated surfaces
- Allows for subtle color tinting
- Better OLED power efficiency than gray

#### Semantic Color Palette:

**Accent (Brand Primary):**
- Purpose: CTAs, links, primary actions
- Range: 3 shades (default, hover, pressed)
- Example: OKLCH(70%, 0.25, 260°) - vibrant blue

**Success:**
- Purpose: Confirmations, positive states
- Color: OKLCH(73%, 0.19, 150°) - green

**Warning:**
- Purpose: Caution, pending states
- Color: OKLCH(78%, 0.16, 72°) - amber

**Danger:**
- Purpose: Errors, destructive actions
- Color: OKLCH(65%, 0.23, 25°) - red

**Info:**
- Purpose: Informational messages
- Color: OKLCH(70%, 0.20, 240°) - cyan

### Gradient Philosophy

**Gradients create depth, energy, and sophistication when used intentionally.**

#### Background Gradients

**Mesh Gradients (Trending 2024-2025):**
- Multiple radial gradients overlapping
- Heavy blur (80-120px) creates organic shapes
- Low opacity (20-40%) maintains subtlety
- Used for hero backgrounds, section dividers

**Linear Gradients:**
- 2-3 color stops maximum
- Diagonal angles (45°, 135°) feel more dynamic
- Use for cards, buttons, overlays

**Radial Gradients:**
- Spotlight effects, focal points
- Vignettes for image overlays
- Depth creation in hero sections

#### Gradient Best Practices:

1. **Color Harmony**: Use colors from the same hue family or complementary pairs
2. **Smoothness**: OKLCH ensures smooth transitions without muddy midpoints
3. **Subtlety**: Most gradients should be barely noticeable
4. **Purpose**: Every gradient should enhance hierarchy or guide attention

### Color Contrast & Accessibility

**WCAG Standards (Non-Negotiable):**

| Text Size | AA Standard | AAA Standard |
|-----------|-------------|---------------|
| Body (< 24px) | 4.5:1 | 7:1 |
| Large (≥ 24px) | 3:1 | 4.5:1 |
| UI Components | 3:1 | - |

**Testing Methods:**
- Use contrast checkers for all text/background combinations
- Test with grayscale to ensure hierarchy works without color
- Verify with color blindness simulators (protanopia, deuteranopia)

---

## Spatial System & Layout

### Spacing Philosophy

**Generous spacing is luxury. Cramped layouts feel cheap.**

#### Spacing Scale (8px Base Unit)

| Token | Size | Usage |
|-------|------|-------|
| xs | 8px | Tight inline spacing |
| sm | 16px | Related element spacing |
| md | 24px | Default component spacing |
| lg | 48px | Section internal padding |
| xl | 96px | Section vertical spacing |
| 2xl | 192px | Major section dividers |

**Vertical Rhythm:**
- Hero sections: 100vh (full viewport)
- Content sections: 60-100vh
- Between sections: 96-192px gaps
- Paragraph spacing: 24-32px

**Horizontal Rhythm:**
- Content max-width: 1200-1440px
- Reading width: 65-75 characters (typically 640-720px)
- Side padding: 24px mobile, 48-96px desktop

### Layout Patterns

#### Hero Section Anatomy

**Full-Screen Impact:**
- Height: 100vh (full viewport)
- Content: Vertically/horizontally centered or positioned at golden ratio (38% from top)
- Background: Multi-layer gradients, mesh patterns, or subtle textures
- Scroll indicator: Animated element encouraging exploration

**Content Structure:**
1. Oversized headline (80-200px)
2. Supporting text (24-32px)
3. Primary CTA (prominent)
4. Secondary action (subtle)

#### Content Section Patterns

**Two-Column Split:**
- Desktop: 50/50 or 40/60 split
- Mobile: Stack vertically
- Use for text + visual pairings

**Card Grid:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3-4 columns
- Gap: 24-48px
- Uniform card heights for visual harmony

**Bento Grid (Trending):**
- Asymmetric grid with varying cell sizes
- Creates visual interest through scale variation
- Highlight priority items with larger cells

### Responsive Design Strategy

**Mobile-First is Non-Negotiable:**

#### Breakpoint Philosophy:

| Device | Width | Design Approach |
|--------|-------|------------------|
| Mobile | 375-640px | Single column, touch-optimized |
| Tablet | 768-1024px | 2 columns, hybrid navigation |
| Desktop | 1280px+ | Multi-column, hover states |
| Large | 1536px+ | Contained max-width, more whitespace |

**Fluid Typography:**
- Use viewport-based sizing (clamp function)
- Minimum size for mobile
- Maximum size for large screens
- Smooth scaling between breakpoints

**Fluid Spacing:**
- Spacing should scale with viewport
- Tighter on mobile (conserve space)
- Generous on desktop (luxury feel)

### Touch Target Requirements

**Mobile-First Means Touch-First:**

- **Minimum Size**: 44x44px (iOS), 48x48px (Android)
- **Recommended**: 48x48px for all platforms
- **Spacing**: 8px minimum between adjacent targets
- **Feedback**: Immediate visual response to touch

---

## Motion Design & Animation Principles

### Animation Philosophy

**Motion should feel natural, purposeful, and delightful—never gratuitous.**

#### The Four Purposes of Animation:

1. **Orientation**: Help users understand spatial relationships
2. **Feedback**: Confirm actions and system state
3. **Guidance**: Direct attention to important elements
4. **Expression**: Convey brand personality and quality

### Animation Principles

#### 1. Easing & Timing

**Easing Functions:**
- **Ease-Out**: Fast start, slow end (most UI animations)
- **Ease-In**: Slow start, fast end (exits, dismissals)
- **Ease-In-Out**: Smooth both ends (modal open/close)
- **Spring**: Natural, bouncy motion (trending in 2024)

**Duration Guidelines:**
- **Micro-interactions**: 100-200ms (button hovers, focus states)
- **Element entrances**: 300-500ms (cards appearing, slides)
- **Page transitions**: 400-600ms (route changes)
- **Never**: > 1000ms (users perceive as lag)

#### 2. Choreography

**Stagger Animations (Trending):**
- Elements enter sequentially, not all at once
- Delay: 50-100ms between items
- Creates rhythm and visual interest
- Helps users process information incrementally

**Parallax Effects:**
- Background moves slower than foreground
- Creates depth perception
- Subtle: 0.3-0.5x scroll speed
- Use sparingly (can cause motion sickness)

#### 3. Entrance Animations

**Page Load Choreography:**
1. Hero section fades in first (0ms delay)
2. Supporting content staggers in (100ms intervals)
3. Background effects subtle, secondary
4. Total sequence: < 1 second

**Scroll-Triggered Reveals:**
- Trigger when 10-30% of element is visible
- Fade + subtle Y-translation (20-40px)
- Enhance engagement without disrupting reading

#### 4. Interactive Feedback

**Hover States:**
- Duration: 150-200ms
- Scale: 1.02-1.05x (subtle)
- Lift: Add shadow, slight Y-translation (-4px to -8px)
- Color: Brightness shift or overlay

**Click/Tap States:**
- Duration: 100ms
- Scale: 0.95-0.98x (press down)
- Immediate feedback (< 100ms perceived as instant)

**Loading States:**
- Skeleton screens (preferred over spinners)
- Pulsing opacity: 0.5 → 1.0
- Duration: 1000-1500ms loop
- Shows content structure during load

### Motion Accessibility

**Respect User Preferences:**

**Reduced Motion:**
- Detect `prefers-reduced-motion` setting
- Disable decorative animations
- Keep essential transitions (near-instant duration)
- Maintain spatial transitions (opacity only)

**Performance Considerations:**
- Only animate transform and opacity (GPU-accelerated)
- Avoid animating width, height, top, left (causes repaints)
- Limit simultaneous animations (max 3-5 elements)
- Test on low-end devices

### Gestural Interactions

**Swipe Gestures:**
- Carousel navigation
- Card dismissal
- Sheet/drawer open
- Resistance at boundaries (elastic effect)

**Drag Interactions:**
- Reordering lists
- Adjustable panels
- Visual feedback during drag (elevation, scale)

---

## Glassmorphism & Depth Effects

### The Glassmorphism Trend (2023-2025)

**Frosted glass effects create modern, sophisticated interfaces with depth.**

#### Core Glassmorphism Characteristics:

1. **Semi-Transparent Background**: 5-20% opacity
2. **Backdrop Blur**: 12-40px blur radius
3. **Subtle Border**: 1px, 10-30% white opacity
4. **Elevated Shadow**: Soft, multi-layered shadows
5. **Light Refraction**: Subtle gradient borders (optional)

#### Application Contexts:

**Navigation Bars:**
- Background: 80% opacity + 12px blur
- Fixed position, overlays content
- Border bottom: subtle divider
- Maintains context visibility while scrolling

**Cards & Surfaces:**
- Background: 5-15% white opacity on dark, 10-30% dark on light
- Blur: 24-40px for strong effect
- Padding: Generous (32-48px)
- Hover: Increase opacity/blur slightly

**Modal Overlays:**
- Backdrop: 30-50% black + 40px blur
- Modal surface: Strong glass effect
- Creates focus without complete occlusion

**Floating Elements:**
- Tooltips, popovers, dropdowns
- Light blur (4-12px)
- High opacity (80-95%)
- Clear readability priority

### Layering & Z-Axis Hierarchy

**Create depth through thoughtful layering:**

#### Layer Stack (Bottom to Top):

1. **Background Layer**: Gradients, patterns, images
2. **Ambient Effects**: Mesh gradients, light orbs (20-40% opacity)
3. **Content Background**: Subtle texture, noise (5-10% opacity)
4. **Primary Content**: Cards, text, images
5. **Elevated Elements**: Modals, tooltips, floating buttons
6. **Interactive Overlay**: Hover effects, focus rings

#### Shadow System for Depth:

**Shadow Levels:**

| Level | Use Case | Shadow Spec |
|-------|----------|-------------|
| 0 | Flat elements | None |
| 1 | Slight lift | 0 2px 4px rgba(0,0,0,0.1) |
| 2 | Cards | 0 4px 12px rgba(0,0,0,0.15) |
| 3 | Floating elements | 0 8px 24px rgba(0,0,0,0.2) |
| 4 | Modals | 0 16px 48px rgba(0,0,0,0.3) |
| 5 | Maximum elevation | 0 32px 64px rgba(0,0,0,0.4) |

**Multi-Layer Shadows (Realistic Depth):**
- Combine 2-3 shadow layers
- Small sharp shadow + large soft shadow
- Creates more natural, photographic depth

### Background Treatments

**Noise Texture:**
- Subtle grain (5-15% opacity)
- Breaks up flat colors
- Adds tactile quality
- Essential for large color blocks

**Mesh Gradients:**
- Multiple radial gradients
- Heavy blur (100px+)
- Organic, flowing shapes
- Low saturation for sophistication

**Grid Patterns:**
- Subtle grid overlays (5-10% opacity)
- Creates structure without rigidity
- Tech/minimalist aesthetic

**Spotlight Effects:**
- Radial gradient following cursor (optional)
- Interactive background interest
- 5-10% opacity maximum
- Adds playfulness to static designs

### Performance Optimization

**Backdrop-filter is Expensive:**

- **Limit Blur Area**: Don't blur entire viewport
- **Static When Possible**: Avoid animating blur
- **Provide Fallbacks**: Solid color for unsupported browsers
- **Test on Mobile**: Can be laggy on older devices
- **Use will-change**: Hint browser optimization

---

## Component Design Patterns

### Hero Section Design

**The hero is your first impression—make it unforgettable.**

#### Essential Elements:

1. **Dominant Headline**: 
   - 80-200px font size
   - 1-3 words per line
   - Strategic line breaks for rhythm
   - Optional gradient or effect

2. **Supporting Copy**:
   - 24-36px size
   - 1-2 sentences maximum
   - Explains value proposition
   - Subtle color (60-70% opacity)

3. **Call-to-Action**:
   - Primary action (solid, prominent)
   - Secondary action (ghost, subtle)
   - Clear, action-oriented labels
   - Adequate spacing (16-24px gap)

4. **Visual Anchor**:
   - Image, illustration, or gradient
   - Supports but doesn't compete with text
   - Adds personality and context

5. **Scroll Indicator**:
   - Subtle animated element
   - Encourages exploration
   - Mouse icon, arrow, or abstract shape

### Navigation Design

**Modern navigation is minimal, contextual, and unobtrusive.**

#### Desktop Navigation:

- **Position**: Fixed top, 64-80px height
- **Background**: Transparent → Glassmorphic on scroll
- **Logo**: Left aligned, wordmark or symbol
- **Links**: Horizontal, right-aligned or centered
- **Spacing**: 32-48px between links
- **Hover**: Underline, highlight, or scale

#### Mobile Navigation:

- **Hamburger Menu**: Industry standard, top-right
- **Drawer**: Full-screen or slide-in panel
- **Links**: Large (20-24px), touch-friendly spacing (60-80px height)
- **Close**: Clear X button, easy to reach

#### Scroll Behavior:

- **Reveal on Scroll Up**: Hide when scrolling down, show on scroll up
- **Background Transition**: Transparent → Solid/Blur based on scroll position
- **Active State**: Highlight current section in navigation

### Card Components

**Cards are content containers that feel tactile and interactive.**

#### Card Anatomy:

1. **Container**: Glassmorphic background or solid with shadow
2. **Image/Media** (optional): Top or full background
3. **Content Area**: Generous padding (24-48px)
4. **Title**: Bold, 24-36px
5. **Description**: 16-20px, 2-3 lines
6. **Metadata**: Small text (14-16px), low opacity
7. **Action** (optional): Button or link

#### Hover States:

- **Elevation**: Increase shadow, lift slightly (-8px Y)
- **Scale**: Subtle growth (1.02-1.05x)
- **Brightness**: Slight increase (5-10%)
- **Transition**: 200-300ms smooth

### Form Design

**Forms should feel welcoming, not intimidating.**

#### Input Fields:

- **Height**: 48-56px (touch-friendly)
- **Padding**: 16-20px horizontal
- **Border**: 1-2px, subtle color
- **Focus State**: Prominent border, optional glow
- **Label**: Above or floating placeholder
- **Error State**: Red border + message below

#### Buttons:

**Primary Button:**
- Solid background, high contrast
- 44-56px height
- 24-32px horizontal padding
- Bold text (600-700 weight)
- Rounded corners (6-12px)

**Secondary Button:**
- Outlined or ghost style
- Same size as primary
- Less visual weight

**Button States:**
- Hover: Darken/lighten 10%
- Active: Scale 0.97x
- Disabled: 40% opacity, no interaction
- Loading: Spinner or text change

### Loading & Empty States

**Skeleton Screens (Preferred):**
- Show content structure while loading
- Pulsing animation (1-1.5s loop)
- Gray placeholders matching final layout
- Maintains layout stability (no CLS)

**Empty States:**
- Friendly illustration or icon
- Clear explanation of why empty
- Actionable next step (CTA)
- Maintain overall layout structure

---

## Inspiration & Reference

**Study these exemplary websites for modern design patterns:**

### Industry Leaders:

1. **Apple.com**
   - Masterful use of whitespace
   - Product photography as hero
   - Scroll-driven storytelling
   - Minimal, bold typography

2. **Vercel.com**
   - Gradient backgrounds
   - Glassmorphism done right
   - Excellent dark mode
   - Technical aesthetic

3. **Linear.app**
   - Best-in-class animations
   - Keyboard-first design
   - Minimalist perfection
   - Sophisticated gradients

4. **Stripe.com**
   - Animated illustrations
   - Clear hierarchy
   - Complex simplified
   - Trustworthy aesthetic

5. **Figma.com**
   - Playful interactions
   - Community-focused
   - Color as identity
   - Engaging micro-animations

### Trending Aesthetics (2024-2025):

- **Neo-Brutalism**: Bold typography, stark contrasts, intentional asymmetry
- **Glassmorphism**: Frosted glass, layered depth, semi-transparency
- **Bento Grids**: Asymmetric card layouts, varied sizing
- **3D Elements**: Subtle 3D graphics, depth without skeuomorphism
- **Mesh Gradients**: Organic, multi-color blurred backgrounds
- **Kinetic Typography**: Text that responds to scroll/cursor
- **Immersive Scrolling**: Content transforms as you scroll

---

## Conclusion: Design as Craft

**Great design isn't decoration—it's problem-solving made beautiful.**

This design system provides a foundation, but your site's personality comes from how you apply these principles. 

### Remember:

1. **Start with Purpose**: Every design decision should serve the user or content.

2. **Embrace Constraints**: Limitations breed creativity. Small color palettes, consistent spacing, and simple components create cohesion.

3. **Sweat the Details**: The 5% of micro-interactions, spacing adjustments, and animation timing separate good from great.

4. **Test with Users**: Design isn't done until real users validate it works.

5. **Iterate Ruthlessly**: First versions are never final. Refine based on data and feedback.

6. **Performance = Design**: Slow sites aren't beautiful, no matter how they look.

7. **Accessibility = Better Design**: Designing for everyone makes better experiences for everyone.

### The Path Forward:

- **Study**: Analyze sites you admire. Deconstruct what makes them work.
- **Experiment**: Try new techniques, push boundaries, break rules intentionally.
- **Refine**: Good design emerges through iteration, not inspiration alone.
- **Ship**: Perfect is the enemy of done. Launch, learn, improve.

**Build something that matters. Build something beautiful. Build something that works.**

---

*This design standard is a living document. As design trends evolve and user needs change, so too should this system. Update regularly, but maintain core principles.*
