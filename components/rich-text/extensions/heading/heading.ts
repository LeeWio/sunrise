import { Heading as TiptapHeading } from "@tiptap/extension-heading";
import { mergeAttributes } from "@tiptap/core";

type Levels = 1 | 2 | 3 | 4 | 5 | 6;

const classes: Record<Levels, string> = {
  1: "text-4xl font-bold mt-8 mb-4",
  2: "text-3xl font-bold mt-8 mb-4",
  3: "text-2xl font-bold mt-6 mb-3",
  4: "text-xl font-bold mt-6 mb-3",
  5: "text-lg font-bold mt-4 mb-2",
  6: "text-base font-bold mt-4 mb-2",
};

/**
 * Custom Heading extension.
 * Extending the official Tiptap extension to add Tailwind CSS styling
 * for different heading levels without relying on Tailwind Typography.
 */
export const Heading = TiptapHeading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level: Levels = hasLevel ? node.attrs.level : this.options.levels[0];

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: classes[level],
      }),
      0,
    ];
  },
});

export default Heading;
