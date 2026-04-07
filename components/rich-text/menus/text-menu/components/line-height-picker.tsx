"use client";

import React from "react";
import { Dropdown, Button, Label, ButtonGroup } from "@heroui/react";
import { ChevronDown, ArrowsExpandVertical } from "@gravity-ui/icons";

interface LineHeightPickerProps {
  value?: string;
  onChange: (size: string) => void;
  onClear: () => void;
  hasSeparator?: boolean;
}

const LINE_HEIGHTS = [
  { id: "1", label: "Single" },
  { id: "1.15", label: "1.15" },
  { id: "1.5", label: "1.5" },
  { id: "2", label: "Double" },
  { id: "2.5", label: "2.5" },
  { id: "3", label: "3" },
];

export const LineHeightPicker = React.memo(
  ({ value, onChange, onClear, hasSeparator = false }: LineHeightPickerProps) => {
    return (
      <Dropdown>
        <Button size="sm" variant="tertiary">
          {hasSeparator && <ButtonGroup.Separator />}
          <ArrowsExpandVertical />
          {value || "1.15"}
          <ChevronDown />
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
            {LINE_HEIGHTS.map((item) => (
              <Dropdown.Item key={item.id} id={item.id} textValue={item.label}>
                <Label>{item.label}</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    );
  },
);

LineHeightPicker.displayName = "LineHeightPicker";
