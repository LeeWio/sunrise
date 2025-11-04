import { memo, useCallback } from "react";

interface ImageBlockWidthProps {
  onChange: (value: number) => void;
  value: number;
}
export const ImageBlockWidth = memo(
  ({ onChange, value }: ImageBlockWidthProps) => {
    const handleChange = useCallback(
      (value: number) => {
        onChange(value);
      },
      [onChange],
    );

    return (
      <input
        type="number"
        value={value}
        onChange={(e) => handleChange(e.target.valueAsNumber)}
      />
    );
  },
);

ImageBlockWidth.displayName = "ImageBlockWidth";
