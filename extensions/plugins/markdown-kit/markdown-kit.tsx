import { MarkdownPlugin, remarkMention, remarkMdx } from '@platejs/markdown'
import { KEYS } from 'platejs'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

/**
 * MarkdownKit
 *
 * Provides Markdown support for the editor, including GitHub Flavored Markdown,
 * math syntax, MDX, and mention handling.
 *
 * Configuration:
 * - `disallowedNodes`: Prevents certain nodes (e.g., suggestions) from being inserted.
 * - `remarkPlugins`: Integrates various remark plugins:
 *   - `remarkMath`      → Enables LaTeX math syntax support.
 *   - `remarkGfm`       → Enables GitHub Flavored Markdown (tables, task lists, strikethrough).
 *   - `remarkMdx`       → Enables MDX parsing.
 *   - `remarkMention`   → Enables mention handling (e.g., @username).
 *
 * Usage:
 * - Include `MarkdownKit` in the editor `plugins` array to enable markdown editing features.
 */
export const MarkdownKit = [
  MarkdownPlugin.configure({
    options: {
      disallowedNodes: [KEYS.suggestion], // Prevent insertion of certain nodes
      remarkPlugins: [remarkMath, remarkGfm, remarkMdx, remarkMention], // Markdown plugins
    },
  }),
]
