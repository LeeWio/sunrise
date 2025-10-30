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
} from ".";

export const ExtensionKit = () => [
  StarterKit.configure({
    link: false,
  }),
  Highlight,
  TextAlign,
  Subscript,
  Superscript,
  Column,
  TextStyleKit,
  Columns,
  Link,
];
