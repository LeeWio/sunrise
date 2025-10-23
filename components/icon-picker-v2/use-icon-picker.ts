import { addToast } from '@heroui/react'

import { IconMeta } from './type'

interface UseIconPickerOptions {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onSelect?: (icon: IconMeta) => void
}

export const useIconPicker = (options: UseIconPickerOptions) => {
  const { isOpen, onOpenChange, onSelect } = options

  const iconPopoverProps = {
    isOpen,
    onOpenChange,
  }

  const props = {
    onSelectIcon: (icon: IconMeta) => {
      if (onSelect) {
        onSelect(icon)
      }
      
      addToast({
        title: `Selected icon: ${icon.name}`,
        color: 'success',
      })
    },
  }

  return { props, iconPopoverProps }
}