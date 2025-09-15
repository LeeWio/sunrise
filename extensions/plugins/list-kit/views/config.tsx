import type { PlateElementProps } from 'platejs/react'

import { TodoLi } from './todo-li'
import { TodoMarker } from './todo-marker'

/**
 * Wrappers to avoid referencing TodoLi/TodoMarker before they're initialized
 */
const todoLiWrapper = (props: PlateElementProps): JSX.Element => <TodoLi {...props} />
const todoMarkerWrapper = (props: PlateElementProps): JSX.Element => <TodoMarker {...props} />

/**
 * Configuration for different list types.
 * Each list type maps to its own Li and Marker component.
 */
export const config: Record<
  string,
  {
    Li: React.FC<PlateElementProps>
    Marker: React.FC<PlateElementProps>
  }
> = {
  todo: {
    Li: todoLiWrapper,
    Marker: todoMarkerWrapper,
  },
}
