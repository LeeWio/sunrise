import {
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
} from "@tiptap/react";

export interface ChipOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    chip: {
      /**
       * Set a chip mark
       */
      setChip: () => ReturnType;

      /*
       * Toggle inline chip
       */
      toggleChip: () => ReturnType;

      /*
       * Unset a chip mark
       */
      unsetChip: () => ReturnType;
    };
  }
}

/**
 * Regular expressions to match inline code blocks enclosed in backticks.
 *  It matches:
 *     - An opening backtick, followed by
 *     - Any text that doesn't include a backtick (captured for marking), followed by
 *     - A closing backtick as the final character.
 *  This ensures that any text between backticks is formatted as code,
 *  regardless of the surrounding characters (exception being another backtick).
 */
export const inputRegex = /(^|[^`])`([^`]+)`(?!`)$/;

/**
 * Matches inline code while pasting.
 */
export const pasteRegex = /(^|[^`])`([^`]+)`(?!`)/g;

export const Chip = Mark.create<ChipOptions>({
  name: "chip",

  addOptions() {
    return {
      HTMLAttributes: {
        class: "chip chip--soft chip--sm",
      },
    };
  },

  excludes: "_",

  exitable: true,

  parseHTML() {
    return [{ tag: "span" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  markdownTokenName: "chipspan",

  parseMarkdown(token, helpers) {
    return helpers.applyMark("chip", [
      { type: "text", text: token.text || "" },
    ]);
  },

  renderMarkdown(node, helpers) {
    if (!node.content) {
      return "";
    }

    return `\`${helpers.renderChildren(node.content)}\``;
  },

  addCommands() {
    return {
      setChip:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },

      toggleChip:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },

      unsetChip:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-e": () => this.editor.commands.toggleChip(),
    };
  },

  addInputRules() {
    return [
      markInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: pasteRegex,
        type: this.type,
      }),
    ];
  },
});
