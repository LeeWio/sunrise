import { Button, Input, addToast } from '@heroui/react'
import { HexColorPicker } from 'react-colorful'

import { ArrowUturnCcwLeft, CopyIcon } from '../icons'

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
    <div className="flex flex-col gap-2  ignore-click-outside">
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
          variant="flat"
          onValueChange={color => onChange(color)}
        />
        <Button
          isIconOnly
          className="text-default-500"
          size="sm"
          variant="flat"
          onPress={copyToClipboard}
        >
          <CopyIcon size={18} />
        </Button>
      </div>
      <div className="flex justify-between">
        <Button
          isIconOnly
          className="bg-[#006FEE]"
          data-hover={false}
          size="sm"
          value="#006FEE"
          variant="light"
          onPress={() => onChange('#006FEE')}
        />
        <Button
          isIconOnly
          className="bg-[#7828C8]"
          data-hover={false}
          size="sm"
          value="#7828C8"
          variant="light"
          onPress={() => onChange('#7828C8')}
        />
        <Button
          isIconOnly
          className="bg-[#17C964]"
          data-hover={false}
          size="sm"
          value="#17C964"
          variant="light"
          onPress={() => onChange('#17C964')}
        />
        <Button
          isIconOnly
          className="bg-[#F31260]"
          data-hover={false}
          size="sm"
          value="#F31260"
          variant="light"
          onPress={() => onChange('#F31260')}
        />
        <Button
          isIconOnly
          className="bg-[#7EE7FC]"
          data-hover={false}
          size="sm"
          value="#7EE7FC"
          variant="light"
          onPress={() => onChange('#7EE7FC')}
        />
        <Button
          isIconOnly
          className="text-default-500"
          size="sm"
          variant="flat"
          onPress={onClear}
        >
          <ArrowUturnCcwLeft size={18} />
        </Button>
      </div>
    </div>
  )
}
