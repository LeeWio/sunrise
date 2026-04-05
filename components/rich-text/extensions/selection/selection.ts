import { Selection as TiptapSelection } from "@tiptap/extensions";

/**
 * Professional Selection Integration.
 * We use the official extension and configure it to use our design system's
 * background class. No manual CSS injection needed.
 */
export const Selection = TiptapSelection.configure({
  // Use a soft accent background to ensure readable text contrast
  // while highlighting the selection cleanly without being overly solid.
  className: "bg-accent/30 text-accent-foreground",
});

export default Selection;
