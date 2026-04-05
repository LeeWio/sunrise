import { Node, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    columnGroup: {
      /**
       * Insert a multi-column layout.
       */
      insertColumns: (options: { columns: number }) => ReturnType;
    };
  }
}

/**
 * ColumnGroup node - The parent container for columns.
 * All styling, including responsive behavior, is handled via Tailwind and HeroUI tokens.
 * 
 * TODO: Implement column-menu functionality to allow users to switch layouts (e.g. 1:1, 1:2, etc.)
 */
export const ColumnGroup = Node.create({
  name: "columnGroup",

  group: "block",

  content: "column+",

  defining: true,

  isolating: true,

  addAttributes() {
    return {
      layout: {
        default: "1-1",
        parseHTML: (element) => element.getAttribute("data-layout"),
        renderHTML: (attributes) => ({
          "data-layout": attributes.layout,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="column-group"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "column-group",
        // Using HeroUI v3 tokens:
        // gap-4: standard spacing
        // max-md:flex-col: built-in responsive stacking
        class: "flex flex-row max-md:flex-col gap-4 max-md:gap-2 w-full my-8 items-stretch transition-all duration-300",
      }),
      0,
    ];
  },

  addCommands() {
    return {
      insertColumns:
        ({ columns }) =>
        ({ chain }) => {
          const columnNodes = Array.from({ length: columns }, () => ({
            type: "column",
            content: [{ type: "paragraph" }],
          }));

          return chain()
            .insertContent({
              type: this.name,
              content: columnNodes,
            })
            .run();
        },
    };
  },
});
