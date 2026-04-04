"use client";

import { Modal, Button } from "@heroui/react";
import { EditorContent } from "@tiptap/react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { closeRichText } from "../../store/slices/rich-text-slice";
import { useRichText } from "../../hooks/use-rich-text";

export function RichTextModal() {
  const isOpen = useAppSelector((state) => state.richText.isOpen);
  const dispatch = useAppDispatch();
  const editor = useRichText();

  const onOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(closeRichText());
    }
  };

  return (
    <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange} variant="blur">
      <Modal.Container>
        <Modal.Dialog className="w-full max-w-3xl">
          <Modal.CloseTrigger />
          <Modal.Header className="flex flex-col gap-1">
            <Modal.Heading className="text-xl font-bold">New Moment</Modal.Heading>
          </Modal.Header>
          <Modal.Body>
            <div className="min-h-[300px] w-full rounded-xl bg-zinc-100 p-4 dark:bg-zinc-900 cursor-text overflow-y-auto">
              <EditorContent editor={editor} className="outline-none h-full" />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={() => dispatch(closeRichText())} className="bg-transparent text-danger hover:bg-danger/10">
              Cancel
            </Button>
            <Button onPress={() => { /* TODO: Post Action */ dispatch(closeRichText()); }} className="bg-primary text-white">
              Post
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}