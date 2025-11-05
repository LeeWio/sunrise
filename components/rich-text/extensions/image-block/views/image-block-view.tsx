import { cn } from "@heroui/react";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useCallback, useRef, useState } from "react";

export const ImageBlockView = ({
  editor,
  getPos,
  node,
  selected,
}: NodeViewProps) => {
  const { src, width, align, alt, flipX, flipY } = node.attrs;
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);

  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  const wrapperClassName = cn(
    align === "left" ? "ml-0" : "ml-auto",
    align === "right" ? "mr-0" : "mr-auto",
    align === "center" && "mx-auto",
  );

  const imageStyle = {
    transform: `${flipX ? "scaleX(-1)" : ""} ${flipY ? "scaleY(-1)" : ""}`,
    width: width,
    transition: "transform 0.3s ease-in-out",
  };

  const onClick = useCallback(() => {
    const pos = getPos();

    if (pos !== undefined) {
      editor.commands.setNodeSelection(pos);
    }
  }, [getPos, editor.commands]);

  return (
    <NodeViewWrapper>
      <div
        ref={imageWrapperRef}
        data-drag-handle
        className={wrapperClassName}
        contentEditable={false}
        style={{ width: width, position: "relative" }}
      >
        <img
          ref={imageRef}
          alt={alt || ""}
          decoding="async"
          loading="lazy"
          src={src}
          style={imageStyle}
          onClick={onClick}
        />
      </div>
    </NodeViewWrapper>
  );
};
