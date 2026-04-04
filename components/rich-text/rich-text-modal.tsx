"use client";

import { Modal, Button, Skeleton } from "@heroui/react";
import { Tiptap } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { closeRichText } from "../../store/slices/rich-text-slice";
import { useRichText } from "../../hooks/use-rich-text";
import { useRichTextState } from "../../hooks/use-rich-text-state";
import { RichTextToolbar } from "./toolbar";
import "../../styles/rich-text/index.css";

function RichTextStats({ editor }: { editor: Editor }) {
  const state = useRichTextState(editor);
  
  return (
    <div className="flex gap-4 text-xs text-default-400">
      <span>{state.characters} characters</span>
      <span>{state.words} words</span>
    </div>
  );
}

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
              <div className="flex flex-col gap-4">
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-[40vh] w-full rounded-xl" />
              </div>
            </Modal.Body>
          ) : (
            <Tiptap editor={editor}>
              <Modal.Header>
                {/* Toolbar UI */}
                <RichTextToolbar />
              </Modal.Header>
              <Modal.Body>
                <Tiptap.Content className="prose prose-zinc dark:prose-invert max-w-none transition-all duration-200" />
              </Modal.Body>
            </Tiptap>
          )}
          <Modal.Footer className="border-t border-border/50 pt-4 flex items-center justify-between">
            <div>
              {editor && <RichTextStats editor={editor} />}
            </div>
            <div className="flex gap-2">
              <Button onPress={() => dispatch(closeRichText())} variant="secondary">
                Cancel
              </Button>
              <Button onPress={() => { /* TODO: Post Action */ dispatch(closeRichText()); }} className="bg-primary text-primary-foreground font-medium">
                Publish
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
