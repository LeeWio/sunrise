import {
  StarterKit,
  TextAlign,
  Placeholder,
  CharacterCount,
  Link,
  HorizontalRule,
  Mathematics,
  NodeRange,
  DropPlaceholder,
  TextStyle,
  Color,
  BackgroundColor,
  Highlight,
  Underline,
  Subscript,
  Superscript,
  FontFamily,
  FontSize,
  Focus,
} from "./index";

export const ExtensionKit = [
  StarterKit.configure({
    link: false,
    bulletList: false,
    horizontalRule: false,
    dropcursor: {
      color: "transparent",
      width: 0,
    },
  }),
  TextStyle,
  Color,
  BackgroundColor,
  Highlight.configure({
    multicolor: true,
  }),
  Underline,
  Subscript,
  Superscript,
  FontFamily,
  FontSize,
  Focus.configure({
    className: "has-focus",
    mode: "all",
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
    isAllowedUri: (url, ctx) => {
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
  DropPlaceholder,
  HorizontalRule,
  Mathematics,
];
