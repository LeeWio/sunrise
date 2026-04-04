import { StarterKit, TextAlign, Placeholder, Underline } from "./index";

export const ExtensionKit = [
  StarterKit,
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Placeholder.configure({
    placeholder: "Capture your life, share your thoughts...",
    includeChildren: true,
  }),
];
