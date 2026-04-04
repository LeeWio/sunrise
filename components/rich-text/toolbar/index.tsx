"use client";

import { Toolbar, ToggleButtonGroup, ToggleButton, Separator, ScrollShadow } from "@heroui/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  TextAlignLeft,
  TextAlignCenter,
  TextAlignRight,
  ListUl,
  ListOl,
  QuoteOpen,
} from "@gravity-ui/icons";
import { FileDropdown } from "./file-dropdown";

export function RichTextToolbar() {
  return (
    <ScrollShadow
      orientation="horizontal"
      hideScrollBar
      size={20}
      className="flex w-full rounded-lg bg-default-100 p-2 dark:bg-default-50"
    >
      <Toolbar
        className="flex flex-nowrap items-center gap-2 bg-transparent p-0 w-max"
        aria-label="Rich Text Formatting"
      >
        <FileDropdown />
        
        <Separator orientation="vertical" className="h-6" />

        <ToggleButtonGroup selectionMode="multiple" aria-label="Text formatting">
          <ToggleButton id="bold" aria-label="Bold">
            <Bold className="size-4" />
          </ToggleButton>
          <ToggleButton id="italic" aria-label="Italic">
            <ToggleButtonGroup.Separator />
            <Italic className="size-4" />
          </ToggleButton>
          <ToggleButton id="strike" aria-label="Strikethrough">
            <ToggleButtonGroup.Separator />
            <Strikethrough className="size-4" />
          </ToggleButton>
          <ToggleButton id="code" aria-label="Code">
            <ToggleButtonGroup.Separator />
            <Code className="size-4" />
          </ToggleButton>
        </ToggleButtonGroup>

        <Separator orientation="vertical" className="h-6" />

        <ToggleButtonGroup
          selectionMode="single"
          defaultSelectedKeys={new Set(["left"])}
          aria-label="Text alignment"
        >
          <ToggleButton id="left" aria-label="Align Left">
            <TextAlignLeft className="size-4" />
          </ToggleButton>
          <ToggleButton id="center" aria-label="Align Center">
            <ToggleButtonGroup.Separator />
            <TextAlignCenter className="size-4" />
          </ToggleButton>
          <ToggleButton id="right" aria-label="Align Right">
            <ToggleButtonGroup.Separator />
            <TextAlignRight className="size-4" />
          </ToggleButton>
        </ToggleButtonGroup>

        <Separator orientation="vertical" className="h-6" />

        <ToggleButtonGroup selectionMode="multiple" aria-label="Lists and blocks">
          <ToggleButton id="bullet-list" aria-label="Bullet List">
            <ListUl className="size-4" />
          </ToggleButton>
          <ToggleButton id="ordered-list" aria-label="Ordered List">
            <ToggleButtonGroup.Separator />
            <ListOl className="size-4" />
          </ToggleButton>
          <ToggleButton id="blockquote" aria-label="Blockquote">
            <ToggleButtonGroup.Separator />
            <QuoteOpen className="size-4" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
    </ScrollShadow>
  );
}
