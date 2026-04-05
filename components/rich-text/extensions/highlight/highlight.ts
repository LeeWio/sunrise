import { Highlight as TiptapHighlight } from "@tiptap/extension-highlight";

/**
 * Professional Highlight extension.
 * Leverages HeroUI v3 and Tailwind CSS v4 classes directly for styling.
 * This ensures the highlight automatically adapts to Light/Dark themes.
 */
export const Highlight = TiptapHighlight.configure({
  multicolor: true,
  HTMLAttributes: {
    // 'bg-warning-soft' provides a professional, accessible highlight background.
    // 'text-warning-foreground' ensures readability.
    // 'rounded-small' and 'px-1' match the project's overall HeroUI aesthetic.
    class: "bg-accent-soft text-accent-soft-foreground rounded-md  py-0.5",
  },
});

export default Highlight;
