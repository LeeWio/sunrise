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
} from ".";

export const ExtensionKit = () => [
  StarterKit.configure({
    link: false,
  }),
  ImageUpload.configure({}),
  Highlight,
  TextAlign,
  Subscript,
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
];
