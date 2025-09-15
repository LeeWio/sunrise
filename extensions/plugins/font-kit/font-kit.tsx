import type { PlatePluginConfig } from 'platejs/react'

import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
  FontFamilyPlugin,
  FontSizePlugin,
} from '@platejs/basic-styles/react'
import { KEYS } from 'platejs'

// Shared plugin options: apply only to paragraph nodes
const options = {
  inject: { targetPlugins: [KEYS.p] }, // Only affect paragraphs
} satisfies PlatePluginConfig

// Define a font kit containing color, background, size and family plugins
export const FontKit = [
  // Text color plugin with a default value
  FontColorPlugin.configure({
    inject: {
      ...options.inject,
      nodeProps: {
        defaultNodeValue: 'black', // Default text color
      },
    },
  }),

  // Background color for text
  FontBackgroundColorPlugin.configure(options),

  // Font size plugin
  FontSizePlugin.configure(options),

  // Font family plugin
  FontFamilyPlugin.configure(options),
]
