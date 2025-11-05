import { BubbleMenu } from "@tiptap/react/menus";
import { useCallback } from "react";
import { useEditorState } from "@tiptap/react";

import { ImageBlock } from "../image-block";

import { ImageBlockWidth } from "./image-block-width";

import { MenuProps } from "@/components/rich-text/menus/type";
import TextMenuItem from "@/components/rich-text/menus/text-menu/components/text-menu-item";
import {
  AlignCenterFillIcon,
  AlignLeftFillIcon,
  AlignRightFillIcon,
  FlipHorizontalIcon,
  FlipVerticalIcon,
} from "@/components/icons";

export const ImageBlockMenu = ({ editor, appendTo }: MenuProps) => {
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

  const onFlipHorizontal = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageBlockFlipX(!editor.getAttributes(ImageBlock.name).flipX)
      .run();
  }, [editor]);

  const onFlipVertical = useCallback(() => {
    editor
      .chain()
      .focus(undefined, { scrollIntoView: false })
      .setImageBlockFlipY(!editor.getAttributes(ImageBlock.name).flipY)
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

  const {
    isImageCenter,
    isImageLeft,
    isImageRight,
    width,
    isImageFlipHorizontal,
    isImageFlipVertical,
  } = useEditorState({
    editor,
    selector: (ctx: { editor: typeof editor }) => {
      return {
        isImageLeft: ctx.editor.isActive(ImageBlock.name, { align: "left" }),

        isImageCenter: ctx.editor.isActive(ImageBlock.name, {
          align: "center",
        }),

        isImageRight: ctx.editor.isActive(ImageBlock.name, { align: "right" }),

        isImageFlipVertical: ctx.editor.isActive(ImageBlock.name, {
          flipY: true,
        }),

        isImageFlipHorizontal: ctx.editor.isActive(ImageBlock.name, {
          flipX: true,
        }),

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
        icon={<AlignLeftFillIcon />}
        isSelected={isImageLeft}
        tooltip=""
        onPress={onAlignImageLeft}
      />

      <TextMenuItem
        aria-label=""
        icon={<AlignCenterFillIcon />}
        isSelected={isImageCenter}
        tooltip=""
        onPress={onAlignImageCenter}
      />

      <TextMenuItem
        aria-label=""
        icon={<AlignRightFillIcon />}
        isSelected={isImageRight}
        tooltip=""
        onPress={onAlignImageRight}
      />

      <TextMenuItem
        aria-label="Flip Horizontal"
        icon={<FlipHorizontalIcon />}
        isSelected={isImageFlipHorizontal}
        tooltip="Flip Horizontal"
        onPress={onFlipHorizontal}
      />

      <TextMenuItem
        aria-label="Flip Vertical"
        icon={<FlipVerticalIcon />}
        isSelected={isImageFlipVertical}
        tooltip="Flip Vertical"
        onPress={onFlipVertical}
      />

      <ImageBlockWidth value={width} onChange={onWidthChange} />
    </BubbleMenu>
  );
};
