import type { IconPickerContentProps } from './types'

import { Button, ScrollShadow } from '@heroui/react'

export function IconPickerContent({
  icons,
  selectedIcon,
  onIconSelect,
  onIconHover,
}: IconPickerContentProps) {
  // TODO: 带修改
  if (icons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <p className="text-sm text-default-400">No icons found</p>
        <p className="text-xs text-default-300 mt-1">
          Try different search terms
        </p>
      </div>
    )
  }

  return (
    <ScrollShadow
      hideScrollBar
      className="flex flex-wrap justify-start gap-2 px-1"
      onMouseLeave={() => onIconHover?.(null)}
    >
      {icons.map((icon, index) => (
        <Button
          key={index}
          isIconOnly
          aria-label={`Select ${icon.displayName} icon`}
          data-hover={selectedIcon === icon.name}
          variant="light"
          onMouseEnter={() => onIconHover?.(icon)}
          onPress={() => onIconSelect(icon)}
        >
          <icon.component />
        </Button>
      ))}
    </ScrollShadow>
  )
}
