import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
  Tooltip,
} from '@heroui/react'
import { memo } from 'react'
import { Icon } from '@iconify/react'
import { PlateEditor } from 'platejs/react'

import { ColumnElement } from '../type/ColumnGroupElement'

interface ColunmnDragHandleProps {
  editor: PlateEditor
  element: ColumnElement
}
// TODO: 这里需要处理当前状态是长按拖拽还是单机显示菜单栏
export const ColumnDragHandle = memo(function ColumnDragHandle({
  editor,
  element,
}: ColunmnDragHandleProps) {
  return (
    <Tooltip closeDelay={0} content="Drag to move column" delay={0}>
      {/* TODO: 这里需要集成子菜单栏， */}
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <Icon
              className="text-default-500"
              height="24"
              icon="lucide:grip-horizontal"
              width="24"
            />
          </Button>
        </DropdownTrigger>

        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="default"
            onPress={() =>
              editor.tf.setNodes<ColumnElement>(
                { color: 'default' },
                { at: element }
              )
            }
          >
            change default color
          </DropdownItem>
          <DropdownItem
            key="primary"
            onPress={() =>
              editor.tf.setNodes<ColumnElement>(
                { color: 'primary' },
                { at: element }
              )
            }
          >
            change primary color
          </DropdownItem>
          <DropdownItem
            key="sm"
            onPress={() =>
              editor.tf.setNodes<ColumnElement>({ size: 'sm' }, { at: element })
            }
          >
            change size to sm
          </DropdownItem>
          <DropdownItem
            key="lg"
            onPress={() =>
              editor.tf.setNodes<ColumnElement>({ size: 'lg' }, { at: element })
            }
          >
            change size to lg
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Tooltip>
  )
})
