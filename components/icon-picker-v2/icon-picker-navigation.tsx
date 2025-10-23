import { Tooltip, Button } from '@heroui/react'
import { UseIconPickerType, IconCategoryList } from './type'

// 模拟 emoji-picker 的实现方式
export const IconPickerNavigation = ({
  iconLibrary,
  focusedCategory,
  i18n,
  icons,
  onClick,
}: {
  onClick: (id: IconCategoryList) => void
} & Pick<
  UseIconPickerType,
  'iconLibrary' | 'focusedCategory' | 'i18n' | 'icons'
>) => {
  // 模拟 emojiLibrary.getGrid().sections() 的行为
  const sections = icons?.categories ? Object.keys(icons.categories).map(id => ({ id })) : []

  return (
    <div className="flex items-center justify-around w-full">
      {sections.map(({ id }) => {
        const categoryId = id as IconCategoryList
        const label = i18n.categories[categoryId]
        const icon = icons?.categories?.[categoryId]?.outline

        return (
          <Tooltip key={id} content={label} delay={500} id={id}>
            <Button
              isIconOnly
              aria-label={label}
              className="text-default-500"
              data-hover={categoryId === focusedCategory}
              size="sm"
              variant="light"
              onPress={() => {
                onClick(categoryId)
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