import { Tooltip, Button } from '@heroui/react'
import { EmojiCategoryList } from '@platejs/emoji'
import { UseEmojiPickerType } from '@platejs/emoji/react'

// BUG: 当点击按钮时，EmojiPickerContent 无法对应刷新
export const EmojiPickernavigation = ({
  emojiLibrary,
  focusedCategory,
  i18n,
  icons,
  onClick,
}: {
  onClick: (id: EmojiCategoryList) => void
} & Pick<
  UseEmojiPickerType,
  'emojiLibrary' | 'focusedCategory' | 'i18n' | 'icons'
>) => {
  return (
    <div className="flex items-center justify-around w-full">
      {emojiLibrary
        .getGrid()
        .sections()
        .map(({ id }) => {
          const label = i18n.categories[id]
          const icon = icons.categories[id].outline

          return (
            <Tooltip key={id} content={label} delay={500} id={id}>
              <Button
                isIconOnly
                aria-label={label}
                className="text-default-500"
                data-hover={id === focusedCategory}
                size="sm"
                variant="light"
                onPress={() => {
                  onClick(id)
                }}
              >
                {icon}
              </Button>
            </Tooltip>
          )
        })}
    </div>
  )
}
