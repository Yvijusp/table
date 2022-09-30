import { Servants } from '../App'
import ReusableTable, { HeadCell } from './ReusableTable'
import servants from '../assets/data/nice_servant.json'

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

const data = servants as unknown as Servants[]

describe('ReusableTable', () => {
  beforeEach(() => {
    cy.mount(<ReusableTable headCells={headCells} rows={data} uniqKey='id' />)
  })
  it('mounts', () => {
    cy.contains('Altria Pendragon').should('be.visible')
  })

  it('goes to the next page', () => {
    cy.get('[data-testid=KeyboardArrowRightIcon]').click()
    cy.contains('6–10').should('be.visible')
  })

  it('allows to select and deselect all values', () => {
    cy.contains('0 Selected').should('be.visible')
    cy.get('[aria-label="select all"]').click()
    cy.contains('294 Selected').should('be.visible')

    cy.get('[aria-label="select all"]').click()
    cy.contains('0 Selected').should('be.visible')
  })

  it('allows to change rows per page', () => {
    cy.contains('Rows per page:').should('be.visible')
    cy.contains('1–5').should('be.visible')
    cy.get('[role=button]').contains('5').click()
    cy.get('[role=listbox]').contains('10').click()
    cy.contains('1–10').should('be.visible')
  })

  it('allows to select multiple rows', () => {
    cy.contains('0 Selected').should('be.visible')
    cy.get('[aria-label="0-select"]').click()
    cy.get('[aria-label="4-select"]').click()
    cy.contains('2 Selected').should('be.visible')
  })

  it('allows to sort by column', () => {
    cy.get('[data-testid=KeyboardArrowRightIcon]').click()

    cy.get('[data-testid=row-0]').contains('Gawain').should('be.visible')
    cy.get('[data-testid=sort-name]').click()
    cy.get('[data-testid=row-0]').contains('Bedivere').should('be.visible')

    cy.get('[data-testid=sort-name]').click()
    cy.get('[data-testid=row-0]').contains('Siegfried').should('be.visible')

    cy.get('[data-testid=sort-name]').click()
    cy.get('[data-testid=row-0]').contains('Gawain').should('be.visible')
  })

  it('renders title when props are passed', () => {
    cy.mount(
      <ReusableTable
        title='Servants'
        headCells={headCells}
        rows={data}
        uniqKey='id'
      />
    )
    cy.contains('Servants').should('be.visible')
  })

  it('renders header buttons when props are passed', () => {
    cy.mount(
      <ReusableTable
        headCells={headCells}
        rows={data}
        uniqKey='id'
        headerButtons
      />
    )

    cy.get('[data-testid=delete-button]')
      .contains('Delete')
      .should('be.visible')
    cy.get('[data-testid=edit-button]').contains('Edit').should('be.visible')
  })
})
