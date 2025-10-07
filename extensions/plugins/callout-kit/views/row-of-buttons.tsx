import { GridRow } from '@platejs/emoji'
import { UseEmojiPickerType } from '@platejs/emoji/react'
import { memo } from 'react'

import { EmojiButton } from './emoji-button'

export const RowOfButtons = memo(function RowOfButtons({
  emojiLibrary,
  row,
  onMouseOver,
  onSelectEmoji,
}: {
  row: GridRow
} & Pick<
  UseEmojiPickerType,
  'emojiLibrary' | 'onMouseOver' | 'onSelectEmoji'
>) {
  return (
    <div key={row.id} className="flex" data-index={row.id}>
      {row.elements.map((emojiId, index) => (
        <EmojiButton
          key={emojiId}
          emoji={emojiLibrary.getEmoji(emojiId)}
          index={index}
          onMouseOver={onMouseOver}
          onSelect={onSelectEmoji}
        />
      ))}
    </div>
  )
})
