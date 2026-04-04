"use client";

import { useCallback } from "react";
import { Editor, useTiptapState } from "@tiptap/react";
import { EditorView } from "@tiptap/pm/view";
import { EditorState } from "@tiptap/pm/state";
import { isCustomNodeSelected, isTextSelected } from "../../../utils";

export interface ShouldShowProps {
  editor: Editor;
  view: EditorView;
  state: EditorState;
  oldState?: EditorState;
  element: HTMLElement;
  from: number;
  to: number;
}

/**
 * Hook to manage all UI-related states for TextMenu.
 * Handles the logic for when the menu should be shown and
 * tracks the active formatting states (bold, italic, etc.).
 */
export const useTextMenuStates = (editor: Editor | null) => {
  /**
   * Tiptap 3 `useTiptapState` allows us to reactively track editor state changes.
   * This is much more efficient than manual event listeners.
   */
  const states = useTiptapState((ctx) => {
    if (!ctx.editor) {
      return {
        isBold: false,
        isItalic: false,
        isStrike: false,
        isUnderline: false,
        isCode: false,
        isSubscript: false,
        isSuperscript: false,
        isLink: false,
        isHighlight: false,
        textColor: undefined as string | undefined,
        backgroundColor: undefined as string | undefined,
        highlightColor: undefined as string | undefined,
      };
    }

    return {
      isBold: ctx.editor.isActive("bold"),
      isItalic: ctx.editor.isActive("italic"),
      isStrike: ctx.editor.isActive("strike"),
      isUnderline: ctx.editor.isActive("underline"),
      isCode: ctx.editor.isActive("code"),
      isSubscript: ctx.editor.isActive("subscript"),
      isSuperscript: ctx.editor.isActive("superscript"),
      isLink: ctx.editor.isActive("link"),
      isHighlight: ctx.editor.isActive("highlight"),
      textColor: ctx.editor.getAttributes("textStyle").color as string | undefined,
      backgroundColor: ctx.editor.getAttributes("textStyle").backgroundColor as string | undefined,
      highlightColor: ctx.editor.getAttributes("highlight").color as string | undefined,
    };
  });

  /**
   * Logic to determine when to show the text bubble menu.
   *
   * It ensures the menu is NOT shown when:
   * 1. The editor is dragging content.
   * 2. A custom node (like a link, image, or code block) is selected.
   * 3. No text is actually selected (empty selection).
   */
  const shouldShow = useCallback(
    ({ view, from }: ShouldShowProps) => {
      if (!editor || !view || editor.view.dragging) {
        return false;
      }

      const domAtPos = view.domAtPos(from || 0).node as HTMLElement;
      const nodeDOM = view.nodeDOM(from || 0) as HTMLElement;
      const node = nodeDOM || domAtPos;

      // Avoid showing text menu when a custom node is already handled by another menu
      if (isCustomNodeSelected(editor, node)) {
        return false;
      }

      return isTextSelected({ editor });
    },
    [editor],
  );

  return {
    shouldShow,
    ...states,
  };
};
