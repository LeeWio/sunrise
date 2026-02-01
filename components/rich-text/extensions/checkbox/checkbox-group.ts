import { mergeAttributes, Node } from '@tiptap/react';

export interface CheckboxGroupOptions {
  itemTypeName: string;
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    checkboxGroup: {
      /**
       * Toggle a checkbox group
       */
      toggleCheckboxGroup: () => ReturnType;
    };
  }
}

export const CheckboxGroup = Node.create<CheckboxGroupOptions>({
  name: 'checkbox-group',

  addOptions() {
    return {
      itemTypeName: 'checkbox',
      HTMLAttributes: {},
    };
  },

  group: 'block list',

  content() {
    return `${this.options.itemTypeName}+`;
  },

  parseHTML() {
    return [
      {
        tag: `ul[data-type="${this.name}"]`,
        priority: 51,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'ul',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-type': this.name,
        class: 'list-none p-0 my-4',
      }),
      0,
    ];
  },

  addCommands() {
    return {
      toggleCheckboxGroup:
        () =>
        ({ commands }) => {
          return commands.toggleList(this.name, this.options.itemTypeName);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-9': () => this.editor.commands.toggleCheckboxGroup(),
    };
  },
});

export default CheckboxGroup;
