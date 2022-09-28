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
}: TableHeaderProps<T, K>) {
  return (
    <TableHead>
      <TableRow>
        {checkbox && (
          <TableCell padding='checkbox'>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all' }}
            />
          </TableCell>
        )}
        {headCells.map((headCell, i) => {
          if (i === 0) return <TableCell style={{ display: 'none' }} key={i} />
          return (
            <TableCell
              key={i}
              sortDirection={orderBy === headCell.key ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.key}
                onClick={() => onSort(headCell.key)}
                direction={orderBy === headCell.key ? order : undefined}
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
}
