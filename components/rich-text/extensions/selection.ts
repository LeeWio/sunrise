import { Selection as TiptapSelection } from "@tiptap/extensions";

/**
 * Professional Selection Integration.
 * We use the official extension and configure it to use our design system's
 * background class. No manual CSS injection needed.
 */
export const Selection = TiptapSelection.configure({
  // 'bg-accent-soft' is a standard class in our HeroUI/Tailwind v4 setup.
  className: "bg-accent",
});
