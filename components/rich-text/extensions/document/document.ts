import { Document as TiptapDocument } from '@tiptap/extension-document';

/**
 * Custom Document extension to support columnar layouts.
 * Extends the default Tiptap Document to allow 'columns' as a top-level block.
 */
export const Document = TiptapDocument.extend({
  // Allow both standard blocks and our custom 'columns' node at the root level
  content: '(block|columns)+',
});

export default Document;
