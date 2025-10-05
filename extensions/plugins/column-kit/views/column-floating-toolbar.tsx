import { setColumns } from '@platejs/layout'
import {
  PlateEditor,
  useEditorSelector,
  useFocusedLast,
  useReadOnly,
  useRemoveNodeButton,
  useSelected,
} from 'platejs/react'
import { Tooltip } from '@heroui/tooltip'
import { Button } from '@heroui/button'
import { Icon } from '@iconify/react'
import { ReactNode } from 'react'

import { ColumnGroupElement } from '../type/ColumnGroupElement'

interface ColumnFloatingToolbarProps {
  editor: PlateEditor
  element: ColumnGroupElement
  children: ReactNode
}

export const ColumnFloatingToolbar = ({
  children,
  element,
  editor,
}: ColumnFloatingToolbarProps) => {
  const readOnly = useReadOnly()

  const { props: buttonProps } = useRemoveNodeButton({ element })
  const selected = useSelected()
  const isCollapsed = useEditorSelector(editor => editor.api.isCollapsed(), [])
  const isFocusedLast = useFocusedLast()
  const open = isFocusedLast && !readOnly && selected && isCollapsed
  const onColumnChange = (widths: string[]) => {
    setColumns(editor, {
      at: element,
      widths,
    })
  }

  return (
    <Tooltip
      classNames={{
        content: 'flex flex-row gap-0.5',
      }}
      closeDelay={0}
      content={
        <>
          <Button
            isIconOnly
            className="text-foreground"
            color="default"
            radius="sm"
            size="sm"
            variant="light"
            onPress={() => onColumnChange(['50%', '50%'])}
          >
            <Icon height="16" icon="lucide:columns-2" width="16" />
          </Button>

          <Button
            isIconOnly
            className="text-foreground"
            color="default"
            radius="sm"
            size="sm"
            variant="light"
            onPress={() => onColumnChange(['33%', '33%', '33%'])}
          >
            <Icon height="16" icon="lucide:columns-3" width="16" />
          </Button>

          <Button
            isIconOnly
            className="text-foreground"
            color="default"
            radius="sm"
            size="sm"
            variant="light"
            onPress={() => onColumnChange(['70%', '30%'])}
          >
            <Icon height="16" icon="lucide:panel-right" width="16" />
          </Button>

          <Button
            isIconOnly
            className="text-foreground"
            color="default"
            radius="sm"
            size="sm"
            variant="light"
            onPress={() => onColumnChange(['30%', '70%'])}
          >
            <Icon height="16" icon="lucide:panel-left" width="16" />
          </Button>

          <Button
            isIconOnly
            className="text-foreground"
            color="default"
            radius="sm"
            size="sm"
            variant="light"
            onPress={() => buttonProps.onClick()}
          >
            <Icon height="16" icon="lucide:trash-2" width="16" />
          </Button>
        </>
      }
      delay={0}
      isOpen={open}
      radius="md"
      size="md"
    >
      {children}
    </Tooltip>
  )
}
