import { Code as TiptapCode } from "@tiptap/extension-code";
import { mergeAttributes } from "@tiptap/core";

/**
 * Custom Code extension.
 * Extending the official Tiptap extension to allow for future customizations.
 * Uses Tailwind CSS and HeroUI semantic colors for styling inline code.
 */
export const Code = TiptapCode.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      "code",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: "kbd h-auto px-[0.3em] py-[0.25em] font-mono text-[0.875em]",
      }),
      0, // 0 indicates where the inline code content will be placed
    ];
  },
});

export default Code;
