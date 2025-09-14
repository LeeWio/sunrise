import { TextAlignPlugin } from '@platejs/basic-styles/react'
import { KEYS } from 'platejs'

/**
 * AlignKit
 *
 * This array contains the configuration for the TextAlignPlugin in Plate.js.
 * It provides text alignment options for various block elements.
 */
export const AlignKit = [
  TextAlignPlugin.configure({
    inject: {
      /**
       * nodeProps defines how the alignment value is stored in the node
       */
      nodeProps: {
        defaultNodeValue: 'start', // Default alignment value when none is set
        nodeKey: 'align', // The key used to store the alignment value in the node
        styleKey: 'textAlign', // The CSS style property that will be applied
        validNodeValues: [
          // Allowed values for alignment
          'start',
          'left',
          'center',
          'right',
          'end',
          'justify',
        ],
      },
      /**
       * targetPlugins specifies which node types this alignment plugin will apply to
       */
      targetPlugins: [
        ...KEYS.heading, // All heading nodes (h1-h6)
        KEYS.p, // Paragraph nodes
        KEYS.img, // Image nodes
        KEYS.mediaEmbed, // Media embed nodes (like videos)
      ],
    },
  }),
]
