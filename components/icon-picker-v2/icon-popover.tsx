import { PopoverWrapper } from '@/components/util/popover-wrapper'

import { IconPicker, IconPickerProps } from './icon-picker'

export interface IconPopoverProps extends Omit<IconPickerProps, 'onSelectIcon'> {
  onSelectIcon?: IconPickerProps['onSelectIcon']
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  children: React.ReactNode
}

export const IconPopover = (props: IconPopoverProps) => {
  const { children, isOpen, onOpenChange, onSelectIcon = () => {}, ...rest } = props

  return (
    <PopoverWrapper isOpen={isOpen} onOpenChange={onOpenChange} trigger={children}>
      <IconPicker {...rest} onSelectIcon={onSelectIcon} />
    </PopoverWrapper>
  )
}
