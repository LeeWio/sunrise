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
        return "Wait, what's the big idea?";
      }
      return "Ready to spill the beans?";
    },
    includeChildren: true,
  }),
];
