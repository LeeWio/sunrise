"use client";

import { Dropdown, Button, Label, Description, Header, Separator, Kbd } from "@heroui/react";
import {
  Bars,
  FileArrowDown,
  FileArrowRightOut,
  LogoMarkdown,
  FileCode,
  FileArrowUp,
  TrashBin,
} from "@gravity-ui/icons";

export function FileDropdown() {
  const handleAction = (key: React.Key) => {
    // TODO: Implement actual import/export/clear logic later
    console.log("File action triggered:", key);
  };

  return (
    <Dropdown>
      <Button
        variant="ghost"
        isIconOnly
        aria-label="File Options"
        className="text-default-600 border-none "
      >
        <Bars className="size-5" />
      </Button>

      <Dropdown.Popover placement="bottom start" className="min-w-[280px]">
        <Dropdown.Menu onAction={handleAction} aria-label="File actions">
          <Dropdown.Section>
            <Header>File</Header>

            {/* Import Item with Description and Keyboard Shortcut */}
            <Dropdown.Item id="import-md" textValue="Import Markdown">
              <div className="flex h-8 items-start justify-center pt-px">
                <FileArrowDown className="text-muted size-4 shrink-0" />
              </div>
              <div className="flex flex-col">
                <Label>Import Markdown</Label>
                <Description>Overwrite current content</Description>
              </div>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>I</Kbd.Content>
              </Kbd>
            </Dropdown.Item>

            {/* Export Submenu Trigger */}
            <Dropdown.SubmenuTrigger>
              <Dropdown.Item id="export-submenu" textValue="Export As...">
                <div className="flex h-8 items-start justify-center pt-px">
                  <FileArrowRightOut className="text-muted size-4 shrink-0" />
                </div>
                <div className="flex flex-col">
                  <Label>Export As...</Label>
                  <Description>Download in various formats</Description>
                </div>
                <Dropdown.SubmenuIndicator />
              </Dropdown.Item>

              <Dropdown.Popover>
                <Dropdown.Menu onAction={handleAction} aria-label="Export Formats">
                  <Dropdown.Item id="export-md" textValue="Markdown">
                    <LogoMarkdown className="text-muted size-4 shrink-0" />
                    <Label>Markdown (.md)</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="export-html" textValue="HTML Document">
                    <FileCode className="text-muted size-4 shrink-0" />
                    <Label>HTML Document</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="export-json" textValue="Raw JSON">
                    <FileArrowUp className="text-muted size-4 shrink-0" />
                    <Label>Raw JSON (Tiptap)</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown.SubmenuTrigger>
          </Dropdown.Section>

          <Separator />

          <Dropdown.Section>
            <Header>Danger Zone</Header>
            <Dropdown.Item id="clear-content" textValue="Clear Content" variant="danger">
              <TrashBin className="text-danger size-4 shrink-0" />
              <Label>Clear Content</Label>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Abbr keyValue="shift" />
                <Kbd.Content>D</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
