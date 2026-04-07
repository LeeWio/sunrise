"use client";

import React from "react";
import { useTiptap } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { ButtonGroup } from "@heroui/react";
import { Bold, Italic, Underline, Strikethrough, Code, Superscript } from "@gravity-ui/icons";
import { Subscript } from "@/components/icons";
import { MenuContainer } from "../menu-container";
import { useTextMenuStates } from "./hooks/use-text-menu-states";
import { TextColorPicker } from "./components/color-picker";
import { FontFamilyPicker } from "./components/font-family-picker";
import { FontSizePicker } from "./components/font-size-picker";
import { LineHeightPicker } from "./components/line-height-picker";
import { useRichTextCommands } from "../../../../hooks/use-rich-text-commands";
import { ToggleButton } from "../components";
import { ToggleButtonGroup } from "@heroui/react";

interface TextMenuProps {
  /**
   * The element to which the bubble menu should be appended to.
   */
  appendTo?: React.RefObject<HTMLElement | null> | HTMLElement | (() => HTMLElement);
}

export function TextMenu({ appendTo }: TextMenuProps) {
  const { editor } = useTiptap();

  const commands = useRichTextCommands(editor);
  const states = useTextMenuStates(editor);

  if (!editor) return null;

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
      <MenuContainer aria-label="Text formatting menu">
        <ButtonGroup size="sm" variant="tertiary">
          <FontFamilyPicker
            value={states.fontFamily}
            onChange={commands.onSetFontFamily}
            onClear={commands.onUnsetFontFamily}
          />
          <FontSizePicker
            value={states.fontSize}
            onChange={commands.onSetFontSize}
            onClear={commands.onUnsetFontSize}
          />
          <LineHeightPicker
            value={states.lineHeight}
            onChange={commands.onSetLineHeight}
            onClear={commands.onUnsetLineHeight}
          />
        </ButtonGroup>

        <ToggleButtonGroup size="sm">
          <ToggleButton
            icon={<Bold />}
            tooltip="Bold"
            isSelected={states.isBold}
            onPress={commands.onBold}
            aria-label="Bold"
          />
          <ToggleButton
            icon={<Italic />}
            tooltip="Italic"
            isSelected={states.isItalic}
            onPress={commands.onItalic}
            aria-label="Italic"
          />
          <ToggleButton
            icon={<Underline />}
            tooltip="Underline"
            isSelected={states.isUnderline}
            onPress={commands.onUnderline}
            aria-label="Underline"
          />
          <ToggleButton
            icon={<Strikethrough />}
            tooltip="Strikethrough"
            isSelected={states.isStrike}
            onPress={commands.onStrike}
            aria-label="Strikethrough"
          />
        </ToggleButtonGroup>

        <ButtonGroup size="sm" variant="tertiary">
          <ToggleButton
            icon={<Code />}
            tooltip="Code"
            isSelected={states.isCode}
            onPress={commands.onCode}
            aria-label="Code"
          />
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
        </ButtonGroup>

        <ToggleButtonGroup size="sm">
          <ToggleButton
            icon={<Subscript />}
            tooltip="Subscript"
            isSelected={states.isSubscript}
            onPress={commands.onSubscript}
            aria-label="Subscript"
          />
          <ToggleButton
            icon={<Superscript />}
            tooltip="Superscript"
            isSelected={states.isSuperscript}
            onPress={commands.onSuperscript}
            aria-label="Superscript"
          />
        </ToggleButtonGroup>
      </MenuContainer>
    </BubbleMenu>
  );
}
