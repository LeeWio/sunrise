import type { Node as ProseMirrorNode } from "@tiptap/pm/model";

import {
  KeyboardShortcutCommand,
  mergeAttributes,
  Node,
  ReactNodeViewRenderer,
  renderNestedMarkdownContent,
  wrappingInputRule,
} from "@tiptap/react";

import { CheckboxView } from "./views/checkbox-view";

export interface CheckboxOptions {
  /**
   * A callback function that is called when the checkbox is clicked while the editor is in readonly mode.
   * @param node The prosemirror node of the task item
   * @param checked The new checked state
   * @returns boolean
   */
  onReadOnlyChecked?: (node: ProseMirrorNode, checked: boolean) => boolean;

  /**
   * Controls whether the checkbox items can be nested or not.
   * @default false
   * @example true
   */
  nested: boolean;

  /**
   * HTML attributes to add to the checkbox item element.
   * @default {}
   * @example { class: 'foo' }
   */
  HTMLAttributes: Record<string, any>;

  /**
   * The node type for checkbox nodes
   * @default 'checkbox'
   * @example 'myCustomCheckbox'
   */
  checkboxTypeName: string;

  /**
   * The node type for checkbox group nodes
   * @default 'checkboxGroup'
   * @example 'myCustomCheckboxGroup'
   */
  checkboxGroupTypeName: string;

  /**
   * Accessibility options for the checkbox item.
   * @default {}
   * @example
   * ```js
   * {
   *   checkboxLabel: (node) => `Task item: ${node.textContent || 'empty task item'}`
   * }
   */
  a11y?: {
    checkboxLabel?: (node: Node, checked: boolean) => string;
  };
}

/**
 * Matches a checkbox item to a - [ ] on input.
 */
export const inputRegex = /^\s*(\[([( |x])?\])\s$/;

export const Checkbox = Node.create<CheckboxOptions>({
  name: "checkbox",

  addOptions() {
    return {
      nested: false,
      HTMLAttributes: {},
      checkboxGroupTypeName: "checkbox-group",
      a11y: undefined,
      checkboxTypeName: this.name,
    };
  },

  content() {
    return this.options.nested ? "paragraph block*" : "paragraph+";
  },

  defining: true,

  addAttributes() {
    return {
      checked: {
        default: false,
        keepOnSplit: false,
        parseHTML: (element) => {
          const dataChecked = element.getAttribute("data-checked");

          return dataChecked === "" || dataChecked === "true";
        },
        renderHTML: (attributes) => ({
          "data-checked": attributes.checked,
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
      "li",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": this.name,
        "data-checked": node.attrs.checked,
      }),
      0,
    ];
  },

  parseMarkdown: (token, h) => {
    // Parse the checkbox item's text content into paragraph content
    const content = [];

    // First, add the main paragraph content
    if (token.tokens && token.tokens.length > 0) {
      // If we have tokens, create a paragraph with the inline content
      content.push(h.createNode("paragraph", {}, h.parseInline(token.tokens)));
    } else if (token.text) {
      // If we have raw text, create a paragraph with text node
      content.push(
        h.createNode("paragraph", {}, [
          h.createNode("text", { text: token.text }),
        ]),
      );
    } else {
      // Fallback: empty paragraph
      content.push(h.createNode("paragraph", {}, []));
    }

    // Then, add any nested content (like nested checkbox lists)
    if (token.nestedTokens && token.nestedTokens.length > 0) {
      const nestedContent = h.parseChildren(token.nestedTokens);

      content.push(...nestedContent);
    }

    return h.createNode(
      "checkbox",
      { checked: token.checked || false },
      content,
    );
  },

  renderMarkdown: (node, h) => {
    const checkedChar = node.attrs?.checked ? "x" : " ";
    const prefix = `- [${checkedChar}] `;

    return renderNestedMarkdownContent(node, h, prefix);
  },

  addKeyboardShortcuts() {
    const shortcuts: {
      [key: string]: KeyboardShortcutCommand;
    } = {
      Enter: () => this.editor.commands.splitListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name),
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
          checked: match[match.length - 1] === "x",
        }),
      }),
    ];
  },
});
