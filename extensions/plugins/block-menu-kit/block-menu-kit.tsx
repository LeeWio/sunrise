import { BlockMenuPlugin } from '@platejs/selection/react'

import { BlockSelectionKit } from '../block-selection-kit'

export const BlockMenuKit = [
  ...BlockSelectionKit,
  BlockMenuPlugin.configure({
    render: { aboveEditable: BlockContextMenu },
  }),
]
