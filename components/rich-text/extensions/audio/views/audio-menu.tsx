import { BubbleMenu } from "@tiptap/react/menus";
import { useCallback } from "react";

import { Audio } from "../audio";

import { MenuProps } from "@/components/rich-text/menus/type";

export const AudioMenu = ({ editor, appendTo }: MenuProps) => {
  const shouldShow = useCallback(() => {
    return editor.isActive(Audio.name);
  }, [editor]);

  return (
    <BubbleMenu
      appendTo={appendTo?.current || undefined}
      className="tooltip flex items-center justify-center gap-0.5 z-50"
      editor={editor}
      pluginKey="audio-menu"
      shouldShow={shouldShow}
    >
      audio menu
    </BubbleMenu>
  );
};
