"use client";

import React, { useMemo, useCallback } from "react";
import {
  ColorArea,
  ColorField,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  ColorSwatchPicker,
  parseColor,
  type Color
} from "@heroui/react";
import { Shuffle, Text, BucketPaint } from "@gravity-ui/icons";
import { ToolbarButton } from "../../components";

interface TextColorPickerProps {
  /**
   * Current active color from editor state
   */
  value?: string;
  /**
   * Callback when a color is selected
   */
  onChange: (color: string) => void;
  /**
   * Picker type (text or background)
   */
  type: "text" | "background";
}

/**
 * TextColorPicker using unified ToolbarButton for perfect consistency.
 * Solves nested button error by using the 'as' prop pattern.
 */
export const TextColorPicker = React.memo(({
  value,
  onChange,
  type
}: TextColorPickerProps) => {
  // Convert hex string from Tiptap to HeroUI Color object
  const color = useMemo(() => {
    try {
      return value ? parseColor(value) : parseColor(type === "text" ? "#000000" : "#ffffff");
    } catch {
      return parseColor(type === "text" ? "#000000" : "#ffffff");
    }
  }, [value, type]);

  const handleColorChange = useCallback((newColor: Color) => {
    onChange(newColor.toString("hex"));
  }, [onChange]);

  const colorPresets = [
    "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4",
    "#3b82f6", "#8b5cf6", "#ec4899", "#f43f5e",
  ];

  const shuffleColor = useCallback(() => {
    const randomHue = Math.floor(Math.random() * 360);
    const randomSaturation = 50 + Math.floor(Math.random() * 50); // 50-100%
    const randomLightness = 40 + Math.floor(Math.random() * 30); // 40-70%
    onChange(parseColor(`hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`).toString("hex"));
  }, [onChange]);

  const label = type === "text" ? "Text Color" : "Background Color";
  const Icon = type === "text" ? Text : BucketPaint;

  return (
    <ColorPicker value={color} onChange={handleColorChange}>
      <ToolbarButton
        icon={<Icon className="size-3.5" />}
        tooltip={label}
        active={!!value}
        variant="tertiary"
        aria-label={label}
      />

      <ColorPicker.Popover className="gap-2 ">
        <ColorSwatchPicker className="justify-center pt-2" size="xs">
          {colorPresets.map((preset) => (
            <ColorSwatchPicker.Item key={preset} color={preset}>
              <ColorSwatchPicker.Swatch />
            </ColorSwatchPicker.Item>
          ))}
        </ColorSwatchPicker>

        {/* Core Selection Area */}
        <ColorArea
          aria-label="Color area"
          className="max-w-full "
          colorSpace="hsb"
          xChannel="saturation"
          yChannel="brightness"
        >
          <ColorArea.Thumb  />
        </ColorArea>

        <div className="flex items-center gap-2 px-1">
          <ColorSlider aria-label="Hue slider" channel="hue" className="flex-1" colorSpace="hsb">
            <ColorSlider.Track >
              <ColorSlider.Thumb />
            </ColorSlider.Track>
          </ColorSlider>
          <ToolbarButton
            icon={<Shuffle className="size-4" />}
            tooltip="Shuffle color"
            onPress={shuffleColor}
            variant="tertiary"
          />
        </div>

        {/* Hex Input with Clear Button in Suffix */}
        <ColorField aria-label="Color field">
          <ColorField.Group variant="secondary" >
            <ColorField.Prefix >
              <ColorSwatch size="xs" />
            </ColorField.Prefix>
            <ColorField.Input  />
          </ColorField.Group>
        </ColorField>
      </ColorPicker.Popover>
    </ColorPicker>
  );
});

TextColorPicker.displayName = "TextColorPicker";
