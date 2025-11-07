import { mergeAttributes, Node } from "@tiptap/react";

export interface CheckboxGroupOptions {
  /**
   * The node type name for a checkbox item.
   * @default 'checkbox'
   * @example 'myCustomCheckbox'
   */
  itemTypeName: string;

  /**
   * The HTML attributes for a checkbox group node.
   * @default {}
   * @example { class: 'foo' }
   */
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    checkboxGroup: {
      /**
       * Toggle a checkbox group
       * @example editor.commands.toggleCheckboxGroup()
       */
      toggleCheckboxGroup: () => ReturnType;
    };
  }
}

/**
 * This extension allows you to create checkbox groups.
 */
export const CheckboxGroup = Node.create<CheckboxGroupOptions>({
  name: "checkbox-group",

  addOptions() {
    return {
      itemTypeName: "checkbox",
      HTMLAttributes: {},
    };
  },

  group: "block list",

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
      "ul",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": this.name,
        class: "",
      }),
      0,
    ];
  },

  parseMarkdown: (token, h) => {
    return h.createNode(
      "checkbox-group",
      {},
      h.parseChildren(token.items || []),
    );
  },

  renderMarkdown: (node, h) => {
    if (!node.content) {
      return "";
    }

    return h.renderChildren(node.content, "\n");
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
      "Mod-Shift-9": () => this.editor.commands.toggleCheckboxGroup(),
    };
  },
});
