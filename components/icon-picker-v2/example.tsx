import { Button } from '@heroui/react'
import { IconPopover, useIconPopover } from './icon-popover'
import { IconMeta } from './type'

export const IconPickerExample = () => {
  const { iconPopoverProps, iconPickerProps } = useIconPopover()
  
  const handleSelectIcon = (icon: IconMeta) => {
    console.log('Selected icon:', icon)
    // 在这里处理选中的图标
  }

  return (
    <div className="flex flex-col gap-4">
      <h2>Icon Picker Example</h2>
      <IconPopover
        {...iconPickerProps}
        onSelectIcon={handleSelectIcon}
      >
        <Button>选择图标</Button>
      </IconPopover>
      
      {iconPickerProps.selectedIcon && (
        <div className="mt-4 p-4 border rounded">
          <h3>选中的图标:</h3>
          <p>名称: {iconPickerProps.selectedIcon.name}</p>
          <p>ID: {iconPickerProps.selectedIcon.id}</p>
          <iconPickerProps.selectedIcon.component className="w-8 h-8" />
        </div>
      )}
    </div>
  )
}