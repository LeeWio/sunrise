import emojiMartData from '@emoji-mart/data'
import { EmojiInputPlugin, EmojiPlugin } from '@platejs/emoji/react'

import { EmojiInputElement } from './views/emoji-input-element'

export const EmojiKit = [
  EmojiPlugin.configure({
    options: { data: emojiMartData as any },
  }),
  EmojiInputPlugin.withComponent(EmojiInputElement),
]
