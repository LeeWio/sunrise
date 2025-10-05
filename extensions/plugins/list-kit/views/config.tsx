import { PlateElementProps } from 'platejs/react'

import { TodoLi, TodoMarker } from '.'

const todoLiWrapper = (props: PlateElementProps): JSX.Element => (
  <TodoLi {...props} />
)
const todoMarkerWrapper = (props: PlateElementProps): JSX.Element => (
  <TodoMarker {...props} />
)

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
