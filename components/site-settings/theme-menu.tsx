'use client';

import { Dropdown, Label, Description, ScrollShadow } from '@heroui/react';
import { Palette, Check, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setTheme, AppTheme } from '@/lib/features/settings/theme-slice';
import { THEMES } from './constants';

export function ThemeMenu() {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.theme.theme);

  return (
    <Dropdown.SubmenuTrigger>
      <Dropdown.Item id="appearance" textValue="Appearance">
        <Palette className="size-4 shrink-0 opacity-70" />
        <div className="flex flex-col">
          <Label>Appearance</Label>
          <Description className="text-xs">
            {THEMES.find((t) => t.id === currentTheme)?.label}
          </Description>
        </div>
        <Dropdown.SubmenuIndicator>
          <ChevronRight size={14} className="ms-auto opacity-50" />
        </Dropdown.SubmenuIndicator>
      </Dropdown.Item>

      <Dropdown.Popover className="min-w-[220px]">
        <ScrollShadow hideScrollBar size={60} className="max-h-[400px]">
          <Dropdown.Menu
            aria-label="Select theme"
            selectionMode="single"
            selectedKeys={new Set([currentTheme])}
            onAction={(key) => dispatch(setTheme(key as AppTheme))}
          >
            {THEMES.map((t) => (
              <Dropdown.Item id={t.id} key={t.id} textValue={t.label}>
                <div className="flex w-full items-center justify-between">
                  <Label>{t.label}</Label>
                  {currentTheme === t.id && <Check size={14} className="text-primary" />}
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </ScrollShadow>
      </Dropdown.Popover>
    </Dropdown.SubmenuTrigger>
  );
}
