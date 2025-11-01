import { cn } from "@heroui/react";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useCallback, useRef } from "react";

export const ImageBlockView = ({ editor, getPos, node }: NodeViewProps) => {
  const { src, width, align, alt } = node.attrs;
  const imageWrapperRef = useRef(null);

  const wrapperClassName = cn(
    align === "left" ? "ml-0" : "ml-auto",
    align === "right" ? "mr-0" : "mr-auto",
    align === "center" && "mx-auto",
  );

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
        style={{ width: width }}
      >
        <img
          alt={alt || ""}
          decoding="async"
          loading="lazy"
          src={src}
          onClick={onClick}
        />
      </div>
    </NodeViewWrapper>
  );
};
