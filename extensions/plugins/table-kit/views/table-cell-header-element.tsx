import { TableCellElement } from './table-cell-element'

export const TableCellHeaderElement = (props: React.ComponentProps<typeof TableCellElement>) => {
  return <TableCellElement {...props} isHeader />
}
