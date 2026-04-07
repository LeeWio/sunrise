"use client";

import React from "react";
import { Dropdown, Button, Label } from "@heroui/react";
import { ChevronDown } from "@gravity-ui/icons";

interface FontFamilyPickerProps {
  value?: string;
  onChange: (font: string) => void;
  onClear: () => void;
}

const FONT_FAMILIES = [
  { id: "Inter", label: "Sans Serif", font: "Inter, ui-sans-serif, system-ui" },
  { id: "Arial", label: "Arial", font: "Arial, Helvetica, sans-serif" },
  { id: "Helvetica", label: "Helvetica", font: "Helvetica, Arial, sans-serif" },
  { id: "Verdana", label: "Verdana", font: "Verdana, Geneva, sans-serif" },
  { id: "Georgia", label: "Serif", font: "Georgia, ui-serif, serif" },
  { id: "Times New Roman", label: "Times New Roman", font: "'Times New Roman', Times, serif" },
  {
    id: "Palatino",
    label: "Palatino",
    font: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
  },
  { id: "JetBrains Mono", label: "Monospace", font: "'JetBrains Mono', ui-monospace, monospace" },
  { id: "Courier New", label: "Typewriter", font: "'Courier New', Courier, monospace" },
  { id: "Comic Sans MS", label: "Handwritten", font: "'Comic Sans MS', cursive, sans-serif" },
  {
    id: "Impact",
    label: "Display",
    font: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
  },
];

export const FontFamilyPicker = React.memo(
  ({ value, onChange, onClear }: FontFamilyPickerProps) => {
    return (
      <Dropdown>
        <Button size="sm" variant="tertiary">
          {value || "Inter"}
          <ChevronDown />
        </Button>
        <Dropdown.Popover>
          <Dropdown.Menu
            selectionMode="single"
            selectedKeys={new Set([value || ""])}
            onSelectionChange={(keys) => {
              const font = Array.from(keys)[0] as string;
              if (font) {
                onChange(font);
              } else {
                onClear();
              }
            }}
          >
            {FONT_FAMILIES.map((f) => (
              <Dropdown.Item key={f.id} id={f.id} textValue={f.label}>
                <Label style={{ fontFamily: f.font }}>{f.label}</Label>
                <Dropdown.ItemIndicator />
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    );
  },
);

FontFamilyPicker.displayName = "FontFamilyPicker";
