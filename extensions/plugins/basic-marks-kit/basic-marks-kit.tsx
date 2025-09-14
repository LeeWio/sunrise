import {
  BoldPlugin,
  CodePlugin,
  HighlightPlugin,
  ItalicPlugin,
  KbdPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from '@platejs/basic-nodes/react'

import { KbdLeaf } from './views/kbd-leaf'
import { HighlightLeaf } from './views/highlight-leaf'
import { CodeLeaf } from './views/code-leaf'

/**
 * BasicMarksKit
 *
 * This array consolidates all basic text formatting plugins (marks) for the Plate.js editor.
 * Each plugin provides a specific text style or semantic mark and optional keyboard shortcuts.
 *
 * Plugins included:
 * - BoldPlugin: Bold text (Ctrl/Cmd + B)
 * - ItalicPlugin: Italic text (Ctrl/Cmd + I)
 * - UnderlinePlugin: Underline text (Ctrl/Cmd + U)
 * - CodePlugin: Inline code formatting, uses CodeLeaf for styling, toggle shortcut Ctrl/Cmd + E
 * - StrikethroughPlugin: Strikethrough text, toggle shortcut Ctrl/Cmd + Shift + X
 * - SubscriptPlugin: Subscript text, toggle shortcut Ctrl/Cmd + Comma
 * - SuperscriptPlugin: Superscript text, toggle shortcut Ctrl/Cmd + Period
 * - HighlightPlugin: Highlight text, uses HighlightLeaf, toggle shortcut Ctrl/Cmd + Shift + H
 * - KbdPlugin: Keyboard input text, uses KbdLeaf for styling
 *
 * Usage:
 * - Spread this kit into the editor's extension array to enable all basic marks with custom leaf components.
 */
export const BasicMarksKit = [
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  CodePlugin.configure({
    node: { component: CodeLeaf }, // Use custom CodeLeaf for inline code styling
    shortcuts: { toggle: { keys: 'mod+e' } }, // Ctrl/Cmd + E
  }),
  StrikethroughPlugin.configure({
    shortcuts: { toggle: { keys: 'mod+shift+x' } }, // Ctrl/Cmd + Shift + X
  }),
  SubscriptPlugin.configure({
    shortcuts: { toggle: { keys: 'mod+comma' } }, // Ctrl/Cmd + ,
  }),
  SuperscriptPlugin.configure({
    shortcuts: { toggle: { keys: 'mod+period' } }, // Ctrl/Cmd + .
  }),
  HighlightPlugin.configure({
    node: { component: HighlightLeaf }, // Use custom HighlightLeaf for text highlighting
    shortcuts: { toggle: { keys: 'mod+shift+h' } }, // Ctrl/Cmd + Shift + H
  }),
  KbdPlugin.withComponent(KbdLeaf), // Use custom KbdLeaf for keyboard input text
]
