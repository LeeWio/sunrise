import {
  AlignKit,
  AutoformatKit,
  BasicBlocksKit,
  BasicMarksKit,
  BlockPlaceholderKit,
  ColumnKit,
  LinkKit,
} from '.'

export const Extensionkit = [
  ...LinkKit,
  ...ColumnKit,
  ...BlockPlaceholderKit,
  ...AlignKit,
  ...AutoformatKit,
  ...BasicBlocksKit,
  ...BasicMarksKit,
]
