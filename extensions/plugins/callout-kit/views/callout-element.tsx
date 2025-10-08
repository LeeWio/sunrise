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
    closeOnSelect: true,
  })

  const { emojiToolbarDropdownProps, props: calloutProps } =
    useCalloutEmojiPicker({
      isOpen,
      setIsOpen,
    })

  return (
    <PlateElement
      attributes={{
        ...attributes,
        'data-plate-open-context-menu': true,
      }}
      className={className}
      style={{
        backgroundColor: props.element.backgroundColor as any,
      }}
      {...props}
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
                  className="text-[26px]"
                  contentEditable={false}
                  radius="sm"
                  size="sm"
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
