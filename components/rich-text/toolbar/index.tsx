"use client";

import { Toolbar, ToggleButtonGroup, ToggleButton, Separator, ScrollShadow, Button } from "@heroui/react";
import { useTiptap } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
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
  ArrowShapeTurnUpLeft,
  ArrowShapeTurnUpRight,
} from "@gravity-ui/icons";
import { FileDropdown } from "./file-dropdown";
import { useRichTextState } from "../../../hooks/use-rich-text-state";
import { useRichTextCommands } from "../../../hooks/use-rich-text-commands";

export function RichTextToolbar() {
  const { editor } = useTiptap();

  if (!editor) return null;

  return <RichTextToolbarInner editor={editor} />;
}

function RichTextToolbarInner({ editor }: { editor: Editor }) {
  const state = useRichTextState(editor);
  const commands = useRichTextCommands(editor);

  // Compute selected keys for formats
  const formatKeys = new Set<string>();
  if (state.isBold) formatKeys.add("bold");
  if (state.isItalic) formatKeys.add("italic");
  if (state.isStrike) formatKeys.add("strike");
  if (state.isCode) formatKeys.add("code");

  // Compute selected keys for alignment
  const alignKeys = new Set<string>();
  if (state.isAlignLeft) alignKeys.add("left");
  if (state.isAlignCenter) alignKeys.add("center");
  if (state.isAlignRight) alignKeys.add("right");

  // Compute selected keys for lists and blocks
  const blockKeys = new Set<string>();
  if (state.isBulletList) blockKeys.add("bullet-list");
  if (state.isOrderedList) blockKeys.add("ordered-list");
  if (state.isBlockquote) blockKeys.add("blockquote");

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

        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            isIconOnly 
            aria-label="Undo" 
            isDisabled={!state.canUndo}
            onPress={commands.onUndo}
            className="text-default-600 border-none"
          >
            <ArrowShapeTurnUpLeft className="size-4" />
          </Button>
          <Button 
            variant="ghost" 
            isIconOnly 
            aria-label="Redo" 
            isDisabled={!state.canRedo}
            onPress={commands.onRedo}
            className="text-default-600 border-none"
          >
            <ArrowShapeTurnUpRight className="size-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <ToggleButtonGroup 
          selectionMode="multiple" 
          selectedKeys={formatKeys}
          onAction={(key) => {
            if (key === "bold") commands.onBold();
            if (key === "italic") commands.onItalic();
            if (key === "strike") commands.onStrike();
            if (key === "code") commands.onCode();
          }}
          aria-label="Text formatting"
        >
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
          selectedKeys={alignKeys}
          onAction={(key) => {
            if (key === "left") commands.onAlignLeft();
            if (key === "center") commands.onAlignCenter();
            if (key === "right") commands.onAlignRight();
          }}
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

        <ToggleButtonGroup 
          selectionMode="multiple" 
          selectedKeys={blockKeys}
          onAction={(key) => {
            if (key === "bullet-list") commands.onBulletList();
            if (key === "ordered-list") commands.onOrderedList();
            if (key === "blockquote") commands.onBlockquote();
          }}
          aria-label="Lists and blocks"
        >
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
