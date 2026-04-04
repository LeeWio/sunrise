"use client";

import { Toolbar, ToggleButtonGroup, ToggleButton, Separator, ScrollShadow, Button } from "@heroui/react";
import { useTiptap, useTiptapState } from "@tiptap/react";
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

export function RichTextToolbar() {
  const { editor, isReady } = useTiptap();

  // Performance Optimization: Subscribe only to the specific states we need
  const isBold = useTiptapState((state) => state.editor.isActive("bold"));
  const isItalic = useTiptapState((state) => state.editor.isActive("italic"));
  const isStrike = useTiptapState((state) => state.editor.isActive("strike"));
  const isCode = useTiptapState((state) => state.editor.isActive("code"));

  const isAlignLeft = useTiptapState((state) => state.editor.isActive({ textAlign: "left" }));
  const isAlignCenter = useTiptapState((state) => state.editor.isActive({ textAlign: "center" }));
  const isAlignRight = useTiptapState((state) => state.editor.isActive({ textAlign: "right" }));

  const isBulletList = useTiptapState((state) => state.editor.isActive("bulletList"));
  const isOrderedList = useTiptapState((state) => state.editor.isActive("orderedList"));
  const isBlockquote = useTiptapState((state) => state.editor.isActive("blockquote"));

  const canUndo = useTiptapState((state) => state.editor.can().undo());
  const canRedo = useTiptapState((state) => state.editor.can().redo());

  if (!isReady || !editor) return null;

  // Compute selected keys for formats
  const formatKeys = new Set<string>();
  if (isBold) formatKeys.add("bold");
  if (isItalic) formatKeys.add("italic");
  if (isStrike) formatKeys.add("strike");
  if (isCode) formatKeys.add("code");

  // Compute selected keys for alignment
  const alignKeys = new Set<string>();
  if (isAlignLeft) alignKeys.add("left");
  if (isAlignCenter) alignKeys.add("center");
  if (isAlignRight) alignKeys.add("right");

  // Compute selected keys for lists and blocks
  const blockKeys = new Set<string>();
  if (isBulletList) blockKeys.add("bullet-list");
  if (isOrderedList) blockKeys.add("ordered-list");
  if (isBlockquote) blockKeys.add("blockquote");

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
            isDisabled={!canUndo}
            onPress={() => editor.chain().focus().undo().run()}
            className="text-default-600 border-none"
          >
            <ArrowShapeTurnUpLeft className="size-4" />
          </Button>
          <Button 
            variant="ghost" 
            isIconOnly 
            aria-label="Redo" 
            isDisabled={!canRedo}
            onPress={() => editor.chain().focus().redo().run()}
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
            if (key === "bold") editor.chain().focus().toggleBold().run();
            if (key === "italic") editor.chain().focus().toggleItalic().run();
            if (key === "strike") editor.chain().focus().toggleStrike().run();
            if (key === "code") editor.chain().focus().toggleCode().run();
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
            if (key === "left") editor.chain().focus().setTextAlign('left').run();
            if (key === "center") editor.chain().focus().setTextAlign('center').run();
            if (key === "right") editor.chain().focus().setTextAlign('right').run();
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
            if (key === "bullet-list") editor.chain().focus().toggleBulletList().run();
            if (key === "ordered-list") editor.chain().focus().toggleOrderedList().run();
            if (key === "blockquote") editor.chain().focus().toggleBlockquote().run();
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
