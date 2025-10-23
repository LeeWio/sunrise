import { Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import { UseIconPickerType } from './type'
import { IconPicker } from './icon-picker'
import { useIconPickerState } from './use-icon-picker-state'

export type IconPopoverProps = {
  children: React.ReactNode
} & UseIconPickerType

export const IconPopover = ({
  children,
  ...props
}: IconPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className="p-0">
        <IconPicker {...props} />
      </PopoverContent>
    </Popover>
  )
}

// Hook to use with IconPopover
export const useIconPopover = () => {
  const { iconPickerState, isOpen, onOpen, onOpenChange } = useIconPickerState()
  
  return {
    iconPopoverProps: {
      isOpen,
      onOpenChange,
    },
    iconPickerProps: iconPickerState,
  }
}