import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useCallback } from "react";

import { Imageuploader } from "./image-uploader";

export const ImageUpload = ({ getPos, editor }: NodeViewProps) => {
  const onUpload = useCallback(
    (url: string) => {
      const pos = getPos();

      if (url && typeof pos === "number") {
        console.log("asdf");
        editor
          .chain()
          .setImageBlock({ src: url })
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
        <Imageuploader onUpload={onUpload} />
      </div>
    </NodeViewWrapper>
  );
};
