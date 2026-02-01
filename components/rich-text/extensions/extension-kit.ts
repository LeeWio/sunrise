import {
  StarterKit,
  CharacterCount,
  Document,
  Columns,
  Column,
  Checkbox,
  CheckboxGroup,
  Heading,
  Link,
} from '.';

export const ExtensionKit = () => [
  Document,
  Columns,
  Column,
  CheckboxGroup,
  Checkbox,
  Heading,
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: 'https',
  }),
  StarterKit.configure({
    document: false,
    heading: false,
  }),
  CharacterCount.configure(),
];
