import { Popover, Slider } from "@heroui/react";
import { memo, useCallback } from "react";

import { ResizeIcon } from "@/components/icons";
import TextMenuItem from "@/components/rich-text/menus/text-menu/components/text-menu-item";

interface ImageBlockWidthProps {
  onChange: (value: number) => void;
  value: number;
}
export const ImageBlockWidth = memo(
  ({ onChange, value }: ImageBlockWidthProps) => {
    const handleChange = useCallback(
      (value: number | number[]) => {
        onChange(value as number);
      },
      [onChange],
    );

    return (
      <>
        <Popover>
          <TextMenuItem
            aria-label=""
            icon={<ResizeIcon />}
            tooltip="Resize image"
          />
          <Popover.Content>
            <Popover.Dialog className="flex h-48 items-center justify-center">
              <Slider
                className="h-full"
                minValue={40}
                orientation="vertical"
                value={value}
                onChange={handleChange}
              >
                <Slider.Track>
                  <Slider.Fill />
                  <Slider.Thumb />
                </Slider.Track>
              </Slider>
            </Popover.Dialog>
          </Popover.Content>
        </Popover>
      </>
    );
  },
);

ImageBlockWidth.displayName = "ImageBlockWidth";

// <input
//     type="number"
//     value={value}
//     onChange={(e) => handleChange(e.target.valueAsNumber)}
//   />
