import { LinkPlugin } from '@platejs/link/react'

import { LinkElement } from './views'
import { LinkFloatingToolbar } from './views/link-floating-toolbar'

export const LinkKit = [
  LinkPlugin.configure({
    render: {
      node: LinkElement,
      afterEditable: () => <LinkFloatingToolbar />,
    },
  }),
]
