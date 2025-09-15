import type { PropsWithChildren } from 'react'

import { TColumnElement } from 'platejs'
import { setColumns } from '@platejs/layout'
import {
  PlateElement,
  useEditorRef,
  useEditorSelector,
  useElement,
  useFocusedLast,
  useReadOnly,
  useRemoveNodeButton,
  useSelected,
  type PlateElementProps,
} from 'platejs/react'
import { Tooltip } from '@heroui/react'

import {
  DoubleColumnOutlined,
  DoubleSideDoubleColumnOutlined,
  LeftSideDoubleColumnOutlined,
  RightSideDoubleColumnOutlined,
  ThreeColumnOutlined,
} from '@/components/icons'

// Predefined layout presets for columns
const layoutPresets: Array<{ icon: JSX.Element; widths: string[] }> = [
  { icon: <DoubleColumnOutlined />, widths: ['50%', '50%'] },
  { icon: <ThreeColumnOutlined />, widths: ['33%', '33%', '33%'] },
  { icon: <RightSideDoubleColumnOutlined />, widths: ['70%', '30%'] },
  { icon: <LeftSideDoubleColumnOutlined />, widths: ['30%', '70%'] },
  { icon: <DoubleSideDoubleColumnOutlined />, widths: ['25%', '50%', '25%'] },
]

/**
 * ColumnFloatingToolbar Component
 *
 * A floating toolbar for column elements.
 * - Appears when the column is selected, focused last, and editor is collapsed.
 * - Allows users to adjust column widths using layout presets.
 */
const ColumnFloatingToolbar = ({ children }: PropsWithChildren) => {
  const editor = useEditorRef() // Reference to the Plate.js editor instance
  const readOnly = useReadOnly() // Check if editor is in read-only mode
  const element = useElement<TColumnElement>() // Get the current column element
  const { props: buttonProps } = useRemoveNodeButton({ element }) // Props for a remove node button (not rendered here)
  const selected = useSelected() // Whether the current element is selected
  const isCollapsed = useEditorSelector((editor) => editor.api.isCollapsed(), []) // Check if editor selection is collapsed
  const isFocusedLast = useFocusedLast() // Whether this element was the last focused element

  // Determine if toolbar should be open
  const open = isFocusedLast && !readOnly && selected && isCollapsed

  // Handler for changing column widths
  const onColumnChange = (widths: string[]) => {
    setColumns(editor, {
      at: element,
      widths,
    })
  }

  // FIX: 需要更换组件，目前 tooltip 不支持交互元素，popover 又无法使用
  return (
    <Tooltip isOpen={open}>
      <Tooltip.Trigger aria-hidden>{children}</Tooltip.Trigger>
      <Tooltip.Content>asdf</Tooltip.Content>
    </Tooltip>
  )
}

/**
 * ColumnGroupElement Component
 *
 * Wraps a group of columns and adds the ColumnFloatingToolbar.
 * - Renders a PlateElement with margin-bottom.
 * - Uses the ColumnFloatingToolbar to provide floating actions for column layout.
 */
export const ColumnGroupElement = (props: PlateElementProps) => {
  return (
    <PlateElement className="mb-2" {...props}>
      {/* Wrap children with floating toolbar */}
      <ColumnFloatingToolbar>
        <div className="flex size-full rounded">{props.children}</div>
      </ColumnFloatingToolbar>
    </PlateElement>
  )
}
