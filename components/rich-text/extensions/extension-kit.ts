import { StarterKit, TextAlign, Placeholder, CharacterCount, Link, NodeRange } from "./index";

export const ExtensionKit = [
  StarterKit.configure({
    link: false,
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
    protocols: [
      {
        scheme: "tel",
        optionalSlashes: true,
      },
      "mailto",
    ],
    linkOnPaste: true,
    HTMLAttributes: {
      class: "underline decoration-primary underline-offset-4 cursor-pointer",
      rel: "noopener noreferrer",
      target: "_blank",
      "data-type": "link",
    },
    /**
     * Use modern isAllowedUri to refine validation logic.
     * This handles both manual link setting and autolinking.
     */
    isAllowedUri: (url, ctx) => {
      // Use the default validator (which handles standard protocols)
      // and ensure it doesn't start with ./ (relative links) for security/consistency
      return ctx.defaultValidate(url) && !url.startsWith("./");
    },
  }),
  CharacterCount,
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
  NodeRange,
];
