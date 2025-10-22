import { Button, ScrollShadow } from '@heroui/react'

import { IconMeta } from './type'

export type IconPickerContentProps = {
  displayedIcons: { category: string, icons: IconMeta[] }[]
  onSelectIcon: (icon: IconMeta) => void
}

export const IconPickerContent = ({ displayedIcons, onSelectIcon }: IconPickerContentProps) => {
  // 检查 displayedIcons 是否为空
  if (!displayedIcons || displayedIcons.length === 0) {
    return (
      <ScrollShadow className="flex-grow w-full min-h-[200px]" orientation="vertical">
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No icons found</p>
        </div>
      </ScrollShadow>
    )
  }

  return (
    <ScrollShadow className="flex-grow w-full" orientation="vertical">
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-3 p-3">
        {displayedIcons.map(({ category, icons }) => (
          <div key={category} className="col-span-full">
            <p className="text-sm font-bold text-gray-500 capitalize mb-2 pb-1">
              {category.replace(/-/g, ' ')}
            </p>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
              {icons.map(icon => (
                <Button
                  key={icon.id}
                  isIconOnly
                  variant="light"
                  radius="md"
                  onPress={() => onSelectIcon(icon)}
                  className="min-w-unit-10 min-h-unit-10 sm:min-w-unit-12 sm:min-h-unit-12 w-full h-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <icon.component className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollShadow>
  )
}