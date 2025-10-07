import { Chip } from '@heroui/chip'
import { Tooltip } from '@heroui/tooltip'
import { TText } from 'platejs'
import { PlateLeaf, PlateLeafProps } from 'platejs/react'

interface CodeLeafProps extends TText {
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  variant: 'bordered' | 'flat' | 'solid' | 'shadow'
  radius: 'none' | 'sm' | 'md' | 'lg' | 'full'
}

export const CodeLeaf = (props: PlateLeafProps<CodeLeafProps>) => {
  const { radius, color, size, variant } = props.text

  return (
    <PlateLeaf {...props}>
      {/* TODO: 待定 */}
      <Tooltip content={<div>adf</div>}>
        <Chip color={color} radius={radius} size={size} variant={variant}>
          {props.children}
        </Chip>
      </Tooltip>
    </PlateLeaf>
  )
}
