"use client";

import React from "react";
import { Dropdown, Button, Label, ButtonGroup } from "@heroui/react";
import { ChevronDown } from "@gravity-ui/icons";

interface FontSizePickerProps {
  value?: string;
  onChange: (size: string) => void;
  onClear: () => void;
  hasSeparator?: boolean;
}

export const FontSizePicker = React.memo(({ value, onChange, onClear, hasSeparator = true }: FontSizePickerProps) => {
  return (
    <Dropdown>
      <Button size="sm" variant="tertiary" >
        {hasSeparator && <ButtonGroup.Separator />}
        {value || "16px"}
        <ChevronDown className="size-3 ml-1 opacity-50" />
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu
          selectionMode="single"
          selectedKeys={new Set([value || ""])}
          onSelectionChange={(keys) => {
            const size = Array.from(keys)[0] as string;
            if (size) {
              onChange(size);
            } else {
              onClear();
            }
          }}
        >
          <Dropdown.Item id="12px" textValue="12px">
            <Label>12px</Label>
            <Dropdown.ItemIndicator />
          </Dropdown.Item>
          <Dropdown.Item id="14px" textValue="14px">
            <Label>14px</Label>
            <Dropdown.ItemIndicator />
          </Dropdown.Item>
          <Dropdown.Item id="16px" textValue="16px">
            <Label>16px</Label>
            <Dropdown.ItemIndicator />
          </Dropdown.Item>
          <Dropdown.Item id="18px" textValue="18px">
            <Label>18px</Label>
            <Dropdown.ItemIndicator />
          </Dropdown.Item>
          <Dropdown.Item id="24px" textValue="24px">
            <Label>24px</Label>
            <Dropdown.ItemIndicator />
          </Dropdown.Item>
          <Dropdown.Item id="32px" textValue="32px">
            <Label>32px</Label>
            <Dropdown.ItemIndicator />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
});

FontSizePicker.displayName = "FontSizePicker";
