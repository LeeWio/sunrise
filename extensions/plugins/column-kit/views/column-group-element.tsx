import { PlateElement, PlateElementProps } from 'platejs/react'

import { ColumnGroupElement as TColumnGroupElement } from '../type/ColumnGroupElement'

import { ColumnFloatingToolbar } from './column-floating-toolbar'

export function ColumnGroupElement(
  props: PlateElementProps<TColumnGroupElement>
) {
  const { editor, children, element } = props

  return (
    <PlateElement className="mb-2" {...props}>
      <ColumnFloatingToolbar editor={editor} element={element}>
        <div className="flex size-full rounded">{children}</div>
      </ColumnFloatingToolbar>
    </PlateElement>
  )
}
