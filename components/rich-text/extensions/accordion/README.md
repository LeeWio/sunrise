# Accordion Extension Documentation

## Overview

The Accordion Extension provides collapsible content functionality for TipTap rich text editor. Users can create accordion items with titles and content that can be expanded or collapsed.

## Features

- ✅ Single accordion item with title and content
- ✅ Inline editing for both title and content
- ✅ Expand/collapse functionality
- ✅ Drag and drop reordering
- ✅ Rich text content support
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Keyboard shortcuts support

## File Structure

```
accordion/
├── index.ts          # Extension exports
├── accordion.ts      # Extension implementation
├── README.md         # Documentation
└── views/
    ├── index.ts      # View component exports
    └── accordion-view.tsx # React view component
```

## Core Commands

### 1. Set Accordion
```typescript
editor.commands.setAccordion({
  title: "Accordion Title",
  content: "Accordion content here",
  expanded: false
});
```

### 2. Update Accordion Properties
```typescript
editor.commands.updateAccordion({
  title: "New Title",
  content: "New content",
  expanded: true
});
```

### 3. Remove Accordion
```typescript
editor.commands.removeAccordion();
```

### 4. Toggle Accordion
```typescript
editor.commands.toggleAccordion();
```

## Properties Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | `string` | `"New Accordion"` | Accordion item title |
| `content` | `string` | `""` | Accordion content (supports HTML) |
| `expanded` | `boolean` | `false` | Whether the accordion is expanded |

## Keyboard Shortcuts

| Shortcut | Function |
|----------|----------|
| `Mod+Shift+Q` | Insert accordion node |
| `Mod+Q` | Toggle accordion expansion |
| `Backspace` | Delete accordion node when cursor is on empty node |

## Usage Examples

### Basic Usage
```tsx
import { RichText } from '@/components/rich-text';

function MyComponent() {
  return <RichText />;
}
```

### Programmatic Accordion Insertion
```tsx
const handleInsertAccordion = () => {
  editor.chain().focus().setAccordion({
    title: 'FAQ Section',
    content: 'This is the answer to the frequently asked question.',
    expanded: false
  }).run();
};
```

## Styling

The accordion extension uses Tailwind CSS classes with custom styling for the accordion container and interactions.

## Technical Implementation

### Core Components

1. **Accordion Extension** (`accordion.ts`)
   - TipTap node definition
   - Command implementation
   - HTML parsing and rendering
   - React node view binding

2. **Accordion View** (`views/accordion-view.tsx`)
   - React view component
   - Custom accordion UI
   - Inline editing functionality
   - State management for expanded/collapsed state

### Key Features

- **Atomic Node**: Uses `atom: true` to ensure the accordion node is indivisible
- **Drag Support**: Implements `draggable: true` for drag-and-drop reordering
- **Rich Content**: Supports HTML content in the accordion body
- **Inline Editing**: Click-to-edit functionality for both title and content

## Browser Compatibility

- Chrome 66+
- Firefox 60+
- Safari 12+
- Edge 79+

## Contributing

To extend the accordion functionality, follow these steps:

1. Add new features in the `accordion/` directory
2. Update type definitions
3. Add corresponding styles
4. Update test cases
5. Update documentation