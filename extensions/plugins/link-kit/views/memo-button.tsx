import { Button } from '@heroui/react'
import { Tooltip } from '@heroui/react'
import { Icon, IconifyIcon } from '@iconify/react'
import { forwardRef, memo } from 'react'

export type MemoButtonProps = {
  icon?: IconifyIcon | string
  tooltip?: string
  fontSize?: number
  isDropdown?: boolean
  pressed?: boolean
  onClick?: () => void
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  nodeType?: string
}

/**
 * 1. 适配普通的 button, 即 bold、underline 等
 * 2. 适配 dropdown，即选择字体、字号等
 */
export const MemoButton = memo(
  forwardRef<HTMLButtonElement, MemoButtonProps>(
    (
      { icon, nodeType, fontSize = 14, tooltip, pressed, onClick, onMouseDown },
      ref
    ) => {
      const content = icon ? <Icon fontSize={fontSize} icon={icon} /> : nodeType

      const button = (
        <Button
          ref={ref}
          isIconOnly
          data-hover={pressed}
          size="sm"
          variant="light"
          onMouseDown={onMouseDown}
          onPress={onClick}
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
