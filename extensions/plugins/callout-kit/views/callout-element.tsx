import { PlateElement } from 'platejs/react'
import { useEmojiDropdownMenuState } from '@platejs/emoji/react'
import { useCalloutEmojiPicker } from '@platejs/callout/react'
import { Alert } from '@heroui/alert'
import { Button } from '@heroui/button'

import { CalloutElement as TCalloutElement } from '../type/index'

import { EmojiPopover } from './emoji-popover'
import { EmojiPicker } from './emoji-picker'
import { CalloutFloatingToolbar } from './callout-floating-toolbar'

export const CalloutElement = ({
  attributes,
  children,
  className,
  ...props
}: React.ComponentProps<typeof PlateElement<TCalloutElement>>) => {
  const { color, variant, radius } = props.element

  const { emojiPickerState, isOpen, setIsOpen } = useEmojiDropdownMenuState({
    closeOnSelect: false,
  })

  const { emojiToolbarDropdownProps, props: calloutProps } =
    useCalloutEmojiPicker({
      isOpen,
      setIsOpen,
    })

  return (
    <PlateElement
      {...props}
      attributes={{
        ...attributes,
        'data-plate-open-context-menu': true,
      }}
      style={{
        backgroundColor: props.element.backgroundColor as any,
      }}
    >
      <CalloutFloatingToolbar editor={props.editor} element={props.element}>
        <Alert
          hideIcon
          classNames={{
            title: 'text-lg',
          }}
          color={color}
          radius={radius}
          startContent={
            <EmojiPopover
              trigger={
                <Button
                  isIconOnly
                  className="size-8 p-1 text-[18px] select-none "
                  contentEditable={false}
                  size="md"
                  variant="light"
                >
                  {(props.element.icon as any) || '💡'}
                </Button>
              }
              {...emojiToolbarDropdownProps}
            >
              <EmojiPicker {...emojiPickerState} {...calloutProps} />
            </EmojiPopover>
          }
          title={<>{children}</>}
          variant={variant}
        />
      </CalloutFloatingToolbar>
    </PlateElement>
  )
}
