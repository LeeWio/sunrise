import { Placeholder as TiptapPlaceholder } from "@tiptap/extension-placeholder";

/**
 * Custom Placeholder extension.
 * Provides dynamic placeholder texts depending on the node type and position.
 */
export const Placeholder = TiptapPlaceholder.configure({
  // Use Tailwind utility classes directly for the empty node
  emptyNodeClass: "is-empty",
  emptyEditorClass: "is-editor-empty",
  placeholder: ({ node }) => {
    if (node.type.name === "heading") {
      return "Heading...";
    }

    if (node.type.name === "blockquote") {
      return "Quote something...";
    }

    return "Type '/' for commands or start writing...";
  },
  includeChildren: true,
});

export default Placeholder;
