import { ExitBreakPlugin } from 'platejs'

// ExitBreakKit: configure the Exit Break plugin
export const ExitBreakKit = [
  ExitBreakPlugin.configure({
    shortcuts: {
      // Insert a break line: Ctrl/Cmd + Enter
      insert: { keys: 'mod+enter' },
      // Insert a break line before current position: Ctrl/Cmd + Shift + Enter
      insertBefore: { keys: 'mod+shift+enter' },
    },
  }),
]
