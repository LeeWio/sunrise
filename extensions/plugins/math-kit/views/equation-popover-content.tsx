import { Button } from '@heroui/button'
import { Textarea } from '@heroui/input'
import { PopoverContent } from '@heroui/popover'
import { useEquationInput } from '@platejs/math/react'
import { TEquationElement } from 'platejs'
import {
  createPrimitiveComponent,
  useEditorRef,
  useElement,
  useReadOnly,
} from 'platejs/react'
import { TextareaAutosizeProps } from 'react-textarea-autosize'
import { Icon } from '@iconify/react'
import { useEffect } from 'react'
import { BlockSelectionPlugin } from '@platejs/selection/react'

const EquationInput = createPrimitiveComponent(Textarea)({
  propsHook: useEquationInput,
})

export const EquationPopoverContent = ({
  isInline,
  open,
  setOpen,
  ...props
}: {
  isInline: boolean
  open: boolean
  setOpen: (open: boolean) => void
} & TextareaAutosizeProps) => {
  const editor = useEditorRef()
  const readOnly = useReadOnly()
  const element = useElement<TEquationElement>()

  useEffect(() => {
    if (isInline && open) {
      setOpen(true)
    }
  }, [isInline, open, setOpen])

  if (readOnly) return null

  const onClose = () => {
    if (isInline) {
      editor.tf.select(element, { focus: true, next: true })
    } else {
      editor
        .getApi(BlockSelectionPlugin)
        .blockSelection.set(element.id as string)
    }
  }

  return (
    <PopoverContent className="flex gap-2" contentEditable={false}>
      <EquationInput
        state={{ isInline, open, onClose }}
        {...props}
        variant="bordered"
      />

      {/* TODO: 不需要这个 Button，需要确定的是如果button在 popover content 里面是否可以控制 popover 的开关 */}
      <Button
        fullWidth
        color="primary"
        endContent={
          <Icon height="16" icon="lucide:corner-down-left" width="16" />
        }
        size="sm"
        variant="bordered"
        onPress={onClose}
      >
        Done
      </Button>
    </PopoverContent>
  )
}
