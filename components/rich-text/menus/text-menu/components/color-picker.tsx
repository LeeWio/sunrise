import { Input } from "@heroui/react";
import { memo, useCallback, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

export type ColorPickerProps = {
  color?: string;
  onChange?: (color: string) => void;
  onClear?: () => void;
};

const ColorPicker = ({ color, onChange, onClear }: ColorPickerProps) => {
  const [selectedColor, setSelectedColor] = useState(color);

  const handleChange = useCallback(
    (updatedHexColor: string) => {
      const isCorrectColor = /^#([0-9A-F]{3}){1,2}$/i.test(updatedHexColor);

      if (!isCorrectColor) {
        if (onChange) {
          onChange("");
          setSelectedColor("");
        }

        return;
      }

      if (onChange) {
        onChange(updatedHexColor);
        setSelectedColor(updatedHexColor);
      }
    },
    [selectedColor, onChange],
  );

  /**
   * Update the selected color when the popover is opened.
   */
  useEffect(() => {
    setSelectedColor(color);
  }, [color]);

  return (
    <div className="flex flex-col gap-2">
      <HexColorPicker
        className="w-full!"
        color={selectedColor}
        onChange={handleChange}
      />

      <Input disabled defaultValue={selectedColor} placeholder="#000000" />
    </div>
  );
};

export default memo(ColorPicker);
