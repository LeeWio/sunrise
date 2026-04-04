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
        return "Untitled";
      }
      return "Write something...";
    },
    includeChildren: true,
  }),
];
