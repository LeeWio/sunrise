import { Button, Popover, PopoverTrigger, PopoverContent } from '@heroui/react'
import { Icon } from '@iconify/react'
import { useEditorRef, useEditorSelector } from 'platejs/react'
import { useCallback, useEffect, useState } from 'react'

import { ColorPicker } from './color-picker'

type FontColorToolbarButtonProps = {
  nodeType: string
  icon: string
}
export const FontColorToolbarButton = ({
  nodeType,
  icon,
}: FontColorToolbarButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const editor = useEditorRef()
  const selectedDefined = useEditorSelector(editor => !!editor.selection, [])

  const color = useEditorSelector(
    editor => editor.api.mark(nodeType) as string,
    []
  )

  const [selectedColor, setSelectedColor] = useState<string>()
  const [open, setOpen] = useState(false)

  const onToggle = useCallback(
    (value = !open) => {
      setOpen(value)
    },
    [open, setOpen]
  )

  const updateColor = useCallback(
    (value: string) => {
      if (editor.selection) {
        setSelectedColor(value)
        editor.tf.select(editor.selection)
        editor.tf.focus()

        editor.tf.addMarks({ [nodeType]: value })
      }
    },
    [editor, nodeType]
  )

  const updateColorAndClose = useCallback(
    (value: string) => {
      updateColor(value)
      onToggle()
    },
    [onToggle, updateColor]
  )

  const clearColor = useCallback(() => {
    if (editor.selection) {
      editor.tf.select(editor.selection)
      editor.tf.focus()

      if (selectedColor) {
        editor.tf.removeMarks(nodeType)
      }

      onToggle()
    }
  }, [editor, selectedColor, onToggle, nodeType])

  useEffect(() => {
    if (selectedDefined) {
      setSelectedColor(color)
    }
  }, [color, selectedColor])

  return (
    <Popover isOpen={isOpen} onOpenChange={open => setIsOpen(open)}>
      <PopoverTrigger>
        <Button isIconOnly size="sm" variant="light">
          <Icon icon={icon} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <ColorPicker
          hexColor={color}
          onChange={updateColor}
          onClear={clearColor}
        />
      </PopoverContent>
    </Popover>
  )
}
