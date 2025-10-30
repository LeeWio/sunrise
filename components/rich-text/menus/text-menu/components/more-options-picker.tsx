import { Editor } from "@tiptap/react";
import { memo } from "react";
import { Separator } from "@heroui/react";

import { useTextmenuCommands } from "../hooks/use-text-menu-commands";
import { useTextMenuStates } from "../hooks/use-text-menu-states";

import TextMenuItem from "./text-menu-item";

import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  SubscriptIcon,
  SuperscriptIcon,
} from "@/components/icons";

const MoreOptionsPicker = ({ editor }: { editor: Editor }) => {
  const commands = useTextmenuCommands(editor);
  const states = useTextMenuStates(editor);

  return (
    <>
      <TextMenuItem
        aria-label="Toggle subscript"
        icon={<SubscriptIcon />}
        isSelected={states.isSubscript}
        tooltip="Subscript"
        onPress={commands.onSubscript}
      />
      <TextMenuItem
        aria-label="Toggle superscript"
        icon={<SuperscriptIcon />}
        isSelected={states.isSuperscript}
        tooltip="Superscript"
        onPress={commands.onSuperscript}
      />

      <Separator className="mx-0.5 h-5" orientation="vertical" />

      <TextMenuItem
        aria-label="Align text left"
        icon={<AlignLeftIcon />}
        isSelected={states.isAlignLeft}
        tooltip="Align Left"
        onPress={commands.onAlignLeft}
      />

      <TextMenuItem
        aria-label="Align text center"
        icon={<AlignCenterIcon />}
        isSelected={states.isAlignCenter}
        tooltip="Align Center"
        onPress={commands.onAlignCenter}
      />

      <TextMenuItem
        aria-label="Align text right"
        icon={<AlignRightIcon />}
        isSelected={states.isAlignRight}
        tooltip="Align Right"
        onPress={commands.onAlignRight}
      />

      <TextMenuItem
        aria-label="Justify text"
        icon={<AlignJustifyIcon />}
        isSelected={states.isAlignJustify}
        tooltip="Justify"
        onPress={commands.onAlignJustify}
      />
    </>
  );
};

export default memo(MoreOptionsPicker);
