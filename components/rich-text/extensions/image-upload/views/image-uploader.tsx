import { ChangeEvent, useCallback } from "react";
import { Card, cn, Spinner } from "@heroui/react";

import { useDropZone, useFileUpload, useUploader } from "./hooks";

import { PictureIcon } from "@/components/icons";

export const Imageuploader = ({
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
    <Card.Root
      className={cn(
        "w-full min-h-40 border-2 border-dashed transition-all duration-200 cursor-pointer",
        draggedInside
          ? "border-primary bg-primary-50 dark:bg-primary-900/20 scale-[1.02]"
          : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800/70",
      )}
      contentEditable={false}
      onDoubleClick={handleUploadClick}
      onDragLeave={onDragLeave}
      onDragOver={onDragEnter}
      onDrop={onDrop}
    >
      <Card.Content className="flex flex-col items-center justify-center p-8 space-y-4">
        <div
          className={cn(
            "transition-all duration-200",
            draggedInside
              ? "scale-110 text-primary"
              : "text-gray-400 dark:text-gray-500",
          )}
        >
          <PictureIcon className="w-16 h-16" />
        </div>

        <div className="text-center space-y-2">
          <p
            className={cn(
              "text-sm font-medium transition-colors duration-200",
              draggedInside
                ? "text-primary dark:text-primary-300"
                : "text-gray-600 dark:text-gray-400",
            )}
          >
            {draggedInside ? "Drop image here" : "Drag and drop image"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            or double click to browse
          </p>
        </div>

        <div className="text-xs text-gray-400 dark:text-gray-500 space-y-1">
          <p>Supported formats: JPG, PNG, WebP, GIF</p>
          <p>Max file size: 10MB</p>
        </div>

        {isError && (
          <div className="text-xs text-danger bg-danger-50 dark:bg-danger-900/20 px-3 py-2 rounded-md border border-danger-200 dark:border-danger-800">
            {"Upload failed. Please try again."}
          </div>
        )}

        <input
          ref={ref}
          accept=".jpg,.jpeg,.png,.webp,.gif"
          className="w-0 h-0 overflow-hidden opacity-0"
          type="file"
          onChange={onFileChange}
        />
      </Card.Content>
    </Card.Root>
  );
};
