"use client";

import { Toolbar, ToggleButtonGroup, ToggleButton, Separator } from "@heroui/react";
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

export function RichTextToolbar() {
  return (
    <Toolbar
      className="flex flex-wrap items-center gap-2 rounded-lg bg-default-100 p-2 dark:bg-default-50"
      aria-label="Rich Text Formatting"
    >
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
  );
}
