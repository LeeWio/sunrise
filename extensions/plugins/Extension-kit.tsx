import {
  MarkdownKit,
  DocxKit,
  ExitBreakKit,
  LineHeightKit,
  AlignKit,
  AutoformatKit,
  BasicBlocksKit,
  BasicMarksKit,
  BlockPlaceholderKit,
  CodeBlockKit,
  ColumnKit,
  ListKit,
  FontKit,
  LinkKit,
  MathKit,
  CalloutKit,
  EmojiKit,
  CursorOverlayKit,
  FloatingToolbarKit,
} from '.'

/**
 * ExtensionKit
 *
 * A consolidated set of Plate.js editor extensions/plugins.
 *
 * This array merges multiple kits into one collection to provide a
 * full-featured editing experience, covering:
 *
 * - Block elements
 * - Inline marks
 * - Autoformatting
 * - Placeholders
 * - Text alignment
 * - Code blocks
 * - Column layouts
 * - Lists
 * - Line height control
 * - Font styling (color, background, size, family)
 * - Exit break handling (custom key shortcuts)
 * - DOCX import/export and style inlining
 * - Table support
 * - Markdown editing (GFM, math, MDX, mentions)
 * - Table of Contents (TOC) navigation
 * - Link insertion, editing and preview (hyperlinks)
 *
 * Kits included:
 *
 * 1. AlignKit
 *    - Provides text alignment options (left, center, right, justify).
 *
 * 2. AutoformatKit
 *    - Enables automatic text formatting rules like markdown shortcuts.
 *    - E.g., typing "**bold**" automatically converts to bold text.
 *
 * 3. BasicBlocksKit
 *    - Adds paragraph, heading, blockquote, and divider elements.
 *
 * 4. BasicMarksKit
 *    - Provides inline styles like bold, italic, underline, code, strikethrough.
 *
 * 5. BlockPlaceholderKit
 *    - Shows placeholder text in empty blocks to improve UX.
 *    - Great for guiding the user on what to type.
 *
 * 6. CodeBlockKit
 *    - Adds support for code blocks with syntax highlighting.
 *    - Useful for technical or developer-focused content.
 *
 * 7. ColumnKit
 *    - Adds support for multi-column layouts.
 *    - Allows side-by-side content for richer page designs.
 *
 * 8. ListKit
 *    - Adds unordered, ordered, and todo list support.
 *    - Includes keyboard shortcuts and automatic list formatting.
 *
 * 9. LineHeightKit
 *    - Adds line-height controls for headings and paragraphs.
 *    - Allows adjusting spacing for better readability.
 *
 * 10. FontKit
 *     - Adds font styling options:
 *       - Color
 *       - Background color
 *       - Size
 *       - Family
 *     - Gives end users more granular text appearance control.
 *
 * 11. ExitBreakKit
 *     - Adds keyboard shortcuts to insert a break or insert before:
 *       - Ctrl/Cmd + Enter
 *       - Ctrl/Cmd + Shift + Enter
 *     - Useful for breaking out of block elements.
 *
 * 12. DocxKit
 *     - Adds support for importing and exporting DOCX files.
 *     - JuicePlugin ensures inline styles are preserved during export.
 *
 * 13. TableKit
 *     - Adds support for table elements with resizing and layout controls.
 *     - Allows creating structured tabular data inside the editor.
 *
 * 14. MarkdownKit
 *     - Adds Markdown editing capabilities.
 *     - Supports GitHub Flavored Markdown (GFM), math syntax, MDX, and mentions.
 *     - Great for content that needs to be stored or exported as Markdown.
 *
 * 15. TocKit
 *     - Adds Table of Contents (TOC) support.
 *     - Renders a list of headings in the document for quick navigation.
 *     - Supports custom TOC item components and smooth scrolling.
 *
 * 16. LinkKit
 *     - Adds hyperlink support:
 *       - Insert, edit, and preview links.
 *       - Floating toolbar for link management.
 *     - Fully integrated with keyboard shortcuts and the editor toolbar.
 *
 * Usage:
 * - Spread `ExtensionKit` into the editor configuration’s `plugins` array
 *   to enable all included extensions and custom components at once:
 *
 *   ```tsx
 *   <Plate plugins={[...ExtensionKit]} />
 *   ```
 *
 * Benefits:
 * - Centralizes plugin management for a clean editor setup.
 * - Ensures consistent configuration and styling across all editing features.
 * - Reduces repetitive imports and keeps the main editor component minimal.
 */
export const ExtensionKit = [
  ...AlignKit, // Text alignment plugins
  ...AutoformatKit, // Autoformatting rules and plugins
  ...BasicBlocksKit, // Basic block elements (paragraphs, headings, etc.)
  ...BasicMarksKit, // Inline mark elements (bold, italic, underline, etc.)
  ...BlockPlaceholderKit, // Placeholder text for empty blocks
  ...CodeBlockKit, // Code block support with syntax highlighting
  ...ColumnKit, // Column layouts support
  ...ListKit, // List elements support (ordered, unordered, todo)
  ...LineHeightKit, // Line height control for text elements
  ...FontKit, // Font styling (color, background, size, family)
  ...ExitBreakKit, // Exit break keyboard shortcuts
  ...DocxKit, // DOCX import/export support
  // ...TableKit, // Table elements support with resizing
  ...MarkdownKit, // Markdown editing support (GFM, MDX, math)
  // ...TocKit, // Table of Contents (TOC) support for navigation
  ...LinkKit, // Hyperlink insertion, editing, and preview support
  ...MathKit,
  ...CalloutKit,
  ...EmojiKit,
  ...CursorOverlayKit,
  ...FloatingToolbarKit,
]
