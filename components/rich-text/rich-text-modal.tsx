"use client";

import { Modal, Button, Skeleton } from "@heroui/react";
import { Tiptap } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { closeRichText } from "../../store/slices/rich-text-slice";
import { useRichText } from "../../hooks/use-rich-text";
import { useRichTextState } from "../../hooks/use-rich-text-state";
import { RichTextToolbar } from "./toolbar";
import { LinkBubbleMenu } from "./extensions/link";
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
            <>
              <Modal.Body>
                <div className="skeleton--shimmer flex flex-col gap-8">
                  {/* Toolbar Placeholder */}
                  <Skeleton animationType="none" className="h-12 w-full rounded-xl" />
                  
                  {/* Content Placeholder (Simulated text paragraphs) */}
                  <div className="flex flex-col gap-4 px-2">
                    <div className="space-y-3">
                      <Skeleton animationType="none" className="h-4 w-1/3 rounded-lg" />
                      <Skeleton animationType="none" className="h-4 w-full rounded-lg" />
                      <Skeleton animationType="none" className="h-4 w-5/6 rounded-lg" />
                    </div>
                    <div className="space-y-3 pt-4">
                      <Skeleton animationType="none" className="h-4 w-full rounded-lg" />
                      <Skeleton animationType="none" className="h-4 w-4/5 rounded-lg" />
                      <Skeleton animationType="none" className="h-4 w-2/3 rounded-lg" />
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer className="border-t border-border/50 pt-4 flex items-center justify-between">
                <div className="skeleton--shimmer flex gap-4">
                  <Skeleton animationType="none" className="h-3 w-20 rounded-full" />
                  <Skeleton animationType="none" className="h-3 w-16 rounded-full" />
                </div>
                <div className="skeleton--shimmer flex gap-2">
                  <Skeleton animationType="none" className="h-9 w-20 rounded-lg" />
                  <Skeleton animationType="none" className="h-9 w-24 rounded-lg" />
                </div>
              </Modal.Footer>
            </>
          ) : (
            <Tiptap editor={editor}>
              <LinkBubbleMenu />
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
