import { cn } from '@heroui/theme'
import { PlateElement, PlateElementProps } from 'platejs/react'

export function ParagraphElement(props: PlateElementProps) {
  return (
    <PlateElement {...props} className={cn('m-0 px-0 py-1')}>
      {props.children}
    </PlateElement>
  )
}
