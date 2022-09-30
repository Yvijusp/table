import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material'
import { ChangeEvent } from 'react'
import { HeadCell, Order } from './ReusableTable'

export default function TableHeader<T, K extends keyof T>({
  checkbox,
  headCells,
  numSelected,
  onSelectAllClick,
  onSort,
  order,
  orderBy,
  rowCount,
  isUniqueFieldHidden,
}: TableHeaderProps<T, K>) {
  return (
    <TableHead>
      <TableRow>
        {checkbox && (
          <TableCell padding='checkbox' style={{ width: '1%' }}>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all',
              }}
            />
          </TableCell>
        )}
        {headCells.map((headCell, i) => {
          if (i === 0)
            return (
              <TableCell
                style={{
                  display: isUniqueFieldHidden ? 'none' : 'table-cell',
                }}
                key={i}
              >
                {headCell.label}
              </TableCell>
            )
          return (
            <TableCell
              key={i}
              style={{ width: '20%' }}
              sortDirection={orderBy === headCell.key ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.key}
                onClick={() => onSort(headCell.key)}
                direction={orderBy === headCell.key ? order : undefined}
                data-testid={`sort-${String(headCell.key)}`}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}

interface TableHeaderProps<T, K extends keyof T> {
  checkbox?: boolean
  rowCount: number
  numSelected: number
  onSelectAllClick: (e: ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy?: K
  headCells: HeadCell<T, K>[]
  onSort: (property: K) => void
  isUniqueFieldHidden?: boolean
}
