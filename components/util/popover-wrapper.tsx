import { Popover, PopoverContent, PopoverTrigger } from '@heroui/react'

export const PopoverWrapper = ({
  children,
  isOpen,
  onOpenChange,
  trigger,
}: {
  children: React.ReactNode
  trigger: React.ReactNode
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}) => {
  return (
    <Popover
      contentEditable={false}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  )
}
