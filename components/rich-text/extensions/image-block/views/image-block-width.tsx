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
            tooltip="Resize Image"
          />
          <Popover.Content>
            <Popover.Dialog className="flex w-48 items-center justify-center">
              <Slider
                className="w-full flex flex-row justify-between"
                minValue={50}
                orientation="horizontal"
                value={value}
                onChange={handleChange}
              >
                <Slider.Track>
                  <Slider.Fill />
                  <Slider.Thumb />
                </Slider.Track>
                <Slider.Output />
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
