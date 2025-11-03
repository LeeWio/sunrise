import { Button } from "@heroui/react";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { useCallback } from "react";

interface AudioUploadViewProps extends NodeViewProps { }
export const AudioUploadView: React.FC<AudioUploadViewProps> = ({
  editor,
  getPos,
}) => {
  const onUpload = useCallback(
    (url: string) => {
      const pos = getPos();

      if (url && typeof pos === "number") {
        editor
          .chain()
          .setAudio({ src: url })
          .deleteRange({ from: pos, to: pos })
          .focus()
          .run();
      }
    },
    [getPos, editor],
  );

  const onTestUpload = useCallback(() => {
    const testUrl = "/bbb.wav";

    onUpload(testUrl);
  }, [onUpload]);

  return (
    <NodeViewWrapper data-drag-handle>
      {/* <AudioUploader onUpload={onUpload} /> */}

      <Button onClick={onTestUpload}>test button</Button>
    </NodeViewWrapper>
  );
};
