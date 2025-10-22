'use client'

import { Button } from '@heroui/react'

import { PopoverWrapper } from '@/components/util/popover-wrapper'
import { useIconPickerState } from '@/components/icon-picker-v2/use-icon-picker-state'
import { useIconPicker } from '@/components/icon-picker-v2/use-icon-picker'
import { IconPicker } from '@/components/icon-picker-v2/icon-picker'

export default function BlogPage() {
  const { iconPickerState, isOpen, onOpen, onOpenChange } = useIconPickerState({
    closeOnSelect: true,
  })

  // 直接使用 iconPickerState 中的 onSelectIcon 方法
  const { props, iconPopoverProps } = useIconPicker({
    isOpen,
    onOpenChange,
    onSelect: iconPickerState.onSelectIcon, // 确保传递正确的回调
  })

  console.log('Selected icon state:', iconPickerState.selectedIcon)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Icon Picker Demo</h1>
      <PopoverWrapper
        trigger={<Button onPress={onOpen}>Select Icon</Button>}
        {...iconPopoverProps}
      >
        <IconPicker {...iconPickerState} {...props} />
      </PopoverWrapper>
      
      <div className="mt-4 p-4 border rounded-md">
        <h2 className="text-lg font-semibold mb-2">Selection Status:</h2>
        {iconPickerState.selectedIcon ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6">
                <iconPickerState.selectedIcon.component />
              </div>
              <span>{iconPickerState.selectedIcon.name}</span>
            </div>
            <div className="text-sm text-gray-500">
              ID: {iconPickerState.selectedIcon.id}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No icon selected</p>
        )}
      </div>
    </div>
  )
}