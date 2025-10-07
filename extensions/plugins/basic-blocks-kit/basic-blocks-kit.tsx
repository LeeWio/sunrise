import {
  BlockquotePlugin,
  HorizontalRulePlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  H4Plugin,
  H5Plugin,
  H6Plugin,
} from '@platejs/basic-nodes/react'
import { ParagraphPlugin } from 'platejs/react'

import {
  H1Element,
  H2Element,
  H3Element,
  H4Element,
  H5Element,
  H6Element,
  ParagraphElement,
  BlockquoteElement,
  HrElement,
} from './views'

/**
 * BasicBlocksKit
 *
 * Consolidates all basic block-level editor plugins into a single kit.
 * Includes paragraph, headings (H1-H6), blockquote, and horizontal rule.
 *
 * Each plugin is either configured with a custom component or default behavior.
 * Keyboard shortcuts are defined for quick toggling of headings and blockquotes.
 */
export const BasicBlocksKit = [
  // Paragraph plugin using a custom ParagraphElement component
  ParagraphPlugin.withComponent(ParagraphElement),

  // Heading plugins H1–H6
  // Each heading plugin is configured with:
  // - a custom PlateElement component
  // - break rule: resets the node if empty
  // - shortcut: mod+alt+[1-6] for toggling the heading level
  H1Plugin.configure({
    node: { component: H1Element },
    rules: { break: { empty: 'reset' } },
    shortcuts: { toggle: { keys: 'mod+alt+1' } },
  }),
  H2Plugin.configure({
    node: { component: H2Element },
    rules: { break: { empty: 'reset' } },
    shortcuts: { toggle: { keys: 'mod+alt+2' } },
  }),
  H3Plugin.configure({
    node: { component: H3Element },
    rules: { break: { empty: 'reset' } },
    shortcuts: { toggle: { keys: 'mod+alt+3' } },
  }),
  H4Plugin.configure({
    node: { component: H4Element },
    rules: { break: { empty: 'reset' } },
    shortcuts: { toggle: { keys: 'mod+alt+4' } },
  }),
  H5Plugin.configure({
    node: { component: H5Element },
    rules: { break: { empty: 'reset' } },
    shortcuts: { toggle: { keys: 'mod+alt+5' } },
  }),
  H6Plugin.configure({
    node: { component: H6Element },
    rules: { break: { empty: 'reset' } },
    shortcuts: { toggle: { keys: 'mod+alt+6' } },
  }),

  // Blockquote plugin with custom component and shortcut
  BlockquotePlugin.configure({
    node: { component: BlockquoteElement },
    shortcuts: { toggle: { keys: 'mod+shift+period' } },
  }),

  // Horizontal rule plugin with custom component
  HorizontalRulePlugin.withComponent(HrElement),
]
