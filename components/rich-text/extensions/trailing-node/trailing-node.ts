import { TrailingNode as TiptapTrailingNode } from "@tiptap/extensions";

/**
 * Custom TrailingNode extension.
 * Extending the official Tiptap extension to ensure a paragraph is always
 * present at the end of the document for better editing accessibility.
 */
export const TrailingNode = TiptapTrailingNode.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      node: "paragraph",
      // These nodes should NOT trigger an automatic paragraph append.
      notAfter: ["paragraph"],
    };
  },
});

export default TrailingNode;
