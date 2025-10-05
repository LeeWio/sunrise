import {
  CodeBlockPlugin,
  CodeLinePlugin,
  CodeSyntaxPlugin,
} from '@platejs/code-block/react'
import { all, createLowlight } from 'lowlight'

import { CodeBlockElement } from './views/code-block-element'
import { CodeLineElement } from './views/code-line-element'
import { CodeSyntaxLeaf } from './views/code-syntax-leaf'

const lowlight = createLowlight(all)

export const CodeBlockKit = [
  CodeBlockPlugin.configure({
    node: { component: CodeBlockElement },
    options: { lowlight },
    shortcuts: { toggle: { keys: 'mod+alt+8' } },
  }),

  CodeLinePlugin.withComponent(CodeLineElement),
  CodeSyntaxPlugin.withComponent(CodeSyntaxLeaf),
]
