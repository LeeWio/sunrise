import type { Emoji } from '@emoji-mart/data'

import { memo } from 'react'

export const EmojiButton = memo(function EmojiButton({
  emoji,
  index,
  onMouseOver,
  onSelect,
}: {
  emoji: Emoji
  index: number
  onMouseOver: (emoji?: Emoji) => void
  onSelect: (emoji: Emoji) => void
}) {
  return (
    <button
      aria-label={emoji.skins[0].native}
      className="group relative flex size-9 cursor-pointer items-center justify-around leading-none"
      data-index={index}
      tabIndex={-1}
      onClick={() => onSelect(emoji)}
      onMouseEnter={() => onMouseOver(emoji)}
      onMouseLeave={() => onMouseOver()}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
      />
      <span
        className="relative text-xl"
        data-emoji-set="native"
        style={{
          fontFamily:
            '"Apple Color Emoji", "Segoe UI Emoji", NotoColorEmoji, "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji", EmojiSymbols',
        }}
      >
        {emoji.skins[0].native}
      </span>
    </button>
  )
})
