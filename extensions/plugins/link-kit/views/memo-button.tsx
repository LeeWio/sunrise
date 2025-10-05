import { Button } from '@heroui/button'
import { Tooltip } from '@heroui/tooltip'
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
    ({ icon, onPress, fontSize = 14, value, tooltip }, ref) => {
      const content = icon ? <Icon fontSize={fontSize} icon={icon} /> : value

      const button = (
        <Button
          ref={ref}
          isIconOnly
          size="sm"
          variant="light"
          onPress={onPress}
        >
          {content}
        </Button>
      )

      return tooltip ? (
        <Tooltip closeDelay={0} content={tooltip} delay={0}>
          {button}
        </Tooltip>
      ) : (
        button
      )
    }
  )
)
