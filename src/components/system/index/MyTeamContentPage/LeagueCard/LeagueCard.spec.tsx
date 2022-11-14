import { fireEvent, render, screen } from '@testing-library/react'

import LeagueCard from '.'

describe('LeagueCard component', () => {
    it('should render correctly and call function when click on card', () => {
        const onClickMock = jest.fn()

        render(
            <LeagueCard
                league={{
                    id: 31,
                    name: 'league test',
                    logo: 'https://restcountries.eu/data/bra.svg',
                }}
                onClick={onClickMock}
            />
        )

        expect(screen.getByText('league test')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId('testleaguecard'))
        expect(onClickMock).toHaveBeenCalled()
    })
    it('should render correctly when card is not selected', () => {
        const onClickMock = jest.fn()

        render(
            <LeagueCard
                league={{
                    id: 31,
                    name: 'league test',
                    logo: 'https://restcountries.eu/data/bra.svg',
                }}
                onClick={onClickMock}
            />
        )

        const card = screen.getByTestId('testleaguecard')
        expect(card).toHaveClass('bg-green-50')
    })
    it('should render correctly when card is selected', () => {
        const onClickMock = jest.fn()

        render(
            <LeagueCard
                league={{
                    id: 31,
                    name: 'league test',
                    logo: 'https://restcountries.eu/data/bra.svg',
                }}
                onClick={onClickMock}
                selected={true}
            />
        )

        const card = screen.getByTestId('testleaguecard')
        expect(card).toHaveClass('bg-emerald-800')
    })
})
