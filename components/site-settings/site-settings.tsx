'use client';

import { Button, Dropdown, Separator, Label } from '@heroui/react';
import { useIsSSR } from '@react-aria/ssr';
import { Settings, User, LogOut } from 'lucide-react';
import { ThemeMenu } from './theme-menu';
import { LanguageMenu } from './language-menu';
import clsx from 'clsx';

export function SiteSettings({ className }: { className?: string }) {
  const isSSR = useIsSSR();

  if (isSSR) return null;

  return (
    <Dropdown>
      <Button
        isIconOnly
        variant="light"
        className={clsx('rounded-full', className)}
        aria-label="Open site settings"
      >
        <Settings size={20} />
      </Button>

      <Dropdown.Popover className="min-w-[240px]">
        <Dropdown.Menu aria-label="Site settings menu">
          {/* Preferences Section */}
          <Dropdown.Section>
            <ThemeMenu />
            <LanguageMenu />
          </Dropdown.Section>

          <Separator className="my-1" />

          {/* Account Section */}
          <Dropdown.Section>
            <Dropdown.Item id="profile" textValue="Profile">
              <User className="size-4 shrink-0 opacity-70" />
              <Label>Profile</Label>
            </Dropdown.Item>
            <Dropdown.Item id="logout" textValue="Log out" variant="danger">
              <LogOut className="text-danger size-4 shrink-0 opacity-70" />
              <Label className="text-danger">Log out</Label>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
