import { Node } from "@tiptap/pm/model";
import { Editor } from "@tiptap/react";
import { useCallback } from "react";

/**
 * Hook to define actions for the ContentItemMenu.
 */
export const useContentItemActions = (
  editor: Editor | null,
  currentNode: Node | null,
  currentNodePos: number
) => {
  const deleteNode = useCallback(() => {
    if (!editor || currentNodePos === -1) return;
    editor.chain().focus().setNodeSelection(currentNodePos).deleteSelection().run();
  }, [editor, currentNodePos]);

  const copyNodeToClipboard = useCallback(async () => {
    if (!editor || currentNodePos === -1 || !currentNode) return;
    
    editor
      .chain()
      .focus()
      .setMeta("hideDragHandle", true)
      .setNodeSelection(currentNodePos)
      .run();

    try {
      const html = editor.getHTML();
      const text = editor.getText();

      const data = [
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([text], { type: "text/plain" }),
        }),
      ];

      await navigator.clipboard.write(data);
    } catch (err) {
      console.error("Failed to copy using Clipboard API, falling back...", err);
      const text = editor.getText();
      await navigator.clipboard.writeText(text);
    }
  }, [editor, currentNode, currentNodePos]);

  const duplicateNode = useCallback(() => {
    if (!editor || currentNodePos === -1 || !currentNode) return;
    editor
      .chain()
      .focus()
      .insertContentAt(currentNodePos + currentNode.nodeSize, currentNode.toJSON())
      .run();
  }, [editor, currentNode, currentNodePos]);

  const addBefore = useCallback(() => {
    if (!editor || currentNodePos === -1) return;
    editor.chain().focus().insertContentAt(currentNodePos, { type: "paragraph" }).run();
  }, [editor, currentNodePos]);

  const addBelow = useCallback(() => {
    if (!editor || currentNodePos === -1 || !currentNode) return;
    editor.chain().focus().insertContentAt(currentNodePos + currentNode.nodeSize, { type: "paragraph" }).run();
  }, [editor, currentNode, currentNodePos]);

  const resetTextFormatting = useCallback(() => {
    if (!editor || currentNodePos === -1) return;
    
    const chain = editor.chain().focus();
    chain.setNodeSelection(currentNodePos).unsetAllMarks();

    if (currentNode?.type.name !== "paragraph") {
      chain.setParagraph();
    }

    chain.run();
  }, [editor, currentNodePos, currentNode?.type.name]);

  const setTextAlign = useCallback(
    (alignment: string) => {
      if (!editor || currentNodePos === -1) return;
      editor.chain().focus().setNodeSelection(currentNodePos).setTextAlign(alignment).run();
    },
    [editor, currentNodePos]
  );

  const toggleNodeType = useCallback(
    (type: string, options?: Record<string, unknown>) => {
      if (!editor || currentNodePos === -1) return;
      const chain = editor.chain().focus().setNodeSelection(currentNodePos);

      switch (type) {
        case "paragraph":
          chain.setParagraph().run();
          break;
        case "heading":
          chain.toggleHeading({ level: options?.level as 1 | 2 | 3 | 4 | 5 | 6 }).run();
          break;
        case "bulletList":
          chain.toggleBulletList().run();
          break;
        case "orderedList":
          chain.toggleOrderedList().run();
          break;
      }
    },
    [editor, currentNodePos]
  );

  return {
    deleteNode,
    copyNodeToClipboard,
    duplicateNode,
    addBefore,
    addBelow,
    resetTextFormatting,
    setTextAlign,
    toggleNodeType,
  };
};
