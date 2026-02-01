import { Node, mergeAttributes } from '@tiptap/react';

export const Column = Node.create({
  name: 'column',
  content: 'block+',
  isolating: true,

  addAttributes() {
    return {
      width: {
        default: '1',
        parseHTML: (element) => element.style.flex || '1',
        renderHTML: (attributes) => ({
          style: `flex: ${attributes.width}`,
        }),
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'column',
        class: 'surface surface--tertiary rounded-md px-2 py-1',
      }),
      0,
    ];
  },

  parseHTML() {
    return [{ tag: 'div[data-type="column"]' }];
  },
});

export default Column;
