'use client'

import { Popover, PopoverTrigger, PopoverContent } from '@heroui/react'
import type { IconPopoverProps } from './types'

export function IconPopover({
  trigger,
  children,
  placement = 'bottom-start',
  isOpen,
  onOpenChange
}: IconPopoverProps) {
  return (
    <Popover
      size='lg'
      radius='lg'
      shadow='lg'
      isOpen={isOpen}
      placement={placement}
      onOpenChange={onOpenChange}
    >
      <PopoverTrigger>
        {trigger}
      </PopoverTrigger>

      <PopoverContent>
        {children}
      </PopoverContent>
    </Popover>
  )
}
