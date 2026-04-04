import { Editor } from "@tiptap/react";

export function useRichTextCommands(editor: Editor) {
  return {
    onUndo: () => editor.chain().focus().undo().run(),
    onRedo: () => editor.chain().focus().redo().run(),
    
    // Formatting
    onBold: () => editor.chain().focus().toggleBold().run(),
    onItalic: () => editor.chain().focus().toggleItalic().run(),
    onUnderline: () => editor.chain().focus().toggleUnderline().run(),
    onStrike: () => editor.chain().focus().toggleStrike().run(),
    onCode: () => editor.chain().focus().toggleCode().run(),
    
    // Alignment
    onAlignLeft: () => editor.chain().focus().setTextAlign("left").run(),
    onAlignCenter: () => editor.chain().focus().setTextAlign("center").run(),
    onAlignRight: () => editor.chain().focus().setTextAlign("right").run(),
    
    // Lists and Blocks
    onBulletList: () => editor.chain().focus().toggleBulletList().run(),
    onOrderedList: () => editor.chain().focus().toggleOrderedList().run(),
    onBlockquote: () => editor.chain().focus().toggleBlockquote().run(),
    onUnsetLink: () => editor.chain().focus().extendMarkRange("link").unsetLink().run(),
    
    // Colors and Highlight
    onSetColor: (color: string) => editor.chain().focus().setColor(color).run(),
    onUnsetColor: () => editor.chain().focus().unsetColor().run(),
    onSetBackgroundColor: (color: string) => editor.chain().focus().setBackgroundColor(color).run(),
    onUnsetBackgroundColor: () => editor.chain().focus().unsetBackgroundColor().run(),
    onToggleHighlight: (color?: string) => editor.chain().focus().toggleHighlight({ color }).run(),
    onUnsetHighlight: () => editor.chain().focus().unsetHighlight().run(),
  };
}
