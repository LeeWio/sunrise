import { Button, Input, addToast } from '@heroui/react'
import { Icon } from '@iconify/react'
import { HexColorPicker } from 'react-colorful'

export type ColorPickerProps = {
  hexColor: string
  onChange: (color: string) => void
  onClear?: () => void
}

export const ColorPicker = ({
  hexColor,
  onChange,
  onClear,
}: ColorPickerProps) => {
  function copyToClipboard() {
    navigator.clipboard.writeText(hexColor)

    addToast({
      title: 'Copied!',
      description: `${hexColor} copied to clipboard`,
      color: 'success',
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <HexColorPicker
        className="!w-full"
        color={hexColor}
        onChange={onChange}
      />
      <div className="w-full flex gap-1">
        <Input
          fullWidth
          placeholder="#000000"
          size="sm"
          value={hexColor}
          onValueChange={color => onChange(color)}
        />
        <Button
          isIconOnly
          className="text-default-500"
          size="sm"
          onPress={copyToClipboard}
        >
          <Icon height="18" icon="lucide:copy" width="18" />
        </Button>
        <Button isIconOnly size="sm" onPress={onClear}>
          clear
        </Button>
      </div>
    </div>
  )
}
