import { cn, Popover } from "@heroui/react";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { ImageMenu } from "./image-menu";
import { useCallback, useMemo } from "react";

const RADIUS_CLASSES: Record<string, string> = {
  none: "rounded-none",
  md: "rounded-md",
  xl: "rounded-xl",
  "3xl": "rounded-3xl",
};

const ASPECT_CLASSES: Record<string, string> = {
  auto: "aspect-auto",
  square: "aspect-square",
  video: "aspect-video",
  "[4/3]": "aspect-[4/3]",
  "[3/2]": "aspect-[3/2]",
};

const TRANSFORM_CLASSES = {
  flip: {
    none: "",
    horizontal: "scale-x-[-1]",
    vertical: "scale-y-[-1]",
    both: "scale-[-1]",
  } as Record<string, string>,
  rotate: {
    "0": "rotate-0",
    "90": "rotate-90",
    "180": "rotate-180",
    "270": "rotate-270",
  } as Record<string, string>,
};

const SHADOW_CLASSES: Record<string, string> = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
};

const BORDER_CLASSES: Record<string, string> = {
  none: "",
  sm: "border border-border",
  md: "border-2 border-border",
  lg: "border-4 border-border",
  xl: "border-8 border-border",
};

export const ImageView = ({ editor, getPos, node }: NodeViewProps) => {
  const {
    src,
    alt,
    title,
    size,
    radius,
    aspect,
    align,
    flip,
    rotate,
    shadow,
    border,
    brightness,
    contrast,
    saturate,
  } = node.attrs;

  const alignWrapperClassName = useMemo(
    () =>
      cn(
        align === "left" ? "ml-0" : "ml-auto",
        align === "right" ? "mr-0" : "mr-auto",
        align === "center" && "mx-auto",
      ),
    [align],
  );

  const filterStyle = useMemo(
    () =>
      `brightness(${(brightness ?? 100) / 100}) contrast(${(contrast ?? 100) / 100}) saturate(${(saturate ?? 100) / 100})`,
    [brightness, contrast, saturate],
  );

  const onClick = useCallback(() => {
    const pos = getPos();

    if (pos !== undefined) {
      editor.commands.setNodeSelection(pos);
    }
  }, [getPos, editor.commands]);

  return (
    <NodeViewWrapper>
      <Popover>
        <Popover.Trigger aria-label="Edit image settings">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            onClick={onClick}
            src={src}
            alt={alt || ""}
            title={title}
            style={{
              width: size || "100%",
              filter: filterStyle,
            }}
            className={cn(
              SHADOW_CLASSES[shadow],
              ASPECT_CLASSES[aspect],
              RADIUS_CLASSES[radius],
              alignWrapperClassName,
              BORDER_CLASSES[border],
              TRANSFORM_CLASSES.flip[flip],
              TRANSFORM_CLASSES.rotate[rotate],
              "transition-all ease-in-out duration-300",
            )}
          />
        </Popover.Trigger>
        <ImageMenu editor={editor} />
      </Popover>
    </NodeViewWrapper>
  );
};
