import { Blockquote as TiptapBlockquote } from "@tiptap/extension-blockquote";

/**
 * Custom Blockquote extension.
 * Extending the official Tiptap extension to use custom Tailwind and HeroUI-based styling.
 */
export const Blockquote = TiptapBlockquote.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: "my-4 border-l-4 border-primary/50 bg-default-100/50 py-2 pl-4 pr-2 rounded-r-lg italic text-default-700",
      },
    };
  },
});

export default Blockquote;
