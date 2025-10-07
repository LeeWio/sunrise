import type { Emoji } from '@emoji-mart/data'

import { Button } from '@heroui/button'
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
    <Button
      isIconOnly
      aria-label={emoji.skins[0].native}
      className="group relative flex size-9 items-center justify-center leading-none"
      data-hover={false}
      data-index={index}
      size="sm"
      tabIndex={-1}
      variant="light"
      onMouseEnter={() => onMouseOver(emoji)}
      onMouseLeave={() => onMouseOver()}
      onPress={() => onSelect(emoji)}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
      />
      <span
        className="relative text-2xl"
        data-emoji-set="native"
        style={{
          fontFamily:
            '"Apple Color Emoji", "Segoe UI Emoji", NotoColorEmoji, "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji", EmojiSymbols',
        }}
      >
        {emoji.skins[0].native}
      </span>
    </Button>
  )
})
