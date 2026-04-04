import { useEffect, useState } from "react";
import { Editor } from "@tiptap/react";

export interface RichTextState {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrike: boolean;
  isCode: boolean;
  isAlignLeft: boolean;
  isAlignCenter: boolean;
  isAlignRight: boolean;
  isBulletList: boolean;
  isOrderedList: boolean;
  isBlockquote: boolean;
  canUndo: boolean;
  canRedo: boolean;
}

export function useRichTextState(editor: Editor): RichTextState {
  // Initialize state based on the current editor context.
  const [state, setState] = useState<RichTextState>(() => getState(editor));

  useEffect(() => {
    const updateState = () => {
      setState(getState(editor));
    };

    // Listen to transaction, selection, and update events from Tiptap.
    editor.on("transaction", updateState);
    editor.on("selectionUpdate", updateState);
    editor.on("update", updateState);

    return () => {
      editor.off("transaction", updateState);
      editor.off("selectionUpdate", updateState);
      editor.off("update", updateState);
    };
  }, [editor]);

  return state;
}

function getState(editor: Editor): RichTextState {
  return {
    isBold: editor.isActive("bold"),
    isItalic: editor.isActive("italic"),
    isUnderline: editor.isActive("underline"),
    isStrike: editor.isActive("strike"),
    isCode: editor.isActive("code"),
    isAlignLeft: editor.isActive({ textAlign: "left" }),
    isAlignCenter: editor.isActive({ textAlign: "center" }),
    isAlignRight: editor.isActive({ textAlign: "right" }),
    isBulletList: editor.isActive("bulletList"),
    isOrderedList: editor.isActive("orderedList"),
    isBlockquote: editor.isActive("blockquote"),
    canUndo: editor.can().undo(),
    canRedo: editor.can().redo(),
  };
}
