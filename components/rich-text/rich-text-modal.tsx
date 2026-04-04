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
      <Modal.Container size="lg" placement="top">
        <Modal.Dialog>
          <Modal.CloseTrigger />
          <Modal.Header className="border-b border-border/50 pb-4">
            <Modal.Icon className="bg-primary/10 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </Modal.Icon>
            <Modal.Heading className="text-xl font-semibold">Write a Moment</Modal.Heading>
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