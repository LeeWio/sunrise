import { Card, Spinner } from "@heroui/react";
import { ChangeEvent, useCallback } from "react";

import { useDropZone, useFileUpload, useUploader } from "./hooks";

export const AudioUploader = ({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) => {
  const { isLoading, isSuccess, isError, handleUploadFile, error } =
    useUploader({
      onUpload,
      options: {
        maxSize: 10 * 1024 * 1024,
        allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
        onProgress: (progress) => {
          // 进度回调
          console.log(`Progress: ${progress.percentage}%`);
        },
        onSuccess: (response) => {
          console.log("Upload successful:", response);
        },
        onError: (err) => {
          console.error("Upload failed:", err);
        },
      },
    });

  const { handleUploadClick, ref } = useFileUpload();

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      e.target.files ? handleUploadFile(e.target.files[0]) : null,
    [handleUploadFile],
  );

  const { draggedInside, onDrop, onDragEnter, onDragLeave } = useDropZone({
    uploader: handleUploadFile,
  });

  if (isLoading) {
    return (
      <Card.Root className="flex items-center justify-center min-h-40 p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">
        <Card.Content className="flex flex-col items-center justify-center">
          <Spinner color="accent" size="lg" />
        </Card.Content>
      </Card.Root>
    );
  }

  return (
    <input
      ref={ref}
      accept=".mp3,.wav,.ogg,.webm,audio/*"
      type="file"
      onChange={onFileChange}
    />
  );
};
