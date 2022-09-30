import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material'
import { ReactNode } from 'react'
import { HeadCell } from './ReusableTable'

export default function ReusableTableBody<T, K extends keyof T>({
  rows,
  checkbox,
  headCells,
  isSelected,
  handleRowClick,
  emptyRows,
  uniqKey,
  isUniqueFieldHidden,
}: TableBodyProps<T, K>) {
  return (
    <TableBody>
      {rows.map((row, i) => {
        return (
          <TableRow
            key={i}
            selected={isSelected(uniqKey, row[uniqKey])}
            onClick={() => handleRowClick(row, uniqKey)}
            data-testid={`row-${i}`}
          >
            {checkbox && (
              <TableCell padding='checkbox'>
                <Checkbox
                  checked={isSelected(uniqKey, row[uniqKey])}
                  inputProps={{ 'aria-label': `${i}-select` }}
                />
              </TableCell>
            )}
            {headCells.map((cell, index) => {
              if (index === 0)
                return (
                  <TableCell
                    style={{
                      display: isUniqueFieldHidden ? 'none' : 'table-cell',
                    }}
                    key={index}
                  >
                    {row[cell.key] as ReactNode}
                  </TableCell>
                )
              return (
                <TableCell key={index}>{row[cell.key] as ReactNode}</TableCell>
              )
            })}
          </TableRow>
        )
      })}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={headCells.length + 1} />
        </TableRow>
      )}
    </TableBody>
  )
}

interface TableBodyProps<T, K extends keyof T> {
  checkbox?: boolean
  rows: T[]
  headCells: HeadCell<T, K>[]
  isSelected: (row: keyof T, item: T[keyof T]) => boolean
  handleRowClick: (item: T, key: K) => void
  emptyRows: number
  uniqKey: K
  isUniqueFieldHidden?: boolean
}
