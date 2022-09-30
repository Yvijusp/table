import {
  Box,
  Button,
  Paper,
  Table,
  TableContainer,
  TablePagination,
  Toolbar,
  Typography,
} from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import ReusableTableBody from './TableBody'
import TableHeader from './TableHeader'

export interface HeadCell<T, K extends keyof T> {
  key: K
  label: string
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator<T, Key extends keyof T>(order: Order, orderBy?: Key) {
  if (!orderBy) return
  return order === 'desc'
    ? (a: T, b: T) => descendingComparator(a, b, orderBy)
    : (a: T, b: T) => -descendingComparator(a, b, orderBy)
}

export default function ReusableTable<T>({
  rows,
  headCells,
  defaultOrder,
  uniqKey,
  title,
  headerButtons,
  rowsPerPage = [5, 10, 25],
  isUniqueFieldHidden = true,
}: ReusableTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([])
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof T | undefined>(defaultOrder)
  const [page, setPage] = useState(0)
  const [displayedRowsPerPage, setDisplayedRowsPerPage] = useState(
    rowsPerPage[0]
  )
  const [displayedRows, setDisplayedRows] = useState<T[]>([])

  function handleSelectAllClick(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      return setSelectedRows(rows)
    }

    setSelectedRows([])
  }

  function handleSort(property: keyof T) {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(order === 'desc' ? undefined : property)
  }

  function handleRowClick(name: T, key: keyof T) {
    setSelectedRows((prev) => {
      if (prev.find((v) => v[key] === name[key])) {
        return prev.filter((n) => n !== name)
      } else {
        return [...prev, name]
      }
    })
  }

  function handleChangePage(newPage: number) {
    setPage(newPage)
  }

  function handleChangeRowsPerPage(event: ChangeEvent<HTMLInputElement>) {
    setDisplayedRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (key: keyof T, item: T[keyof T]) =>
    selectedRows.map((row) => row[key]).indexOf(item) !== -1

  useEffect(() => {
    if (!orderBy) {
      setDisplayedRows(
        rows.slice(
          page * displayedRowsPerPage,
          page * displayedRowsPerPage + displayedRowsPerPage
        )
      )
      return
    }

    setDisplayedRows(
      [...rows]
        .slice(
          page * displayedRowsPerPage,
          page * displayedRowsPerPage + displayedRowsPerPage
        )
        .sort(getComparator(order, orderBy))
    )
  }, [rows, order, orderBy, page, displayedRowsPerPage])

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * displayedRowsPerPage - rows.length) : 0

  return (
    <Paper>
      {(title || headerButtons) && (
        <Toolbar>
          {title && <Typography variant='h6'>{title}</Typography>}

          {headerButtons && (
            <Box sx={{ display: 'flex', gap: 2, marginLeft: 'auto' }}>
              <Button variant='outlined' data-testid='delete-button'>
                Delete
              </Button>
              <Button variant='contained' data-testid='edit-button'>
                Edit
              </Button>
            </Box>
          )}
        </Toolbar>
      )}
      <TableContainer>
        <Table>
          <TableHeader
            checkbox
            headCells={headCells}
            rowCount={rows.length}
            numSelected={selectedRows.length}
            onSelectAllClick={handleSelectAllClick}
            order={order}
            orderBy={orderBy}
            onSort={(property) => handleSort(property)}
            isUniqueFieldHidden={isUniqueFieldHidden}
          />
          <ReusableTableBody
            uniqKey={uniqKey}
            rows={displayedRows}
            headCells={headCells}
            isSelected={isSelected}
            checkbox={true}
            handleRowClick={handleRowClick}
            emptyRows={emptyRows}
            isUniqueFieldHidden={isUniqueFieldHidden}
          />
        </Table>
      </TableContainer>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Box ml={2}>
          <Typography variant='body2'>
            {selectedRows.length} Selected
          </Typography>
        </Box>
        <TablePagination
          style={{ marginLeft: 'auto' }}
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={displayedRowsPerPage}
          page={page}
          onPageChange={(_, page) => handleChangePage(page)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Paper>
  )
}

interface ReusableTableProps<T> {
  rows: T[]
  defaultOrder?: keyof T
  headCells: HeadCell<T, keyof T>[]
  uniqKey: keyof T
  title?: string
  headerButtons?: boolean
  rowsPerPage?: number[]
  isUniqueFieldHidden?: boolean
}

export type Order = 'asc' | 'desc'
