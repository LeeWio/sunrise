import { IndentPlugin } from '@platejs/indent/react'
import { KEYS } from 'platejs'

/**
 * IndentKit
 *
 * A configured set of plugins for handling indentation in Plate.js editor.
 *
 * This kit enables users to indent or outdent various block-level elements
 * such as headings, paragraphs, blockquotes, code blocks, toggles, and images.
 */
export const IndentKit = [
  IndentPlugin.configure({
    /**
     * Inject configuration
     *
     * Specifies which node types (plugins) should support indentation.
     */
    inject: {
      targetPlugins: [
        ...KEYS.heading, // All heading levels (e.g., h1, h2, h3…)
        KEYS.p, // Paragraph block
        KEYS.blockquote, // Blockquote block
        KEYS.codeBlock, // Code block
        KEYS.toggle, // Toggle/accordion block
        KEYS.img, // Image block
      ],
    },
    /**
     * Options configuration
     *
     * @property {number} offset - The indentation width per level (in pixels).
     */
    options: {
      offset: 24,
    },
  }),
]
