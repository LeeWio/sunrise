import { Button, Tooltip } from '@heroui/react'
import { Icon, IconifyIcon } from '@iconify/react'
import { forwardRef, memo } from 'react'

export type TextMenuItemProps = {
  icon: IconifyIcon | string
  onPress?: () => void
  value: string
  tooltip?: string
  fontSize?: number
}

export const MemoButton = memo(
  forwardRef<HTMLButtonElement, TextMenuItemProps>(
    ({ fontSize = 12, icon, onPress, value, tooltip }, ref) => {
      const content = icon ? <Icon fontSize={fontSize} icon={icon} /> : value

      const button = (
        <Button ref={ref} isIconOnly size="sm" variant="ghost" onPress={onPress}>
          {({ isHovered, isPressed }) => <>{content}</>}
        </Button>
      )

      return tooltip ? (
        <Tooltip closeDelay={0} delay={0}>
          <Tooltip.Trigger>{button}</Tooltip.Trigger>
          <Tooltip.Content>{tooltip}</Tooltip.Content>
        </Tooltip>
      ) : (
        button
      )
    },
  ),
)
