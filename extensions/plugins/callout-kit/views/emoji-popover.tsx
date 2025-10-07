import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover'
import { ReactNode } from 'react'

export const EmojiPopover = ({
  children,
  isOpen,
  setIsOpen,
  trigger,
}: {
  children: ReactNode
  trigger: ReactNode
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) => {
  return (
    <Popover contentEditable={false} isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  )
}
