import ReusableTable, { HeadCell } from './components/ReusableTable'
import Table from './components/Table'

interface Cheese {
  id: string | number
  name: string
  calories: number
  fat: number
}

const headCells: HeadCell<Cheese, keyof Cheese>[] = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'calories',
    label: 'Calories',
  },
  {
    key: 'fat',
    label: 'Fat',
  },
]

const rows: Cheese[] = [
  {
    id: 1,
    name: 'Parmesan',
    calories: 112,
    fat: 9.5,
  },
  {
    id: 2,
    name: 'Swiss',
    calories: 100,
    fat: 8,
  },
  {
    id: 3,
    name: 'Parmesan',
    calories: 112,
    fat: 9.5,
  },
  {
    id: 4,
    name: 'Parmesan',
    calories: 112,
    fat: 9.5,
  },
  {
    id: 5,
    name: 'Parmesan',
    calories: 112,
    fat: 9.5,
  },
  {
    id: 6,
    name: 'Parmesan',
    calories: 142,
    fat: 9.5,
  },
  {
    id: 7,
    name: 'Parmesan',
    calories: 152,
    fat: 9.5,
  },
]
function App() {
  return (
    <div className='App'>
      <Table />
      <ReusableTable rows={rows} header={headCells} uniqKey='id' />
    </div>
  )
}

export default App
