// Import helper utilities & plugins from Plate.js
import { getPluginTypes, KEYS } from 'platejs' // Used to fetch plugin types and predefined keys
import { BlockSelectionPlugin } from '@platejs/selection/react' // The selection plugin from Plate.js

// Import the BlockSelection component (highlight overlay)
import { BlockSelection } from './views/block-selection'

/**
 * BlockSelectionKit
 *
 * A preconfigured array of plugins that adds block selection functionality
 * to a Plate.js editor. It highlights selectable blocks and allows context
 * menu actions on them.
 */
export const BlockSelectionKit = [
  // Configure the BlockSelectionPlugin with custom behavior
  BlockSelectionPlugin.configure(({ editor }) => ({
    options: {
      // Enable right-click context menu on selectable blocks
      enableContextMenu: true,

      /**
       * Determine whether a given element can be selected.
       * This disables selection for certain plugin types
       * such as column, codeLine, or table cell (td).
       */
      isSelectable: (element) => {
        // Get all plugin types for the specified keys
        const excludedTypes = getPluginTypes(editor, [KEYS.column, KEYS.codeLine, KEYS.td])

        // Return true only if the element type is NOT excluded
        return !excludedTypes.includes(element.type)
      },
    },
    render: {
      /**
       * Custom render logic to place the selection overlay below root nodes.
       * This will render <BlockSelection> only if the node is marked
       * as 'slate-selectable' (has the correct className).
       */
      belowRootNodes: (props) => {
        // If the element does not have the 'slate-selectable' class, do nothing
        if (!props.attributes.className?.includes('slate-selectable')) {
          return null
        }

        // Render the BlockSelection component for the selectable block
        return <BlockSelection {...(props as any)} />
      },
    },
  })),
]
