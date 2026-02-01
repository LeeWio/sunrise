import { Node, mergeAttributes } from '@tiptap/react';

export const Column = Node.create({
  name: 'column',

  content: 'block+',

  isolating: true,

  addAttributes() {
    return {
      position: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-position'),
        renderHTML: (attributes) => ({ 'data-position': attributes.position }),
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'column',
        // Use HeroUI's BEM classes for Surface
        // .surface: Base class
        // .surface--secondary: Secondary variant (bg-surface-secondary)
        class: 'surface surface--tertiary rounded-xl px-4 py-2',
      }),
      0,
    ];
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="column"]',
      },
    ];
  },
});

export default Column;
