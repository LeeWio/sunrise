import type { Node as ProseMirrorNode } from '@tiptap/pm/model';
import {
  KeyboardShortcutCommand,
  mergeAttributes,
  Node,
  ReactNodeViewRenderer,
  wrappingInputRule,
} from '@tiptap/react';
import { CheckboxView } from './views/checkbox-view';

export interface CheckboxOptions {
  onReadOnlyChecked?: (node: ProseMirrorNode, checked: boolean) => boolean;
  nested: boolean;
  HTMLAttributes: Record<string, any>;
  checkboxTypeName: string;
  checkboxGroupTypeName: string;
  a11y?: {
    checkboxLabel?: (node: ProseMirrorNode, checked: boolean) => string;
  };
}

// Matches "[] " or "[x] "
export const inputRegex = /^\s*(\[([x]?)\])\s$/;

export const Checkbox = Node.create<CheckboxOptions>({
  name: 'checkbox',

  addOptions() {
    return {
      nested: false,
      HTMLAttributes: {},
      checkboxGroupTypeName: 'checkbox-group',
      a11y: undefined,
      checkboxTypeName: this.name,
    };
  },

  content() {
    return this.options.nested ? 'paragraph block*' : 'paragraph+';
  },

  defining: true,

  addAttributes() {
    return {
      checked: {
        default: false,
        keepOnSplit: false,
        parseHTML: (element) => {
          const dataChecked = element.getAttribute('data-checked');
          return dataChecked === '' || dataChecked === 'true';
        },
        renderHTML: (attributes) => ({
          'data-checked': attributes.checked,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `li[data-type="${this.name}"]`,
        priority: 51,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'li',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-type': this.name,
        'data-checked': node.attrs.checked,
      }),
      0,
    ];
  },

  addKeyboardShortcuts() {
    const shortcuts: {
      [key: string]: KeyboardShortcutCommand;
    } = {
      Enter: () => this.editor.commands.splitListItem(this.name),
      'Shift-Tab': () => this.editor.commands.liftListItem(this.name),
    };

    if (!this.options.nested) {
      return shortcuts;
    }

    return {
      ...shortcuts,
      Tab: () => this.editor.commands.sinkListItem(this.name),
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(CheckboxView);
  },

  addInputRules() {
    return [
      wrappingInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => ({
          checked: match[match.length - 1] === 'x',
        }),
      }),
    ];
  },
});

export default Checkbox;
