import {
  AlignKit,
  AutoformatKit,
  BasicBlocksKit,
  BasicMarksKit,
  BlockPlaceholderKit,
  ColumnKit,
} from '.'

export const Extensionkit = [
  ...ColumnKit,
  ...BlockPlaceholderKit,
  ...AlignKit,
  ...AutoformatKit,
  ...BasicBlocksKit,
  ...BasicMarksKit,
]
