import { Editor } from "@tiptap/react";
import { Link, HorizontalRule, Mathematics, DropPlaceholder, Audio } from "../extensions";
import { BlockMath, InlineMath } from "@tiptap/extension-mathematics";

/**
 * Checks if a table grip (column or row handle) is currently selected.
 *
 * This is useful for determining when to show or hide specific menus
 * when interacting with Tiptap's Table extension.
 */
export const isTableGripSelected = (node: HTMLElement | null) => {
  let container: HTMLElement | null = node;

  while (container && !["TD", "TH"].includes(container.tagName)) {
    container = container.parentElement;
  }

  const gripColumn = container?.querySelector && container.querySelector("a.grip-column.selected");
  const gripRow = container?.querySelector && container.querySelector("a.grip-row.selected");

  return !!(gripColumn || gripRow);
};

/**
 * Checks if a "custom node" is currently selected in the editor.
 *
 * Custom nodes are non-standard text nodes that require specific
 * menu handling (like links, images, code blocks, etc.).
 */
export const isCustomNodeSelected = (editor: Editor, node: HTMLElement | null) => {
  const customNodes = [
    Link.name,
    HorizontalRule.name,
    Mathematics.name,
    BlockMath.name,
    InlineMath.name,
    DropPlaceholder.name,
    Audio.name,
    "codeBlock", // Part of StarterKit
  ];

  const isActive = customNodes.some((type) => editor.isActive(type));

  return isActive || isTableGripSelected(node);
};
