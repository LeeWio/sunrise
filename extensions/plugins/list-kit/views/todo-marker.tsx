import React from 'react'
import { useTodoListElement, useTodoListElementState } from '@platejs/list/react'
import { useReadOnly, type PlateElementProps } from 'platejs/react'
import { cn } from '@heroui/theme'
import { Checkbox } from '@heroui/react'

/** TodoMarker — renders the checkbox for todo lists */
export const TodoMarker: React.FC<PlateElementProps> = (props) => {
  const state = useTodoListElementState({ element: props.element })
  const { checkboxProps } = useTodoListElement(state)
  const readOnly = useReadOnly()

  return (
    <div contentEditable={false}>
      <Checkbox
        className={cn('absolute top-1 -left-6', readOnly && 'pointer-events-none')}
        {...checkboxProps}
      />
    </div>
  )
}
