import React from 'react'
import { type PlateElementProps } from 'platejs/react'
import { cn } from '@heroui/react'

/** TodoLi — renders the li element for todo lists */
export const TodoLi: React.FC<PlateElementProps> = (props) => {
  return (
    <li
      className={cn(
        'list-none',
        (props.element.checked as boolean) && 'text-muted-foreground line-through',
      )}
    >
      {props.children}
    </li>
  )
}
