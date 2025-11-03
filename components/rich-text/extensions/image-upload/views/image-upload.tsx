import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useCallback } from "react";

import { ImageUploader } from "./image-uploader";

export const ImageUpload = ({ getPos, editor }: NodeViewProps) => {
  const onUpload = useCallback(
    (url: string) => {
      const pos = getPos();

      if (url && typeof pos === "number") {
        // http://localhost:8080/uploads/3b750ea2498b40db926c5e14cfac448b.png
        editor
          .chain()
          .setImageBlock({ src: "http://localhost:8080" + url })
          .deleteRange({ from: pos, to: pos })
          .focus()
          .run();
      }
    },
    [getPos, editor],
  );

  return (
    <NodeViewWrapper>
      <div data-drag-handle className="p-0 m-0">
        <ImageUploader onUpload={onUpload} />
      </div>
    </NodeViewWrapper>
  );
};
