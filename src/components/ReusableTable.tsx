import { Paper, Table, TableContainer, TablePagination } from '@mui/material'
import { ChangeEvent, useState } from 'react'
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
  header,
  defaultOrder,
  uniqKey,
}: ReusableTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([])
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof T | undefined>(defaultOrder)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

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
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (key: keyof T, item: T[keyof T]) =>
    selectedRows.map((row) => row[key]).indexOf(item) !== -1

  const displayedRows = rows
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .sort(getComparator(order, orderBy))

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHeader
            checkbox
            headCells={header}
            rowCount={rows.length}
            numSelected={selectedRows.length}
            onSelectAllClick={handleSelectAllClick}
            order={order}
            orderBy={orderBy}
            onSort={(property) => handleSort(property)}
          />
          <ReusableTableBody
            uniqKey={uniqKey}
            rows={displayedRows}
            header={header}
            isSelected={isSelected}
            checkbox={true}
            handleRowClick={handleRowClick}
            emptyRows={emptyRows}
          />
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, page) => handleChangePage(page)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

interface ReusableTableProps<T> {
  rows: T[]
  defaultOrder?: keyof T
  header: HeadCell<T, keyof T>[]
  uniqKey: keyof T
}

export type Order = 'asc' | 'desc'
