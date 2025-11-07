import { BubbleMenu } from "@tiptap/react/menus";
import { Separator } from "@heroui/react";

import { MenuProps } from "../type";
import { LinkEditorPanel } from "../../panels/link-editor-panel";

import { useTextMenuStates } from "./hooks/use-text-menu-states";
import { useTextmenuCommands } from "./hooks/use-text-menu-commands";
import { useTextMenuContentTypes } from "./hooks/use-text-menu-content-types";
import TextMenuItem from "./components/text-menu-item";
import PopoverWrapper from "./components/popover-wrapper";
import MoreOptionsPicker from "./components/more-options-picker";
import ColorPicker from "./components/color-picker";

import {
  BoldIcon,
  BucketPaintIcon,
  CodeIcon,
  EllipsisVerticalIcon,
  ItalicIcon,
  LinkIcon,
  PaletteIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "@/components/icons";

export const TextMenu = ({ editor, appendTo }: MenuProps) => {
  const states = useTextMenuStates(editor);
  const commands = useTextmenuCommands(editor);
  const blockOptions = useTextMenuContentTypes(editor);

  return (
    <BubbleMenu
      appendTo={appendTo?.current || undefined}
      className="tooltip flex items-center justify-center gap-0.5 z-50"
      editor={editor}
      pluginKey="textMenu"
      resizeDelay={0}
      shouldShow={states.shouldShow}
    >
      <Separator className="mx-0.5 h-5" orientation="vertical" />

      <TextMenuItem
        aria-label="Toggle bold text"
        icon={<BoldIcon />}
        isSelected={states.isBold}
        tooltip="Bold (Ctrl+B)"
        onPress={commands.onBold}
      />

      <TextMenuItem
        aria-label="Toggle italic text"
        icon={<ItalicIcon />}
        isSelected={states.isItalic}
        tooltip="Italic (Ctrl+I)"
        onPress={commands.onItalic}
      />

      <TextMenuItem
        aria-label="Toggle underline text"
        icon={<UnderlineIcon />}
        isSelected={states.isUnderline}
        tooltip="Underline (Ctrl+U)"
        onPress={commands.onUnderline}
      />

      <TextMenuItem
        aria-label="Toggle strikethrough text"
        icon={<StrikethroughIcon />}
        isSelected={states.isStrike}
        tooltip="Strikethrough"
        onPress={commands.onStrike}
      />

      <TextMenuItem
        aria-label="Toggle code formatting"
        icon={<CodeIcon />}
        isSelected={states.isChip}
        tooltip="Code"
        onPress={commands.onChip}
      />

      <Separator className="mx-0.5 h-5" orientation="vertical" />

      <PopoverWrapper aria-label="" icon={<LinkIcon />}>
        <LinkEditorPanel onSetLink={commands.onLink} />
      </PopoverWrapper>

      <PopoverWrapper aria-label="" icon={<BucketPaintIcon />} placement="top">
        <ColorPicker
          color={states.currentHighlight}
          onChange={commands.onChangeHighlight}
          onClear={commands.onClearHighlight}
        />
      </PopoverWrapper>

      <PopoverWrapper aria-label="" icon={<PaletteIcon />} placement="top">
        <ColorPicker
          color={states.currentColor}
          onChange={commands.onChangeColor}
          onClear={commands.onClearColor}
        />
      </PopoverWrapper>

      <Separator className="mx-0.5 h-5" orientation="vertical" />

      <PopoverWrapper
        aria-label="more options"
        icon={<EllipsisVerticalIcon />}
        placement="top"
      >
        <MoreOptionsPicker editor={editor} />
      </PopoverWrapper>
    </BubbleMenu>
  );
};
