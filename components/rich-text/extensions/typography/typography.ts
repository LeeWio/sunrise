import { Typography as TiptapTypography } from "@tiptap/extension-typography";

/**
 * Professional Typography extension.
 * Automatically converts text patterns into professional typographic characters.
 * (e.g., '->' to '→', '...' to '…', '(c)' to '©').
 */
export const Typography = TiptapTypography.configure({
  // All rules are enabled by default.
  // We can explicitly disable or override rules here if needed.
});

export default Typography;
