'use client';

import {
  Color,
  parseColor,
  ColorPicker as HeroColorPicker,
  ColorArea,
  ColorSlider,
  ColorSwatchPicker,
  ColorField,
  ColorInputGroup,
  ColorSwatch,
  Button,
} from '@heroui/react';
import { ReactNode } from 'react';
import { Icon } from '@iconify/react';

export interface ColorPickerProps {
  value?: string | Color;
  onChange?: (color: Color) => void;
  children?: ReactNode;
}

export const ColorPicker = ({ value, onChange, children }: ColorPickerProps) => {
  const colorPresets = [
    '#ef4444',
    '#f97316',
    '#eab308',
    '#22c55e',
    '#06b6d4',
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
    '#f43f5e',
    '#71717a',
  ];

  const shuffleColor = () => {
    const randomHue = Math.floor(Math.random() * 360);
    const randomSaturation = 50 + Math.floor(Math.random() * 50); // 50-100%
    const randomLightness = 40 + Math.floor(Math.random() * 30); // 40-70%
    onChange?.(parseColor(`hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`));
  };

  return (
    <HeroColorPicker value={value} onChange={onChange}>
      <HeroColorPicker.Trigger>{children}</HeroColorPicker.Trigger>
      <HeroColorPicker.Popover className="gap-2">
        <ColorSwatchPicker className="justify-center pt-2" size="xs">
          {colorPresets.map((preset) => (
            <ColorSwatchPicker.Item key={preset} color={preset}>
              <ColorSwatchPicker.Swatch />
            </ColorSwatchPicker.Item>
          ))}
        </ColorSwatchPicker>

        <ColorArea
          aria-label="Color area"
          className="max-w-full"
          colorSpace="hsb"
          xChannel="saturation"
          yChannel="brightness"
        >
          <ColorArea.Thumb />
        </ColorArea>
        <div className="flex items-center gap-2 px-1">
          <ColorSlider aria-label="Hue slider" channel="hue" className="flex-1" colorSpace="hsb">
            <ColorSlider.Track>
              <ColorSlider.Thumb />
            </ColorSlider.Track>
          </ColorSlider>
          <Button
            isIconOnly
            aria-label="Shuffle color"
            size="sm"
            variant="tertiary"
            onPress={shuffleColor}
          >
            <Icon className="size-4" icon="gravity-ui:shuffle" />
          </Button>
        </div>
        <ColorField aria-label="Color field">
          <ColorInputGroup variant="secondary">
            <ColorInputGroup.Prefix>
              <ColorSwatch size="xs" />
            </ColorInputGroup.Prefix>
            <ColorInputGroup.Input />
          </ColorInputGroup>
        </ColorField>
      </HeroColorPicker.Popover>
    </HeroColorPicker>
  );
};
