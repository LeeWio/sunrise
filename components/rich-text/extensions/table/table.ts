import { TableKit as TiptapTableKit } from "@tiptap/extension-table";

/**
 * Custom TableKit extension.
 * Configured with minimal HTML attributes to allow global styling via editorProps.
 */
export const Table = TiptapTableKit.configure({
  table: {
    resizable: true,
    HTMLAttributes: {
      class: "table-root table__content",
    },
  },
  tableRow: {
    HTMLAttributes: {
      class: "table__row",
    },
  },
  tableHeader: {
    HTMLAttributes: {
      class: "table__header",
    },
  },
  tableCell: {
    HTMLAttributes: {
      class: " table__cell",
    },
  },
});

export default Table;
