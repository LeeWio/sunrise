import { TableKit as TiptapTableKit } from "@tiptap/extension-table";

/**
 * Custom TableKit extension.
 * Configured with minimal HTML attributes to allow global styling via editorProps.
 */
export const Table = TiptapTableKit.configure({
  table: {
    resizable: true,
    HTMLAttributes: {},
  },
  tableRow: {
    HTMLAttributes: {},
  },
  tableHeader: {
    HTMLAttributes: {},
  },
  tableCell: {
    HTMLAttributes: {},
  },
});

export default Table;
