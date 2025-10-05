import { BaseIndentPlugin } from '@platejs/indent'
import { KEYS } from 'platejs'

export const IndentKit = [
  BaseIndentPlugin.configure({
    inject: {
      targetPlugins: [
        ...KEYS.heading,
        KEYS.p,
        KEYS.blockquote,
        KEYS.codeBlock,
        KEYS.toggle,
      ],
    },
    options: {
      offset: 24,
    },
  }),
]
