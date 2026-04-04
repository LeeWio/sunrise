"use client";

import { Dropdown, Button, Label, Description, Header, Separator } from "@heroui/react";
import { Bars, FileArrowDown, FileArrowUp, LogoMarkdown, FileCode } from "@gravity-ui/icons";

export function FileDropdown() {
  const handleAction = (key: React.Key) => {
    // TODO: Implement actual import/export logic later
    console.log("File action triggered:", key);
  };

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button variant="light" isIconOnly aria-label="File Options" className="text-default-600">
          <Bars className="size-5" />
        </Button>
      </Dropdown.Trigger>
      
      <Dropdown.Popover placement="bottom start">
        <Dropdown.Menu onAction={handleAction} aria-label="File actions">
          <Dropdown.Section>
            <Header className="text-xs font-semibold text-default-500">Import</Header>
            <Dropdown.Item id="import-md" textValue="Import Markdown">
              <div className="flex items-center gap-2">
                <FileArrowDown className="size-4 text-default-500" />
                <div className="flex flex-col">
                  <Label>Import Markdown</Label>
                  <Description>Overwrite current content</Description>
                </div>
              </div>
            </Dropdown.Item>
          </Dropdown.Section>

          <Separator className="my-1" />

          <Dropdown.Section>
            <Header className="text-xs font-semibold text-default-500">Export As</Header>
            <Dropdown.Item id="export-md" textValue="Markdown">
              <div className="flex items-center gap-2">
                <LogoMarkdown className="size-4 text-default-500" />
                <Label>Markdown (.md)</Label>
              </div>
            </Dropdown.Item>
            <Dropdown.Item id="export-html" textValue="HTML Document">
              <div className="flex items-center gap-2">
                <FileCode className="size-4 text-default-500" />
                <Label>HTML Document</Label>
              </div>
            </Dropdown.Item>
            <Dropdown.Item id="export-json" textValue="Raw JSON">
              <div className="flex items-center gap-2">
                <FileArrowUp className="size-4 text-default-500" />
                <Label>Raw JSON (Tiptap)</Label>
              </div>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
