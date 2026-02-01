import { Node } from '@tiptap/react';

export enum ColumnLayout {
  SidebarLeft = 'sidebar-left',
  SidebarRight = 'sidebar-right',
  TwoColumn = 'two-column',
  ThreeColumn = 'three-column',
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    columns: {
      setColumns: (count?: number) => ReturnType;
      setLayout: (layout: ColumnLayout) => ReturnType;
    };
  }
}

export const Columns = Node.create({
  name: 'columns',

  group: 'columns',

  // Allow 1 or more columns
  content: 'column+',

  defining: true,

  isolating: true,

  addAttributes() {
    return {
      layout: {
        default: ColumnLayout.TwoColumn,
      },
    };
  },

  addCommands() {
    return {
      setColumns:
        (count = 2) =>
        ({ commands }) => {
          // Create the HTML for the requested number of columns
          const columnsHTML = Array(count).fill('<div data-type="column"><p></p></div>').join('');

          return commands.insertContent(`<div data-type="columns">${columnsHTML}</div>`);
        },
      setLayout:
        (layout: ColumnLayout) =>
        ({ commands }) =>
          commands.updateAttributes('columns', { layout }),
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': 'columns', class: `layout-${HTMLAttributes.layout}` }, 0];
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="columns"]',
      },
    ];
  },
});

export default Columns;
