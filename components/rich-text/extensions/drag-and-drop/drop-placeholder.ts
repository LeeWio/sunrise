import { Node, mergeAttributes } from "@tiptap/core";

/**
 * DropPlaceholder extension - Enhanced with HeroUI Skeleton visual style.
 * Uses BEM classes to leverage the design system's default animations.
 */
export const DropPlaceholder = Node.create({
  name: "dropPlaceholder",
  group: "block",
  selectable: false,
  atom: true,

  addAttributes() {
    return {
      height: {
        default: 40,
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="drop-placeholder"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "drop-placeholder",
        // Using HeroUI Skeleton BEM classes for professional visual feedback
        class: "skeleton skeleton--shimmer !w-full !my-2 !rounded-xl border border-primary/10",
        style: `height: ${HTMLAttributes.height}px;`,
      }),
    ];
  },
});
