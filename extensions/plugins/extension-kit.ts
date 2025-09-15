import {
  MarkdownKit,
  DocxKit,
  ExitBreakKit,
  TableKit,
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
} from '.'

/**
 * ExtensionKit
 *
 * A consolidated set of Plate.js editor extensions/plugins.
 *
 * This array merges multiple kits into one collection to provide a
 * full-featured editing experience, covering:
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
 *
 * Kits included:
 *
 * 1. AlignKit
 *    - Provides text alignment options (left, center, right, justify).
 *
 * 2. AutoformatKit
 *    - Enables automatic text formatting rules like markdown shortcuts.
 *
 * 3. BasicBlocksKit
 *    - Adds paragraph, heading, blockquote, and divider elements.
 *
 * 4. BasicMarksKit
 *    - Provides inline styles like bold, italic, underline, etc.
 *
 * 5. BlockPlaceholderKit
 *    - Shows placeholder text in empty blocks to improve UX.
 *
 * 6. CodeBlockKit
 *    - Adds support for code blocks with syntax highlighting.
 *
 * 7. ColumnKit
 *    - Adds support for multi-column layouts.
 *
 * 8. ListKit
 *    - Adds unordered, ordered, and todo list support.
 *
 * 9. LineHeightKit
 *    - Adds line-height controls for headings and paragraphs.
 *
 * 10. FontKit
 *     - Adds font styling options: color, background, size, family.
 *
 * 11. ExitBreakKit
 *     - Adds keyboard shortcuts to insert a break or insert before
 *       (e.g., Ctrl/Cmd + Enter or Ctrl/Cmd + Shift + Enter).
 *
 * 12. DocxKit
 *     - Adds support for importing and exporting DOCX files.
 *     - JuicePlugin ensures inline styles are preserved during export.
 *
 * 13. TableKit
 *     - Adds support for table elements with resizing and layout controls.
 *
 * 14. MarkdownKit
 *     - Adds Markdown editing capabilities.
 *     - Supports GitHub Flavored Markdown (GFM), math syntax, MDX, and mentions.
 *
 * Usage:
 * - Spread `ExtensionKit` into the editor configuration’s `plugins` array
 *   to enable all included extensions and custom components at once.
 *
 * Benefits:
 * - Centralizes plugin management for a clean editor setup.
 * - Ensures consistent configuration and styling across all editing features.
 */
export const ExtensionKit = [
  ...AlignKit, // Text alignment plugins
  ...AutoformatKit, // Autoformatting rules and plugins
  ...BasicBlocksKit, // Basic block elements
  ...BasicMarksKit, // Inline mark elements
  ...BlockPlaceholderKit, // Placeholder text for empty blocks
  ...CodeBlockKit, // Code block support
  ...ColumnKit, // Column layouts
  ...ListKit, // List elements
  ...LineHeightKit, // Line height control
  ...FontKit, // Font styling
  ...ExitBreakKit, // Exit break shortcuts
  ...DocxKit, // DOCX import/export support
  ...TableKit, // Table elements support
  ...MarkdownKit, // Markdown editing support
]
