import { ListPlugin } from '@platejs/list/react'
import { KEYS } from 'platejs'

import { IndentKit } from '../indent-kit'

import { BlockList } from './views'

export const ListKit = [
  ...IndentKit,
  ListPlugin.configure({
    inject: {
      targetPlugins: [
        ...KEYS.heading,
        KEYS.p,
        KEYS.blockquote,
        KEYS.codeBlock,
        KEYS.toggle,
      ],
    },
    render: {
      belowNodes: BlockList,
    },
  }),
]
