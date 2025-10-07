import {
  PlateEditor,
  useEditorSelector,
  useFocusedLast,
  useReadOnly,
  useSelected,
} from 'platejs/react'
import { ReactNode } from 'react'
import { Tooltip } from '@heroui/tooltip'
import { Select, SelectItem } from '@heroui/select'
import { TCalloutElement } from 'platejs'

import { CalloutElement } from '../type'

interface CalloutFloatingToolbarProps {
  editor: PlateEditor
  element: CalloutElement
  children: ReactNode
}
export const CalloutFloatingToolbar = ({
  children,
  element,
  editor,
}: CalloutFloatingToolbarProps) => {
  const readOnly = useReadOnly()
  const selected = useSelected()
  const isCollapsed = useEditorSelector(editor => editor.api.isCollapsed(), [])
  const isFocusedLast = useFocusedLast()

  const open = isFocusedLast && !readOnly && selected && isCollapsed

  const getFirstValue = (value: Set<string>) => {
    return value.values().next().value ?? undefined
  }

  if (readOnly) return null

  return (
    <Tooltip
      classNames={{
        content: 'flex flex-row gap-2 min-w-2xl',
      }}
      content={
        <div>
          <Select
            aria-label="Size"
            className="min-w-32 max-w-40"
            placeholder="Select size"
            selectedKeys={new Set([element.color ?? 'md'])}
            size="sm"
            onSelectionChange={keys => {
              const value = getFirstValue(keys as Set<string>)

              if (value) {
                editor.tf.setNodes<TCalloutElement>(
                  { color: value },
                  { at: element }
                )
              }
            }}
          >
            <SelectItem key="default">default</SelectItem>
            <SelectItem key="primary">primary</SelectItem>
            <SelectItem key="secondary">secondary</SelectItem>
            <SelectItem key="success">success</SelectItem>
            <SelectItem key="warning">warning</SelectItem>
            <SelectItem key="danger">danger</SelectItem>
          </Select>
        </div>
      }
      isOpen={open}
      offset={8}
      placement="top"
    >
      {children}
    </Tooltip>
  )
}
