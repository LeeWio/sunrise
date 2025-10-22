import { Button, ScrollShadow } from '@heroui/react'

import { IconCategoryList, IconMeta } from './type'

export type IconPickerContentProps = {
  groupedIcons: Record<IconCategoryList, IconMeta[]>
  onSelectIcon: (icon: IconMeta) => void
}

export const IconPickerContent = ({ groupedIcons, onSelectIcon }: IconPickerContentProps) => {
  // 检查 groupedIcons 是否为空或未定义
  if (!groupedIcons || Object.keys(groupedIcons).length === 0) {
    return (
      <ScrollShadow className="h-64 w-full">
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No icons found</p>
        </div>
      </ScrollShadow>
    )
  }

  return (
    <ScrollShadow className="h-64 w-full">
      <div className="grid grid-cols-8 gap-2">
        {Object.entries(groupedIcons).map(([category, icons]) => (
          <div key={category} className="col-span-8">
            <p className="text-sm font-bold text-gray-500 capitalize">{category}</p>
            <div className="grid grid-cols-8 gap-2 mt-2">
              {icons.map(icon => (
                <Button
                  key={icon.id}
                  isIconOnly
                  variant="light"
                  onPress={() => onSelectIcon(icon)}
                  className="min-w-unit-12 min-h-unit-12"
                >
                  <icon.component className="w-6 h-6" />
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollShadow>
  )
}