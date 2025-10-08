import { createPlatePlugin } from 'platejs/react'

import { FloatingToolbar } from './views/floating-toolbar'
import { FloatingToolbarButtons } from './views/floating-toolbar-buttons'

export const FloatingToolbarKit = [
  createPlatePlugin({
    key: 'floating-toolbar',
    render: {
      afterEditable: () => (
        <FloatingToolbar>
          <FloatingToolbarButtons />
        </FloatingToolbar>
      ),
    },
  }),
]
