import { Selection as TiptapSelection } from "@tiptap/extensions";

/**
 * Professional Selection Integration.
 * We use the official extension and configure it to use our design system's
 * background class.
 */
export const Selection = TiptapSelection.configure({
  // In modern web design, overriding the DOM selection directly using standard
  // CSS ::selection pseudo-element is much more elegant than applying background
  // classes to the Tiptap node wrapper, as it ensures proper text contrast inversion.
  // We use Tailwind's native `selection:*` utilities applied globally or let the browser handle it.
  // For Tiptap's specific wrapper, a very subtle soft background is best if forced.
  className: "bg-foreground/20 text-foreground",
});

export default Selection;
