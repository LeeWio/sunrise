"use client";

import { Modal, Button } from "@heroui/react";
import { EditorContent } from "@tiptap/react";
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
        <Modal.Dialog>
          <Modal.CloseTrigger />
          <Modal.Header>
            {/* Toolbar UI (Static for now) */}
            <RichTextToolbar />
          </Modal.Header>
          <Modal.Body className="py-6 px-6">
            <EditorContent 
              editor={editor} 
              className="outline-none min-h-[40vh] cursor-text text-base md:text-lg leading-relaxed text-foreground" 
            />
          </Modal.Body>
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