import { Chip } from '@heroui/chip'
import { PlateLeaf, PlateLeafProps } from 'platejs/react'

export const CodeLeaf = (props: PlateLeafProps) => {
  return (
    <PlateLeaf {...props}>
      {/* TODO: 通过 变量控制这些属性 */}
      <Chip color="primary" radius="sm" size="sm" variant="faded">
        {props.children}
      </Chip>
    </PlateLeaf>
  )
}
