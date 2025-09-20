import type { TElement } from 'platejs'

import { Button } from '@heroui/react'
import { Icon } from '@iconify/react'
import { useDropLine, useDraggable } from '@platejs/dnd'
import { BlockSelectionPlugin } from '@platejs/selection/react'
import { PathApi, TTableRowElement } from 'platejs'
import {
  PlateElement,
  PlateElementProps,
  useEditorRef,
  useElement,
  usePluginOption,
  useReadOnly,
  useSelected,
  useComposedRef,
} from 'platejs/react'
import { cn } from '@heroui/react'

export const TableRowElement = (props: PlateElementProps<TTableRowElement>) => {
  const { element } = props
  const readOnly = useReadOnly()
  const selected = useSelected()
  const editor = useEditorRef()
  const isSelectionAreaVisible = usePluginOption(BlockSelectionPlugin, 'isSelectionAreaVisible')
  const hasControls = !readOnly && !isSelectionAreaVisible

  const { isDragging, previewRef, handleRef } = useDraggable({
    element,
    type: element.type,
    canDropNode: ({ dragEntry, dropEntry }) =>
      PathApi.equals(PathApi.parent(dragEntry[1]), PathApi.parent(dropEntry[1])),
    onDropHandler: (_, { dragItem }) => {
      const dragElement = (dragItem as { element: TElement }).element

      if (dragElement) {
        editor.tf.select(dragElement)
      }
    },
  })

  return (
    <PlateElement
      {...props}
      ref={useComposedRef(props.ref, previewRef)}
      as="tr"
      attributes={{
        ...props.attributes,
        'data-selected': selected ? 'true' : undefined,
      }}
      className={cn('group/row', isDragging && 'opacity-50')}
    >
      {hasControls && (
        <td className="w-2 select-none" contentEditable={false}>
          <RowDragHandle dragRef={handleRef} />
          <RowDropLine />
        </td>
      )}

      {props.children}
    </PlateElement>
  )
}

const RowDragHandle = ({ dragRef }: { dragRef: React.Ref<any> }) => {
  const editor = useEditorRef()
  const element = useElement()

  return (
    <Button
      ref={dragRef}
      className={cn(
        'absolute top-1/2 left-0 z-51 h-6 w-4 -translate-y-1/2 p-0 focus-visible:ring-0 focus-visible:ring-offset-0',
        'cursor-grab active:cursor-grabbing',
        'opacity-0 transition-opacity duration-100 group-hover/row:opacity-100 group-has-data-[resizing="true"]/row:opacity-0',
      )}
      variant="ghost"
      onPress={() => {
        editor.tf.select(element)
      }}
    >
      <Icon
        className="text-surface-foreground cursor-pointer"
        height="24"
        icon="lucide:grip-horizontal"
        width="24"
        onClick={(event) => {
          event.stopPropagation()
          event.preventDefault()
        }}
      />
    </Button>
  )
}

const RowDropLine = () => {
  const { dropLine } = useDropLine()

  if (!dropLine) return null

  return (
    <div
      className={cn(
        'bg-brand/50 absolute inset-x-0 left-2 z-50 h-0.5',
        dropLine === 'top' ? '-top-px' : '-bottom-px',
      )}
    />
  )
}
