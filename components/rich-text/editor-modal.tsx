"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { EditorContent } from "@tiptap/react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { closeEditor } from "../../store/slices/editor-slice";
import { useRichText } from "../../hooks/use-rich-text";

export function EditorModal() {
  const isOpen = useAppSelector((state) => state.editor.isOpen);
  const dispatch = useAppDispatch();
  const editor = useRichText();

  const onOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(closeEditor());
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">New Moment</ModalHeader>
            <ModalBody>
              <div className="min-h-[300px] w-full rounded-xl bg-zinc-100 p-4 dark:bg-zinc-900 cursor-text overflow-y-auto">
                <EditorContent editor={editor} className="outline-none h-full" />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={() => { /* TODO: Post Action */ onClose(); }}>
                Post
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}