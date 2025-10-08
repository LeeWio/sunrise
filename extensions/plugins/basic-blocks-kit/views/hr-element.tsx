import type { PlateElementProps } from 'platejs/react'

import * as React from 'react'
import {
  PlateElement,
  useFocused,
  useReadOnly,
  useSelected,
} from 'platejs/react'
import { Divider, cn } from '@heroui/react'

export function HrElement(props: PlateElementProps) {
  const readOnly = useReadOnly()
  const selected = useSelected()
  const focused = useFocused()

  return (
    <PlateElement {...props}>
      <div className="py-6" contentEditable={false}>
        <Divider
          className={cn(
            selected && focused && 'ring-2 ring-ring ring-offset-2',
            !readOnly && 'cursor-pointer'
          )}
          orientation="horizontal"
        />
      </div>
      {props.children}
    </PlateElement>
  )
}
