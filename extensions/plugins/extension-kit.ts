import {
  AlignKit,
  AutoformatKit,
  BasicBlocksKit,
  BasicMarksKit,
  BlockPlaceholderKit,
  CodeBlockKit,
} from '.'

/**
 * ExtensionKit
 *
 * A consolidated set of Plate.js editor extensions/plugins.
 *
 * This array merges multiple kits into one collection to provide a
 * full-featured editing experience, covering block elements, marks,
 * autoformatting, placeholders, text alignment, and code blocks.
 *
 * Kits included:
 *
 * 1. AlignKit
 *    - Provides text alignment options (left, center, right, justify).
 *    - Adds alignment commands and supports applying alignment to headings,
 *      paragraphs, images, and media embeds.
 *
 * 2. AutoformatKit
 *    - Enables automatic text formatting rules:
 *      - Markdown-style syntax (e.g., **bold**, *italic*, ~~strikethrough~~)
 *      - Smart quotes, punctuation, math symbols, arrows, and legal symbols
 *      - Inline code and code blocks with automatic insertion
 *      - List autoformatting for unordered, ordered, and todo lists
 *
 * 3. BasicBlocksKit
 *    - Adds basic block-level components:
 *      - Paragraphs (with custom ParagraphElement)
 *      - Headings H1–H6 (with custom heading elements)
 *      - Blockquotes (with custom BlockquoteElement)
 *      - Horizontal rules (with custom HrElement)
 *
 * 4. BasicMarksKit
 *    - Provides inline text formatting (marks):
 *      - Bold, Italic, Underline, Strikethrough
 *      - Superscript, Subscript
 *      - Inline code (CodeLeaf)
 *      - Highlight (HighlightLeaf)
 *      - Keyboard input (KbdLeaf)
 *
 * 5. BlockPlaceholderKit
 *    - Displays placeholder text in empty blocks (e.g., top-level paragraph).
 *    - Uses pseudo-elements to render muted placeholder text.
 *    - Improves UX by showing context-aware hints when blocks are empty.
 *
 * 6. CodeBlockKit
 *    - Adds support for code block elements
 *    - Supports syntax highlighting and custom rendering of code blocks
 *    - Works together with CodeSyntaxLeaf and CodeSyntaxHighlighter for styling
 *
 * Usage:
 * - Spread `ExtensionKit` into the editor configuration’s `plugins` array
 *   to enable all included extensions and custom components at once.
 *
 * Benefits:
 * - Centralizes plugin management for a cleaner editor setup.
 * - Ensures consistent configuration and styling across all editing features.
 */
export const ExtensionKit = [
  ...AlignKit, // Text alignment plugins
  ...AutoformatKit, // Autoformatting rules and plugins
  ...BasicBlocksKit, // Basic block elements
  ...BasicMarksKit, // Inline mark elements
  ...BlockPlaceholderKit, // Block placeholders for empty blocks
  ...CodeBlockKit, // Code block support with syntax highlighting
]
