import { render, screen } from '@testing-library/react'

import ResultsDataTable from '.'

const dataMock = {
    played: {
        home: 1,
        away: 1,
        total: 2,
    },
    wins: {
        home: 1,
        away: 1,
        total: 2,
    },
    draws: {
        home: 1,
        away: 1,
        total: 2,
    },
    loses: {
        home: 1,
        away: 1,
        total: 2,
    },
}

describe('ResultsDataTable component', () => {
    it('should render correctly', () => {
        render(<ResultsDataTable data={dataMock} />)

        expect(
            screen.getByTestId('testresultsdatatable').firstChild
        ).toBeInstanceOf(HTMLTableSectionElement)
        expect(
            screen.getByTestId('testresultsdatatable').lastChild
        ).toBeInstanceOf(HTMLTableSectionElement)
        expect(
            screen.getByTestId('testresultsdatatable').querySelector('thead')
                ?.children
        ).toHaveLength(1)
        expect(
            screen
                .getByTestId('testresultsdatatable')
                .querySelector('thead > tr')?.children
        ).toHaveLength(4)
        expect(
            screen.getByTestId('testresultsdatatable').querySelector('tbody')
                ?.children
        ).toHaveLength(4)
        expect(
            screen
                .getByTestId('testresultsdatatable')
                .querySelector('tbody > tr')?.children
        ).toHaveLength(4)
    })
})
