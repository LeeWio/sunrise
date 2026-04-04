import { StarterKit, TextAlign, Placeholder, Underline } from "./index";

export const ExtensionKit = [
  StarterKit,
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return "Enter a title...";
      }
      return "Capture your life, share your thoughts...";
    },
    includeChildren: true,
  }),
];
