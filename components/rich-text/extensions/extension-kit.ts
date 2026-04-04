import { StarterKit, TextAlign, Placeholder } from "./index";

export const ExtensionKit = [
  StarterKit,
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
