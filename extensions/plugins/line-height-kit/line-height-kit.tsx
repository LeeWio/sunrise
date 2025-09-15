import { LineHeightPlugin } from '@platejs/basic-styles/react'
import { KEYS } from 'platejs'

// Configure line height kit
export const LineHeightKit = [
  LineHeightPlugin.configure({
    inject: {
      nodeProps: {
        // Default line height
        defaultNodeValue: 1.5,
        // Available line heights
        validNodeValues: [1, 1.2, 1.5, 2, 3],
      },
      // Apply to headings and paragraphs
      targetPlugins: [...KEYS.heading, KEYS.p],
    },
  }),
]
