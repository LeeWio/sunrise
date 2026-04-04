"use client";

import React from "react";
import { useTiptap } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { Separator } from "@heroui/react";
import { Bold, Italic, Underline, Strikethrough, Code, Superscript } from "@gravity-ui/icons";
import { Subscript } from "@/components/icons";
import { MenuContainer } from "../menu-container";
import { useTextMenuStates } from "./hooks/use-text-menu-states";
import { TextColorPicker } from "./components/color-picker";
import { useRichTextCommands } from "../../../../hooks/use-rich-text-commands";
import { ToolbarButton } from "../components";

interface TextMenuProps {
  /**
   * The element to which the bubble menu should be appended to.
   */
  appendTo?: React.RefObject<HTMLElement | null> | HTMLElement | (() => HTMLElement);
}

/**
 * TextMenu component for inline text formatting.
 * Leveraging Tiptap 3 BubbleMenu and project-wide MenuContainer.
 */
export function TextMenu({ appendTo }: TextMenuProps) {
  const { editor } = useTiptap();

  const commands = useRichTextCommands(editor);
  const states = useTextMenuStates(editor);

  if (!editor) return null;

  // Resolve appendTo for Floating UI
  const getAppendTo = () => {
    if (typeof appendTo === "function") return appendTo();
    if (appendTo && "current" in appendTo) return appendTo.current || undefined;
    return appendTo || undefined;
  };

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="textMenu"
      shouldShow={states.shouldShow}
      appendTo={getAppendTo()}
      options={{
        placement: "top",
        offset: 8,
      }}
    >
      <MenuContainer
        layout
        initial={{ opacity: 0, scale: 0.95, y: 5 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 5 }}
        aria-label="Text formatting menu"
        className="flex items-center gap-0.5 px-1 py-1"
      >
        <div className="flex items-center gap-0.5">
          <TextColorPicker
            type="text"
            value={states.textColor}
            onChange={commands.onSetColor}
            onClear={commands.onUnsetColor}
          />
          <TextColorPicker
            type="background"
            value={states.backgroundColor}
            onChange={commands.onSetBackgroundColor}
            onClear={commands.onUnsetBackgroundColor}
          />
        </div>

        <Separator orientation="vertical" className="mx-1 h-4" />

        <div className="flex items-center gap-0.5">
          <ToolbarButton
            icon={<Bold className="size-3.5" />}
            tooltip="Bold"
            active={states.isBold}
            onPress={commands.onBold}
          />
          <ToolbarButton
            icon={<Italic className="size-3.5" />}
            tooltip="Italic"
            active={states.isItalic}
            onPress={commands.onItalic}
          />
          <ToolbarButton
            icon={<Underline className="size-3.5" />}
            tooltip="Underline"
            active={states.isUnderline}
            onPress={commands.onUnderline}
          />
          <ToolbarButton
            icon={<Strikethrough className="size-3.5" />}
            tooltip="Strikethrough"
            active={states.isStrike}
            onPress={commands.onStrike}
          />
          <ToolbarButton
            icon={<Code className="size-3.5" />}
            tooltip="Code"
            active={states.isCode}
            onPress={commands.onCode}
          />
          <ToolbarButton
            icon={<Subscript className="size-3.5" />}
            tooltip="Subscript"
            active={states.isSubscript}
            onPress={commands.onSubscript}
          />
          <ToolbarButton
            icon={<Superscript className="size-3.5" />}
            tooltip="Superscript"
            active={states.isSuperscript}
            onPress={commands.onSuperscript}
          />
        </div>
      </MenuContainer>
    </BubbleMenu>
  );
}
