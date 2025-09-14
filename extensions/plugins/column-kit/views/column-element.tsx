import type { TColumnElement } from 'platejs'
import type { PlateElementProps } from 'platejs/react'

import { useDraggable } from '@platejs/dnd'
import { useComposedRef } from '@udecode/cn'
import { PathApi } from 'platejs'
import { ResizableProvider } from '@platejs/resizable'
import { PlateElement, usePluginOption, useReadOnly, withHOC } from 'platejs/react'
import { BlockSelectionPlugin } from '@platejs/selection/react'
import { cn } from '@heroui/theme'

import { ColumnDragHandle } from './column-drag-handle'
import { DropLine } from './drop-line'

/**
 * ColumnElement Component
 *
 * Renders a resizable, draggable column element for a Plate.js editor.
 * Supports:
 * - Resizing via ResizableProvider
 * - Drag-and-drop within the same parent row
 * - Optional visual handles and drop lines
 * - Read-only mode support
 */
export const ColumnElement = withHOC(
  ResizableProvider, // Wrap the column with the resizable context
  function ColumnElement(props: PlateElementProps<TColumnElement>) {
    const { width } = props.element // Current width of the column
    const readOnly = useReadOnly() // Check if the editor is in read-only mode
    const isSelectionAreaVisible = usePluginOption(BlockSelectionPlugin, 'isSelectionAreaVisible') // Whether selection overlay is visible

    // Setup draggable behavior for the column
    const { isDragging, previewRef, handleRef } = useDraggable({
      element: props.element, // The current column element
      orientation: 'horizontal', // Only allow horizontal dragging
      type: 'column', // Drag type identifier
      canDropNode: ({ dragEntry, dropEntry }) =>
        // Only allow dropping within the same parent row
        PathApi.equals(PathApi.parent(dragEntry[1]), PathApi.parent(dropEntry[1])),
    })

    return (
      <div className="group/column relative" style={{ width: width ?? '100%' }}>
        {!readOnly && !isSelectionAreaVisible && (
          <div
            ref={handleRef}
            className={cn(
              'absolute top-2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
              'pointer-events-auto flex items-center',
              'opacity-0 transition-opacity group-hover/column:opacity-100',
            )}
          >
            <ColumnDragHandle />
          </div>
        )}

        <PlateElement
          {...props}
          ref={useComposedRef(props.ref, previewRef)}
          className="h-full px-2 pt-2 group-first/column:pl-0 group-last/column:pr-0"
        >
          <div
            className={cn(
              'relative h-full border border-transparent p-1.5',
              !readOnly && 'border-border rounded-lg border-dashed',
              isDragging && 'opacity-50',
            )}
          >
            {props.children}

            {!readOnly && !isSelectionAreaVisible && <DropLine />}
          </div>
        </PlateElement>
      </div>
    )
  },
)
