import { BlockPlaceholderPlugin } from 'platejs/react'
import { KEYS } from 'platejs'

/**
 * BlockPlaceholderKit
 *
 * A Plate.js plugin configuration that displays placeholder text
 * for empty top-level paragraph blocks in the editor.
 *
 * Features:
 * - Uses `BlockPlaceholderPlugin` to render a subtle placeholder
 *   when the block content is empty.
 * - `className`: applies pseudo-element styles (via `before:`) to
 *   show the placeholder text with muted color and proper positioning.
 * - `placeholders`: maps specific block types to placeholder text.
 *   - Here, the paragraph block (`KEYS.p`) shows “Type something...” by default.
 * - `query`: controls when the placeholder is displayed.
 *   - `path.length === 1` ensures the placeholder appears only at the
 *     top-level blocks (not nested elements).
 *
 * Usage:
 * - Include `BlockPlaceholderKit` in your Plate.js editor plugin array.
 * - Automatically displays placeholder text for the first empty paragraph.
 */
export const BlockPlaceholderKit = [
  BlockPlaceholderPlugin.configure({
    options: {
      className:
        'before:absolute before:cursor-text before:text-muted-foreground/80 before:content-[attr(placeholder)]',
      placeholders: {
        [KEYS.p]: 'Type something...',
      },
      query: ({ path }) => {
        return path.length === 1
      },
    },
  }),
]
