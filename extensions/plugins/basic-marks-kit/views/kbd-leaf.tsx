import { Kbd } from '@heroui/kbd'
import { PlateLeaf, PlateLeafProps } from 'platejs/react'

export const KbdLeaf = (props: PlateLeafProps) => {
  return (
    <PlateLeaf {...props} as="span">
      <Kbd>{props.children}</Kbd>
    </PlateLeaf>
  )
}
