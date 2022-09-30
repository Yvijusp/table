import ReusableTable, { HeadCell } from './components/ReusableTable'
import servants from './assets/data/nice_servant.json'

export interface Servants {
  id: string | number
  name: string
  className: number
  gender: number
  flag: string
  type: string
}

const headCells: HeadCell<Servants, keyof Servants>[] = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'className',
    label: 'Class Name',
  },
]

function App() {
  const data = Object.assign(servants) as unknown as Servants[]
  return (
    <div className='App'>
      <ReusableTable rows={data} headCells={headCells} uniqKey='id' />
    </div>
  )
}

export default App
