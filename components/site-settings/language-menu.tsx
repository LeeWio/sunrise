'use client';

import { Dropdown, Label, Description } from '@heroui/react';
import { Languages, Check, ChevronRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { setLanguage, Language } from '@/lib/features/settings/language-slice';
import { LANGUAGES } from './constants';

export function LanguageMenu() {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector((state) => state.language.language);

  return (
    <Dropdown.SubmenuTrigger>
      <Dropdown.Item id="language" textValue="Language">
        <Languages className="size-4 shrink-0 opacity-70" />
        <div className="flex flex-col">
          <Label>Language</Label>
          <Description className="text-xs">
            {LANGUAGES.find((l) => l.id === currentLanguage)?.label}
          </Description>
        </div>
        <Dropdown.SubmenuIndicator>
          <ChevronRight size={14} className="ms-auto opacity-50" />
        </Dropdown.SubmenuIndicator>
      </Dropdown.Item>

      <Dropdown.Popover className="min-w-[160px]">
        <Dropdown.Menu
          aria-label="Select language"
          selectionMode="single"
          selectedKeys={new Set([currentLanguage])}
          onAction={(key) => dispatch(setLanguage(key as Language))}
        >
          {LANGUAGES.map((l) => (
            <Dropdown.Item id={l.id} key={l.id} textValue={l.label}>
              <div className="flex w-full items-center justify-between">
                <Label>{l.label}</Label>
                {currentLanguage === l.id && <Check size={14} className="text-primary" />}
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.SubmenuTrigger>
  );
}
