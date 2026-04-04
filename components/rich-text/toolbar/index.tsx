"use client";

import { Toolbar, ToggleButtonGroup, ToggleButton, Separator, ScrollShadow, Button } from "@heroui/react";
import { useTiptap } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
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

  if (!state) return null;

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
          aria-label="Text formatting"
        >
          <ToggleButton id="bold" aria-label="Bold" isSelected={state.isBold} onPress={commands.onBold}>
            <Bold className="size-4" />
          </ToggleButton>
          <ToggleButton id="italic" aria-label="Italic" isSelected={state.isItalic} onPress={commands.onItalic}>
            <ToggleButtonGroup.Separator />
            <Italic className="size-4" />
          </ToggleButton>
          <ToggleButton id="underline" aria-label="Underline" isSelected={state.isUnderline} onPress={commands.onUnderline}>
            <ToggleButtonGroup.Separator />
            <UnderlineIcon className="size-4" />
          </ToggleButton>
          <ToggleButton id="strike" aria-label="Strikethrough" isSelected={state.isStrike} onPress={commands.onStrike}>
            <ToggleButtonGroup.Separator />
            <Strikethrough className="size-4" />
          </ToggleButton>
          <ToggleButton id="code" aria-label="Code" isSelected={state.isCode} onPress={commands.onCode}>
            <ToggleButtonGroup.Separator />
            <Code className="size-4" />
          </ToggleButton>
        </ToggleButtonGroup>

        <Separator orientation="vertical" className="h-6" />

        <ToggleButtonGroup
          selectionMode="single"
          aria-label="Text alignment"
        >
          <ToggleButton id="left" aria-label="Align Left" isSelected={state.isAlignLeft} onPress={commands.onAlignLeft}>
            <TextAlignLeft className="size-4" />
          </ToggleButton>
          <ToggleButton id="center" aria-label="Align Center" isSelected={state.isAlignCenter} onPress={commands.onAlignCenter}>
            <ToggleButtonGroup.Separator />
            <TextAlignCenter className="size-4" />
          </ToggleButton>
          <ToggleButton id="right" aria-label="Align Right" isSelected={state.isAlignRight} onPress={commands.onAlignRight}>
            <ToggleButtonGroup.Separator />
            <TextAlignRight className="size-4" />
          </ToggleButton>
        </ToggleButtonGroup>

        <Separator orientation="vertical" className="h-6" />

        <ToggleButtonGroup 
          selectionMode="multiple" 
          aria-label="Lists and blocks"
        >
          <ToggleButton id="bullet-list" aria-label="Bullet List" isSelected={state.isBulletList} onPress={commands.onBulletList}>
            <ListUl className="size-4" />
          </ToggleButton>
          <ToggleButton id="ordered-list" aria-label="Ordered List" isSelected={state.isOrderedList} onPress={commands.onOrderedList}>
            <ToggleButtonGroup.Separator />
            <ListOl className="size-4" />
          </ToggleButton>
          <ToggleButton id="blockquote" aria-label="Blockquote" isSelected={state.isBlockquote} onPress={commands.onBlockquote}>
            <ToggleButtonGroup.Separator />
            <QuoteOpen className="size-4" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
    </ScrollShadow>
  );
}
