import { Popover, PopoverTrigger, PopoverContent } from '@heroui/react'
import { ReactNode } from 'react'

import { IconPicker } from './icon-picker'
import { useIconPopover } from './use-icon-popover'

export interface IconPopoverProps {
  selectedIcon: string
  setSelectedIcon: (iconName: string) => void
  children: ReactNode
}

export function IconPopover({
  selectedIcon,
  setSelectedIcon,
  children,
}: IconPopoverProps) {
  const { isOpen, setIsOpen, close } = useIconPopover({
    defaultOpen: false,
  })

  return (
    <Popover
      isOpen={isOpen}
      radius="lg"
      shadow="lg"
      size="lg"
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger>{children}</PopoverTrigger>

      <PopoverContent>
        <IconPicker
          autoClose={true}
          iconSize="md"
          selectedIcon={selectedIcon}
          onClose={close}
          onSelect={iconName => {
            setSelectedIcon(iconName)
            setIsOpen(!isOpen)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
