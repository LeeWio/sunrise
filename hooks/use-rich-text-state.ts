import { useTiptapState } from "@tiptap/react";

/**
 * A reactive hook that subscribes to the editor's state.
 * Uses Tiptap 3 Composable API to automatically retrieve the editor from context.
 */
export function useRichTextState() {
  return useTiptapState((ctx) => {
    // Return safe defaults if editor is not yet initialized or out of context
    if (!ctx.editor) {
      return {
        isBold: false,
        isItalic: false,
        isUnderline: false,
        isStrike: false,
        isCode: false,
        isSubscript: false,
        isSuperscript: false,
        isLink: false,
        isAlignLeft: false,
        isAlignCenter: false,
        isAlignRight: false,
        isBulletList: false,
        isOrderedList: false,
        isBlockquote: false,
        isHorizontalRule: false,
        isInlineMath: false,
        isBlockMath: false,
        isHighlight: false,
        textColor: undefined as string | undefined,
        backgroundColor: undefined as string | undefined,
        highlightColor: undefined as string | undefined,
        fontFamily: undefined as string | undefined,
        fontSize: undefined as string | undefined,
        characters: 0,
        words: 0,
        canUndo: false,
        canRedo: false,
      };
    }

    const { editor } = ctx;

    return {
      isBold: editor.isActive("bold"),
      isItalic: editor.isActive("italic"),
      isUnderline: editor.isActive("underline"),
      isStrike: editor.isActive("strike"),
      isCode: editor.isActive("code"),
      isSubscript: editor.isActive("subscript"),
      isSuperscript: editor.isActive("superscript"),
      isLink: editor.isActive("link"),
      isAlignLeft: editor.isActive({ textAlign: "left" }),
      isAlignCenter: editor.isActive({ textAlign: "center" }),
      isAlignRight: editor.isActive({ textAlign: "right" }),
      isBulletList: editor.isActive("bulletList"),
      isOrderedList: editor.isActive("orderedList"),
      isBlockquote: editor.isActive("blockquote"),
      isHorizontalRule: editor.isActive("horizontalRule"),
      isInlineMath: editor.isActive("inlineMath"),
      isBlockMath: editor.isActive("blockMath"),
      isHighlight: editor.isActive("highlight"),
      textColor: editor.getAttributes("textStyle").color as string | undefined,
      backgroundColor: editor.getAttributes("textStyle").backgroundColor as string | undefined,
      highlightColor: editor.getAttributes("highlight").color as string | undefined,
      fontFamily: editor.getAttributes("textStyle").fontFamily as string | undefined,
      fontSize: editor.getAttributes("textStyle").fontSize as string | undefined,
      characters: editor.storage.characterCount.characters(),
      words: editor.storage.characterCount.words(),
      canUndo: editor.can().undo(),
      canRedo: editor.can().redo(),
    };
  });
}
