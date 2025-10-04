import {
  BaseBoldPlugin,
  BaseItalicPlugin,
  BaseStrikethroughPlugin,
  BaseSubscriptPlugin,
  BaseSuperscriptPlugin,
  BaseUnderlinePlugin,
  BaseKbdPlugin,
  BaseCodePlugin,
  BaseHighlightPlugin,
} from '@platejs/basic-nodes'

import { KbdLeaf, CodeLeaf, HighlightLeaf } from './views'

export const BasicMarksKit = [
  BaseBoldPlugin,
  BaseItalicPlugin,
  BaseUnderlinePlugin,
  BaseCodePlugin.withComponent(CodeLeaf),
  BaseStrikethroughPlugin,
  BaseSubscriptPlugin,
  BaseSuperscriptPlugin,
  BaseHighlightPlugin.withComponent(HighlightLeaf),
  BaseKbdPlugin.withComponent(KbdLeaf),
]
