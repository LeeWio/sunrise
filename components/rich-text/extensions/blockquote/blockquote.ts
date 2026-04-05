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
        // Modern "Medium / Notion" aesthetic:
        // - Clean left border without clunky backgrounds
        // - Slightly larger text (1.05em) and relaxed line height
        // - Muted color to differentiate from main body text
        class: "border-l-[3px] border-default-300 pl-5 py-0.5 text-default-500 text-[1.05em] leading-relaxed",
        
        // Note: If you ever want a "Callout Card" style instead, you can swap it to:
        // class: "my-4 rounded-xl border border-default-200 bg-default-50 px-5 py-4 text-default-700"
      },
    };
  },
});

export default Blockquote;
