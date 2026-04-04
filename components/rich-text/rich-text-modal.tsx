"use client";

import React, { useRef, useEffect } from "react";
import { Modal, Button, Skeleton } from "@heroui/react";
import { Tiptap } from "@tiptap/react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { closeRichText } from "../../store/slices/rich-text-slice";
import { useRichText } from "../../hooks/use-rich-text";
import { useRichTextState } from "../../hooks/use-rich-text-state";
import { RichTextToolbar } from "./toolbar";
import { LinkMenu, ContentItemMenu, TextMenu } from "./menus";
import { DropIndicator } from "./extensions";
import "../../styles/rich-text/index.css";

/**
 * Renders document statistics (character/word counts).
 * Now completely context-aware via useRichTextState().
 */
function RichTextStats() {
  const state = useRichTextState();

  return (
    <div className="text-default-400 flex gap-4 text-xs">
      <span>{state.characters} characters</span>
      <span>{state.words} words</span>
    </div>
  );
}

/**
 * Main Rich Text Editor Modal.
 * High-performance editing environment with Tiptap 3 and HeroUI.
 */
export function RichTextModal() {
  const isOpen = useAppSelector((state) => state.richText.isOpen);
  const dispatch = useAppDispatch();
  const editor = useRichText();

  // Using a dedicated ref for the menu container (BubbleMenu, LinkMenu, etc.)
  const menuContainerRef = useRef<HTMLDivElement>(null);

  // Auto focus editor when modal opens
  useEffect(() => {
    if (isOpen && editor) {
      // Small delay to ensure the DOM is ready after Modal animation starts
      const timer = setTimeout(() => {
        editor.commands.focus("end");
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, editor]);

  const onOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(closeRichText());
    }
  };

  return (
    <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange} variant="blur">
      <Modal.Container size="cover" placement="top">
        <Modal.Dialog aria-label="Rich Text Editor">
          {/* We wrap the content in a div to provide a stable ref for BubbleMenus */}
          <div ref={menuContainerRef} className="relative flex h-full w-full flex-col">
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
                <Modal.Footer className="border-border/50 flex items-center justify-between border-t pt-4">
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
                <LinkMenu appendTo={menuContainerRef} />
                <TextMenu appendTo={menuContainerRef} />
                <ContentItemMenu />
                <DropIndicator />
                <Modal.Header>
                  <RichTextToolbar />
                </Modal.Header>
                <Modal.Body>
                  <Tiptap.Content className="prose prose-zinc dark:prose-invert max-w-none transition-all duration-200" />
                </Modal.Body>
                <Modal.Footer className="border-border/50 flex items-center justify-between border-t pt-4">
                  <div>
                    <RichTextStats />
                  </div>
                  <div className="flex gap-2">
                    <Button onPress={() => dispatch(closeRichText())} variant="secondary">
                      Cancel
                    </Button>
                    <Button
                      onPress={() => {
                        /* TODO: Post Action */ dispatch(closeRichText());
                      }}
                      className="bg-primary text-primary-foreground font-medium"
                    >
                      Publish
                    </Button>
                  </div>
                </Modal.Footer>
              </Tiptap>
            )}
          </div>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}
