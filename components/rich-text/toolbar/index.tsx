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
          aria-label="Text formatting"
        >
          <ToggleButton id="bold" aria-label="Bold" onPress={commands.onBold}>
            <Bold className="size-4" />
          </ToggleButton>
          <ToggleButton id="italic" aria-label="Italic" onPress={commands.onItalic}>
            <ToggleButtonGroup.Separator />
            <Italic className="size-4" />
          </ToggleButton>
          <ToggleButton id="strike" aria-label="Strikethrough" onPress={commands.onStrike}>
            <ToggleButtonGroup.Separator />
            <Strikethrough className="size-4" />
          </ToggleButton>
          <ToggleButton id="code" aria-label="Code" onPress={commands.onCode}>
            <ToggleButtonGroup.Separator />
            <Code className="size-4" />
          </ToggleButton>
        </ToggleButtonGroup>

        <Separator orientation="vertical" className="h-6" />

        <ToggleButtonGroup
          selectionMode="single"
          selectedKeys={alignKeys}
          aria-label="Text alignment"
        >
          <ToggleButton id="left" aria-label="Align Left" onPress={commands.onAlignLeft}>
            <TextAlignLeft className="size-4" />
          </ToggleButton>
          <ToggleButton id="center" aria-label="Align Center" onPress={commands.onAlignCenter}>
            <ToggleButtonGroup.Separator />
            <TextAlignCenter className="size-4" />
          </ToggleButton>
          <ToggleButton id="right" aria-label="Align Right" onPress={commands.onAlignRight}>
            <ToggleButtonGroup.Separator />
            <TextAlignRight className="size-4" />
          </ToggleButton>
        </ToggleButtonGroup>

        <Separator orientation="vertical" className="h-6" />

        <ToggleButtonGroup 
          selectionMode="multiple" 
          selectedKeys={blockKeys}
          aria-label="Lists and blocks"
        >
          <ToggleButton id="bullet-list" aria-label="Bullet List" onPress={commands.onBulletList}>
            <ListUl className="size-4" />
          </ToggleButton>
          <ToggleButton id="ordered-list" aria-label="Ordered List" onPress={commands.onOrderedList}>
            <ToggleButtonGroup.Separator />
            <ListOl className="size-4" />
          </ToggleButton>
          <ToggleButton id="blockquote" aria-label="Blockquote" onPress={commands.onBlockquote}>
            <ToggleButtonGroup.Separator />
            <QuoteOpen className="size-4" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
    </ScrollShadow>
  );
}
