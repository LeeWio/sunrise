import {
  AlignKit,
  AutoformatKit,
  BasicBlocksKit,
  BasicMarksKit,
  BlockPlaceholderKit,
  CodeBlockKit,
  ColumnKit,
  FontKit,
  IndentKit,
  LineHeightKit,
  LinkKit,
  ListKit,
} from '.'

export const Extensionkit = [
  ...CodeBlockKit,
  ...FontKit,
  ...ListKit,
  ...LineHeightKit,
  ...LinkKit,
  ...IndentKit,
  ...ColumnKit,
  ...BlockPlaceholderKit,
  ...AlignKit,
  ...AutoformatKit,
  ...BasicBlocksKit,
  ...BasicMarksKit,
]
