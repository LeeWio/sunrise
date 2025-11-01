import { BubbleMenu } from "@tiptap/react/menus";
import { useCallback, useRef } from "react";
import { useEditorState } from "@tiptap/react";

import { ImageBlock } from "../image-block";

import { MenuProps } from "@/components/rich-text/menus/type";
import TextMenuItem from "@/components/rich-text/menus/text-menu/components/text-menu-item";
import { AlignLeftIcon } from "@/components/icons";

export const ImageBlockMenu = ({ editor, appendTo }: MenuProps) => {
  const menuRef = useRef(null);

  const shouldShow = useCallback(() => {
    return editor.isActive(ImageBlock.name);
  }, [editor]);

  const onAlignImageLeft = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageBlockAlign("left")
      .run();
  }, [editor]);

  const onAlignImageCenter = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageBlockAlign("center")
      .run();
  }, [editor]);

  const onAlignImageRight = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageBlockAlign("right")
      .run();
  }, [editor]);

  const onWidthChange = useCallback(
    (value: number) => {
      editor
        .chain()
        .focus(undefined, { scrollIntoView: false })
        .setImageBlockWidth(value)
        .run();
    },
    [editor],
  );

  const { isImageCenter, isImageLeft, isImageRight, width } = useEditorState({
    editor,
    selector: (ctx: { editor: typeof editor }) => {
      return {
        isImageLeft: ctx.editor.isActive(ImageBlock.name, { align: "left" }),
        isImageCenter: ctx.editor.isActive(ImageBlock.name, {
          align: "center",
        }),
        isImageRight: ctx.editor.isActive(ImageBlock.name, { align: "right" }),
        width: parseInt(ctx.editor.getAttributes(ImageBlock.name)?.width || 0),
      };
    },
  });

  return (
    <BubbleMenu
      appendTo={appendTo?.current || undefined}
      className="tooltip flex items-center justify-center gap-0.5 z-50"
      editor={editor}
      pluginKey="image-menu"
      resizeDelay={0}
      shouldShow={shouldShow}
    >
      <TextMenuItem
        aria-label=""
        icon={<AlignLeftIcon />}
        isSelected={isImageLeft}
        tooltip="Bold (Ctrl+B)"
        onPress={onAlignImageLeft}
      />
    </BubbleMenu>
  );
};
