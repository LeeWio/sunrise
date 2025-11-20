import { Editor } from "@tiptap/react";

import { Link } from "../../extensions/link";
import { ImageBlock, ImageUpload } from "../../extensions";
import { Audio } from "../../extensions/audio";
import { CodeBlock } from "../../extensions";

export const isTableGripSelected = (node: HTMLElement) => {
  let container = node;

  while (container && !["TD", "TH"].includes(container.tagName)) {
    container = container.parentElement!;
  }

  const gripColumn =
    container &&
    container.querySelector &&
    container.querySelector("a.grip-column.selected");
  const gripRow =
    container &&
    container.querySelector &&
    container.querySelector("a.grip-row.selected");

  if (gripColumn || gripRow) {
    return true;
  }

  return false;
};

export const isCustomNodeSelected = (editor: Editor, node: HTMLElement) => {
  const customNodes = [
    // HorizontalRule.name,
    ImageBlock.name,
    ImageUpload.name,
    CodeBlock.name,
    Link.name,
    Audio.name,
    // Figcaption.name,
    // TableOfContentsNode.name,
    // ExcalidrawImage.name,
    // Audio.name,
    // AI.name,
    // Bilibili.name,
    // Chart.name,
    // Table.name,
    // TableCell.name,
    // TableHeader.name,
    // TableRow.name,
    // Countdown.name,
  ];

  return (
    customNodes.some((type) => editor.isActive(type)) ||
    isTableGripSelected(node)
  );
};
