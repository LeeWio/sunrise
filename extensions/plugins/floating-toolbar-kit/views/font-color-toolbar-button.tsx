import { useEditorRef, useEditorSelector } from 'platejs/react'
import { useCallback, useEffect, useState } from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@heroui/react'
import { Icon } from '@iconify/react'
import { ColorPicker } from './color-picker'

type FontColorToolbarButtonProps = {
  nodeType: string
  icon: string
}

export const FontColorToolbarButton = ({
  nodeType,
  icon,
}: FontColorToolbarButtonProps) => {
  const editor = useEditorRef()

  const color = useEditorSelector(
    editor => editor.api.mark(nodeType) as string,
    []
  )

  const [selectedColor, setSelectedColor] = useState<string>()

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


  const clearColor = useCallback(() => {
    if (editor.selection) {
      editor.tf.select(editor.selection)
      editor.tf.focus()

      if (selectedColor) {
        editor.tf.removeMarks(nodeType)
      }

    }
  }, [editor, selectedColor, nodeType])

  return (
    <Popover>
      <PopoverTrigger >
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
