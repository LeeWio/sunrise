"use client";

import { Modal, Button } from "@heroui/react";
import { Tiptap } from "@tiptap/react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { closeRichText } from "../../store/slices/rich-text-slice";
import { useRichText } from "../../hooks/use-rich-text";
import { RichTextToolbar } from "./toolbar";

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
    <Modal.Container size="cover" placement="top">
      <Modal.Dialog aria-label="Rich Text Editor">
        {!editor ? (
          <Modal.Body>
            <div className="min-h-[40vh] w-full animate-pulse rounded-xl bg-default-100" />
          </Modal.Body>
        ) : (
          <Tiptap editor={editor}>
            <Modal.Header>
              {/* Toolbar UI */}
              <RichTextToolbar />
            </Modal.Header>
            <Modal.Body>
              <Tiptap.Content className="prose prose-zinc dark:prose-invert max-w-none focus:outline-none min-h-[40vh] cursor-text transition-all duration-200" />
            </Modal.Body>
          </Tiptap>
        )}
        <Modal.Footer className="border-t border-border/50 pt-4">
            <Button onPress={() => dispatch(closeRichText())} variant="secondary">
              Cancel
            </Button>
            <Button onPress={() => { /* TODO: Post Action */ dispatch(closeRichText()); }} className="bg-primary text-primary-foreground font-medium">
              Publish
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}