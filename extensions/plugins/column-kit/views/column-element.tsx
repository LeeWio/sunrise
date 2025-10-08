import {
  PlateElement,
  PlateElementProps,
  usePluginOption,
  useReadOnly,
  withHOC,
} from 'platejs/react'
import { useComposedRef } from '@udecode/cn'
import { ResizableProvider } from '@platejs/resizable'
import { PathApi } from 'platejs'
import { BlockSelectionPlugin } from '@platejs/selection/react'
import { useDraggable } from '@platejs/dnd'
import { cn, Code } from '@heroui/react'

import { ColumnElement as TColumnElement } from '../type/ColumnGroupElement'

import { ColumnDragHandle } from './column-drag-handle'
import { DropLine } from './drop-line'

export const ColumnElement = withHOC(
  ResizableProvider,
  function ColumnElement(props: PlateElementProps<TColumnElement>) {
    const { width, color, size } = props.element

    const readOnly = useReadOnly()
    const isSelectionAreaVisible = usePluginOption(
      BlockSelectionPlugin,
      'isSelectionAreaVisible'
    )

    const { isDragging, previewRef, handleRef } = useDraggable({
      element: props.element,
      orientation: 'horizontal',
      type: 'column',
      canDropNode: ({ dragEntry, dropEntry }) =>
        PathApi.equals(
          PathApi.parent(dragEntry[1]),
          PathApi.parent(dropEntry[1])
        ),
    })

    return (
      <div className="group/column relative" style={{ width: width ?? '100%' }}>
        {!readOnly && !isSelectionAreaVisible && (
          <div
            ref={handleRef}
            className={cn(
              'absolute top-2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
              'pointer-events-auto flex items-center',
              'opacity-0 transition-opacity group-hover/column:opacity-100'
            )}
          >
            <ColumnDragHandle editor={props.editor} element={props.element} />
          </div>
        )}

        <PlateElement
          {...props}
          ref={useComposedRef(props.ref, previewRef)}
          className="h-full px-2 pt-2 group-first/column:pl-0 group-last/column:pr-0"
        >
          <Code
            className={cn('relative h-full w-full', isDragging && 'opacity-50')}
            color={color}
            size={size}
          >
            {props.children}
            {!readOnly && !isSelectionAreaVisible && <DropLine />}
          </Code>
        </PlateElement>
      </div>
    )
  }
)
