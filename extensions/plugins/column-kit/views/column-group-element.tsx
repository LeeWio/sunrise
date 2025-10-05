import { TColumnElement } from 'platejs'
import { setColumns } from '@platejs/layout'
import {
  PlateElement,
  PlateElementProps,
  useEditorRef,
  useEditorSelector,
  useElement,
  useFocusedLast,
  useReadOnly,
  useRemoveNodeButton,
  useSelected,
} from 'platejs/react'
import { PropsWithChildren } from 'react'
import { Tooltip } from '@heroui/tooltip'
import { Button } from '@heroui/button'
import { Icon } from '@iconify/react'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown'
import { Divider } from '@heroui/divider'

import { useAppDispatch } from '@/hooks/store'
import { setColor, setRadius, setSize } from '@/feature/slice/variants-slice'
import { useVariants } from '@/hooks/use-variants'

const ColumnFloatingToolbar = ({ children }: PropsWithChildren) => {
  const variants = useVariants()
  const dispath = useAppDispatch()

  const editor = useEditorRef()
  const readOnly = useReadOnly()
  const element = useElement<TColumnElement>()

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

          <Divider className="h-5 mx-1" orientation="vertical" />

          <Dropdown>
            <DropdownTrigger>
              <Button
                className="text-foreground"
                color="default"
                radius="sm"
                size="sm"
                variant="light"
              >
                {variants.color}
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                key="default"
                color="default"
                onPress={() => dispath(setColor('default'))}
              >
                default
              </DropdownItem>
              <DropdownItem
                key="primary"
                color="primary"
                onPress={() => dispath(setColor('primary'))}
              >
                primary
              </DropdownItem>
              <DropdownItem
                key="success"
                color="success"
                onPress={() => dispath(setColor('success'))}
              >
                success
              </DropdownItem>
              <DropdownItem
                key="warning"
                color="warning"
                onPress={() => dispath(setColor('warning'))}
              >
                dwarning
              </DropdownItem>
              <DropdownItem
                key="danger"
                color="danger"
                onPress={() => dispath(setColor('danger'))}
              >
                danger
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button
                className="text-foreground"
                color="default"
                radius="sm"
                size="sm"
                variant="light"
              >
                {variants.size}
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="none" onPress={() => dispath(setSize('sm'))}>
                sm
              </DropdownItem>
              <DropdownItem key="md" onPress={() => dispath(setSize('md'))}>
                md
              </DropdownItem>
              <DropdownItem key="lg" onPress={() => dispath(setSize('lg'))}>
                lg
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button
                className="text-foreground"
                color="default"
                radius="sm"
                size="sm"
                variant="light"
              >
                {variants.radius}
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                key="none"
                onPress={() => dispath(setRadius('none'))}
              >
                none
              </DropdownItem>
              <DropdownItem key="sm" onPress={() => dispath(setRadius('sm'))}>
                sm
              </DropdownItem>
              <DropdownItem key="md" onPress={() => dispath(setRadius('md'))}>
                md
              </DropdownItem>
              <DropdownItem key="lg" onPress={() => dispath(setRadius('lg'))}>
                lg
              </DropdownItem>
              <DropdownItem
                key="full"
                onPress={() => dispath(setRadius('full'))}
              >
                full
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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

export function ColumnGroupElement(props: PlateElementProps) {
  return (
    <PlateElement className="mb-2" {...props}>
      <ColumnFloatingToolbar>
        <div className="flex size-full rounded">{props.children}</div>
      </ColumnFloatingToolbar>
    </PlateElement>
  )
}
