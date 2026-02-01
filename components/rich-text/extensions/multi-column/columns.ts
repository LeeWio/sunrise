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
          const columnsHTML = Array(count).fill('<div data-type="column"><p></p></div>').join('');
          return commands.insertContent(`<div data-type="columns">${columnsHTML}</div>`);
        },
      setLayout:
        (layout: ColumnLayout) =>
        ({ tr, dispatch, state }) => {
          const { selection } = state;
          let pos = -1;

          const $pos = selection.$from;
          for (let d = $pos.depth; d > 0; d--) {
            const node = $pos.node(d);
            if (node.type.name === 'columns') {
              pos = $pos.before(d);
              break;
            }
          }

          if (pos === -1) return false;

          if (dispatch) {
            tr.setNodeMarkup(pos, undefined, { layout });

            const parentNode = tr.doc.nodeAt(pos);
            if (parentNode) {
              parentNode.forEach((child, offset, index) => {
                let width = '1';

                if (layout === ColumnLayout.SidebarLeft) {
                  width = index === 0 ? '0 0 30%' : '1';
                } else if (layout === ColumnLayout.SidebarRight) {
                  width = index === parentNode.childCount - 1 ? '0 0 30%' : '1';
                }

                tr.setNodeMarkup(pos + 1 + offset, undefined, { ...child.attrs, width });
              });
            }
          }
          return true;
        },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      {
        'data-type': 'columns',
        class: 'flex flex-row gap-4 w-full my-2 items-stretch',
      },
      0,
    ];
  },

  parseHTML() {
    return [{ tag: 'div[data-type="columns"]' }];
  },
});

export default Columns;
