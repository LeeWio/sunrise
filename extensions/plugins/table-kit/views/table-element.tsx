import type { PlateElementProps } from 'platejs/react'
import type { TTableElement } from 'platejs'

import {
  useReadOnly,
  withHOC,
  usePluginOption,
  useEditorSelector,
  PlateElement,
  useFocusedLast,
  useElement,
  useRemoveNodeButton,
  useEditorPlugin,
  useSelected,
} from 'platejs/react'
import {
  TablePlugin,
  TableProvider,
  useTableElement,
  useTableMergeState,
} from '@platejs/table/react'
import { BlockSelectionPlugin, useBlockSelected } from '@platejs/selection/react'
import { cn } from '@heroui/react'
import { Tooltip } from '@heroui/react'

import { blockSelectionVariants } from '../../block-selection-kit/views/block-selection'

export const TableElement = withHOC(
  TableProvider,
  function TableElement({ children, ...props }: PlateElementProps<TTableElement>) {
    const readOnly = useReadOnly()
    const isSelectionAreaVisible = usePluginOption(BlockSelectionPlugin, 'isSelectionAreaVisible')
    const hasControls = !readOnly && !isSelectionAreaVisible
    const { isSelectingCell, marginLeft, props: tableProps } = useTableElement()

    const isSelectingTable = useBlockSelected(props.element.id as string)

    const content = (
      <PlateElement
        {...props}
        className={cn(
          'overflow-x-auto py-5',
          hasControls && '-ml-2 *:data-[slot=block-selection]:left-2',
        )}
        style={{ paddingLeft: marginLeft }}
      >
        <div className="group/table relative w-fit">
          <table
            className={cn(
              'mr-0 ml-px table h-px table-fixed border-collapse',
              isSelectingCell && 'selection:bg-transparent',
            )}
            {...tableProps}
          >
            <tbody className="min-w-full">{children}</tbody>
          </table>

          {isSelectingTable && <div className={blockSelectionVariants()} contentEditable={false} />}
        </div>
      </PlateElement>
    )

    if (readOnly) {
      return content
    }

    return <TableFloatingToolbar>{content}</TableFloatingToolbar>
  },
)

const TableFloatingToolbar = ({ children, ...props }: React.ComponentProps<typeof Tooltip>) => {
  const { tf } = useEditorPlugin(TablePlugin)
  const selected = useSelected()
  const element = useElement<TTableElement>()
  const { props: buttonProps } = useRemoveNodeButton({ element })
  const collapsedInside = useEditorSelector(
    (editor) => selected && editor.api.isCollapsed(),
    [selected],
  )
  const isFocusedLast = useFocusedLast()

  const { canMerge, canSplit } = useTableMergeState()

  // FIX: 需要更换组件，目前 tooltip 不支持交互元素，popover 又无法使用
  return (
    <Tooltip isOpen={isFocusedLast && (canMerge || canSplit || collapsedInside)}>
      <Tooltip.Trigger>{children}</Tooltip.Trigger>
      <Tooltip.Content {...props}>asdf</Tooltip.Content>
    </Tooltip>
  )
}
