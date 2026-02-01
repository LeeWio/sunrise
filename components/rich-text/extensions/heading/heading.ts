import { mergeAttributes, Node, textblockTypeInputRule } from '@tiptap/react';

export type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingOptions {
  levels: Level[];
  HTMLAttributes: Record<string, string>;
}

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    heading: {
      setHeading: (attributes: { level: Level }) => ReturnType;
      toggleHeading: (attributes: { level: Level }) => ReturnType;
    };
  }
}

/**
 * Mapping of heading levels to specific Tailwind CSS utility classes.
 * Extracted as a constant for optimal performance.
 */
const LEVEL_CLASSES: Record<number, string> = {
  1: 'text-3xl mt-12 mb-4',
  2: 'text-2xl mt-10 mb-3',
  3: 'text-xl mt-8 mb-2',
  4: 'text-lg mt-6 mb-2',
  5: 'text-base mt-4 mb-1',
  6: 'text-sm mt-2 mb-1',
};

export const Heading = Node.create<HeadingOptions>({
  name: 'heading',

  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {},
    };
  },

  content: 'inline*',
  group: 'block',
  defining: true,

  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: false, // Internal logic uses this, doesn't need to be raw HTML attr
      },
    };
  },

  parseHTML() {
    return this.options.levels.map((level: Level) => ({
      tag: `h${level}`,
      attrs: { level },
    }));
  },

  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level as Level;
    const baseClass = LEVEL_CLASSES[level] || LEVEL_CLASSES[1];

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: `${baseClass} font-black tracking-tighter text-foreground first:mt-0 last:mb-0`,
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setHeading:
        (attributes) =>
        ({ commands }) => {
          return commands.setNode(this.name, attributes);
        },
      toggleHeading:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleNode(this.name, 'paragraph', attributes);
        },
    };
  },

  addKeyboardShortcuts() {
    return this.options.levels.reduce(
      (items, level) => ({
        ...items,
        [`Mod-Alt-${level}`]: () => this.editor.commands.toggleHeading({ level }),
      }),
      {}
    );
  },

  addInputRules() {
    return [
      // Unified single regex rule for better reliability and performance
      textblockTypeInputRule({
        find: /^(#{1,6})\s$/,
        type: this.type,
        getAttributes: (match) => ({
          level: match[1].length as Level,
        }),
      }),
    ];
  },
});

export default Heading;
