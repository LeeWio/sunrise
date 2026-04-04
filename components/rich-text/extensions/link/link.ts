import Link from "@tiptap/extension-link";

export const CustomLink = Link.configure({
  openOnClick: false,
  autolink: true,
  defaultProtocol: "https",
  HTMLAttributes: {
    class: "text-primary underline underline-offset-4 cursor-pointer",
    rel: "noopener noreferrer",
    target: "_blank",
  },
});
