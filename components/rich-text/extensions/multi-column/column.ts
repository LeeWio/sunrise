import { Node, mergeAttributes } from "@tiptap/core";

/**
 * Column node - A container for content within a column group.
 * Styling is fully contained within the node using HeroUI semantic tokens.
 */
export const Column = Node.create({
  name: "column",

  group: "column",

  content: "block+",

  defining: true,

  isolating: true,

  addAttributes() {
    return {
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => ({
          style: attributes.style,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="column"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "column",
        class: `
          flex-1 min-w-0 p-4 rounded-2xl 
          bg-surface-tertiary 
          transition-all duration-300 relative
          [&_.is-empty::before]:text-muted [&_.is-empty::before]:text-xs [&_.is-empty::before]:content-[attr(data-placeholder)]
        `
          .replace(/\s+/g, " ")
          .trim(),
      }),
      0,
    ];
  },
});
