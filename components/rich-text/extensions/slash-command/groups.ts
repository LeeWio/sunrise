import { Group } from "./types";

export const GROUPS: Group[] = [
  {
    name: "format",
    title: "Format",
    commands: [
      {
        name: "heading1",
        label: "Heading 1",
        description: "High-level section heading",
        aliases: ["h1"],
        iconName: "Heading1",
        action: (editor, range) => {
          editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run();
        },
      },
      {
        name: "heading2",
        label: "Heading 2",
        description: "Medium-level section heading",
        aliases: ["h2"],
        iconName: "Heading2",
        action: (editor, range) => {
          editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run();
        },
      },
      {
        name: "heading3",
        label: "Heading 3",
        description: "Low-level section heading",
        aliases: ["h3"],
        iconName: "Heading3",
        action: (editor, range) => {
          editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run();
        },
      },
      {
        name: "bulletList",
        label: "Bullet List",
        description: "Create a simple bulleted list",
        aliases: ["ul"],
        iconName: "ListUl",
        action: (editor, range) => {
          editor.chain().focus().deleteRange(range).toggleBulletList().run();
        },
      },
      {
        name: "orderedList",
        label: "Ordered List",
        description: "Create a list with numbering",
        aliases: ["ol"],
        iconName: "ListOl",
        action: (editor, range) => {
          editor.chain().focus().deleteRange(range).toggleOrderedList().run();
        },
      },
      {
        name: "blockquote",
        label: "Blockquote",
        description: "Insert a quote block",
        aliases: ["quote"],
        iconName: "QuoteOpen",
        action: (editor, range) => {
          editor.chain().focus().deleteRange(range).toggleBlockquote().run();
        },
      },
      {
        name: "codeBlock",
        label: "Code Block",
        description: "Insert a block of code",
        aliases: ["code"],
        iconName: "Code",
        action: (editor, range) => {
          editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
        },
      },
    ],
  },
  {
    name: "insert",
    title: "Insert",
    commands: [
      {
        name: "horizontalRule",
        label: "Horizontal Rule",
        description: "Insert a horizontal divider",
        aliases: ["hr", "divider"],
        iconName: "Minus",
        action: (editor, range) => {
          editor.chain().focus().deleteRange(range).setHorizontalRule().run();
        },
      },
      {
        name: "table",
        label: "Table",
        description: "Insert a 3x3 table",
        iconName: "Table",
        action: (editor, range) => {
          editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
        },
      },
    ],
  },
];
