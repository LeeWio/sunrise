import { Editor } from '@tiptap/react';

/**
 * Finds the DOM element of the nearest parent node of a specific type.
 * This is optimized to use the Prosemirror state instead of expensive DOM queries.
 */
export const getRenderContainer = (editor: Editor, nodeType: string) => {
  const { selection } = editor.state;
  const { $from } = selection;

  // Traverse up the node hierarchy from the current selection
  for (let d = $from.depth; d > 0; d--) {
    const node = $from.node(d);
    if (node.type.name === nodeType) {
      // Get the start position of this node
      const pos = $from.before(d);
      // Retrieve the DOM node from the view
      return editor.view.nodeDOM(pos) as HTMLElement;
    }
  }

  // Fallback: search for elements with focus if selection traversal fails
  // (e.g. in some complex NodeView scenarios)
  const elements = document.querySelectorAll('.has-focus');
  for (let i = elements.length - 1; i >= 0; i--) {
    const el = elements[i] as HTMLElement;
    if (el.getAttribute('data-type') === nodeType || el.classList.contains(nodeType)) {
      return el;
    }
  }

  return null;
};
