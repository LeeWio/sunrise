import { UniqueID as TiptapUniqueID } from "@tiptap/extension-unique-id";

/**
 * Professional UniqueID extension.
 * Assigns a stable, unique identifier to every block-level node.
 * Essential for precise node tracking, anchor links, and future block-level comments.
 */
export const UniqueID = TiptapUniqueID.configure({
  attributeName: "id",
  // We apply IDs to all node types (except doc/text) for maximum versatility.
  types: "all",
  // Ensure IDs are generated even for existing documents without them.
  updateDocument: true,
});

export default UniqueID;
