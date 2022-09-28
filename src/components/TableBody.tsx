import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material'
import { HeadCell } from './ReusableTable'

export default function ReusableTableBody<T, K extends keyof T>({
  rows,
  checkbox,
  header,
  isSelected,
  handleRowClick,
  emptyRows,
  uniqKey,
}: TableBodyProps<T, K>) {
  return (
    <TableBody>
      {rows.map((row, i) => {
        return (
          <TableRow
            key={i}
            selected={isSelected(uniqKey, row[uniqKey])}
            onClick={() => handleRowClick(row, uniqKey)}
          >
            {checkbox && (
              <TableCell padding='checkbox'>
                <Checkbox checked={isSelected(uniqKey, row[uniqKey])} />
              </TableCell>
            )}
            {header.map((cell, index) => {
              if (index === 0)
                return <TableCell style={{ display: 'none' }} key={index} />
              return (
                <TableCell key={index}>{row[cell.key] as string}</TableCell>
              )
            })}
          </TableRow>
        )
      })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={header.length + 1} />
        </TableRow>
      )}
    </TableBody>
  )
}

interface TableBodyProps<T, K extends keyof T> {
  checkbox?: boolean
  rows: T[]
  header: HeadCell<T, K>[]
  isSelected: (row: keyof T, item: T[keyof T]) => boolean
  handleRowClick: (item: T, key: K) => void
  emptyRows: number
  uniqKey: K
}
