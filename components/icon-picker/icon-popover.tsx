import type { IconPopoverProps } from './types'

import { Popover, PopoverTrigger, PopoverContent, Button } from '@heroui/react'

import { HomebrewIcon } from '../icons'

import { IconPicker } from './icon-picker'
import { useIconPopover } from './use-icon-popover'
import { iconMap } from './icon-config'

export function IconPopover({
  placement = 'bottom-start',
  selectedIcon,
  setSelectedIcon,
}: IconPopoverProps) {
  const { isOpen, setIsOpen, close } = useIconPopover({
    defaultOpen: false,
  })

  const IconComponent = iconMap.get(selectedIcon || 'Homebrew')

  return (
    <Popover
      isOpen={isOpen}
      placement={placement}
      radius="lg"
      shadow="lg"
      size="lg"
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger>
        <Button isIconOnly size="sm" variant="light">
          {IconComponent ? (
            <IconComponent size={14} />
          ) : (
            <HomebrewIcon size={14} />
          )}
        </Button>
      </PopoverTrigger>

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
