import { StarterKit, TextAlign, Placeholder, CharacterCount, CustomLink } from "./index";

export const ExtensionKit = [
  StarterKit.configure({
    link: false,
  }),
  CustomLink,
  CharacterCount.configure({
    mode: "nodeSize",
  }),
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
