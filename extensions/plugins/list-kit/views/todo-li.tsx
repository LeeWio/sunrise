import { cn } from '@heroui/react'
import { PlateElementProps } from 'platejs/react'

export const TodoLi: React.FC<PlateElementProps> = props => {
  return (
    <li
      className={cn(
        'list-none',
        (props.element.checked as boolean) && 'line-through'
      )}
    >
      {props.children}
    </li>
  )
}
