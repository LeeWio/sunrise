import { Button, ScrollShadow, cn } from '@heroui/react'
import { memo, useCallback } from 'react'

import { IconMeta, IconSettingsType, UseIconPickerType } from './type'

// 使用 memo 优化性能，避免不必要的重渲染
export const IconPickerContent = ({
  displayedIcons, 
  i18n,
  refs,
  settings = {
    buttonSize: { value: 48 },
    perLine: { value: 8 },
    showFrequent: { value: false }
  },
  onSelectIcon 
}: Pick<
  UseIconPickerType,
  'displayedIcons' | 'i18n' | 'refs' | 'settings' | 'onSelectIcon'
>) => {
  const getRowWidth = settings.perLine.value * settings.buttonSize.value

  // 检查 displayedIcons 是否为空
  if (!displayedIcons || displayedIcons.length === 0) {
    return (
      <ScrollShadow 
        ref={refs.contentRoot}
        className="flex-grow w-full min-h-[200px]" 
        orientation="vertical"
      >
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">{i18n.searchNoResultsTitle}</p>
        </div>
      </ScrollShadow>
    )
  }

  // 使用 useCallback 优化性能
  const renderCategory = useCallback(({ category, icons }: { category: string, icons: IconMeta[] }) => {
    return (
      <div
        key={category}
        data-id={category}
        style={{ width: getRowWidth }}
      >
        <div className="sticky -top-px z-1 p-1 text-sm font-semibold text-default-500">
          {i18n.categories[category] || category.replace(/-/g, ' ')}
        </div>
        <div
          className="relative flex flex-wrap"
          style={{ height: Math.ceil(icons.length / settings.perLine.value) * settings.buttonSize.value }}
        >
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {icons.map(icon => (
              <Button
                key={icon.id}
                isIconOnly
                variant="light"
                radius="md"
                onPress={() => onSelectIcon(icon)}
                className="min-w-unit-10 min-h-unit-10 sm:min-w-unit-12 sm:min-h-unit-12 w-full h-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={icon.name}
              >
                <icon.component className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    )
  }, [getRowWidth, i18n.categories, settings.buttonSize.value, settings.perLine.value, onSelectIcon])

  return (
    <ScrollShadow
      ref={refs.contentRoot}
      hideScrollBar
      className={cn(
        'h-full min-h-[50%] overflow-x-hidden overflow-y-auto',
        '[&::-webkit-scrollbar]:w-4',
        '[&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-button]:size-0',
        '[&::-webkit-scrollbar-thumb]:min-h-11 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar-thumb]:hover:bg-muted-foreground/25',
        '[&::-webkit-scrollbar-thumb]:border-4 [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-popover [&::-webkit-scrollbar-thumb]:bg-clip-padding'
      )}
      data-id="scroll"
    >
      <div 
        ref={refs.content}
        className="h-full"
        style={{ width: getRowWidth }}
      >
        {displayedIcons.map(renderCategory)}
      </div>
    </ScrollShadow>
  )
}

// 设置显示名称便于调试
IconPickerContent.displayName = 'IconPickerContent'