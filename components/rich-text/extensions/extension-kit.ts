import {
  StarterKit,
  Column,
  Columns,
  Link,
  Subscript,
  Superscript,
  TextAlign,
  TextStyleKit,
  Highlight,
  ImageBlock,
  ImageUpload,
  Document,
  Figcaption,
  HorizontalRule,
  Heading,
  Selection,
  CharacterCount,
  ListKit,
  Gapcursor,
  Placeholder,
  TrailingNode,
  Typography,
  Audio,
  Accordion,
  AudioUpload,
  Mathematics,
  Checkbox,
  CheckboxGroup,
  Chip,
} from ".";

export const ExtensionKit = () => [
  StarterKit.configure({
    link: false,
    document: false,
    horizontalRule: false,
    heading: false,
    code: false,
    codeBlock: false,
  }),

  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),

  CharacterCount.configure({
    limit: 5000,
  }),
  Chip,
  ListKit.configure({
    listItem: {
      HTMLAttributes: { class: "" },
    },
    taskItem: false,
    taskList: false,
    listKeymap: false,
  }),

  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: "Write something …",
  }),

  Mathematics.configure({
    inlineOptions: {
      // optional options for the inline math node
    },
    blockOptions: {
      // optional options for the block math node
    },
    katexOptions: {
      // optional options for the KaTeX renderer
    },
  }),
  TrailingNode.configure({}),
  Gapcursor,
  Selection,
  Typography,
  // UndoRedo,
  Figcaption,
  Checkbox,
  CheckboxGroup,
  HorizontalRule,
  ImageUpload.configure({}),
  Highlight,
  TextAlign,
  Subscript,
  Document,
  ImageBlock.configure({
    resize: {
      enabled: true,
    },
  }),
  Superscript,
  Column,
  TextStyleKit,
  Columns,
  Link,
  Audio,
  AudioUpload,
  Accordion,
];
