import { fireEvent, render, screen } from '@testing-library/react'

import TeamCard from '.'

const onClickMock = jest.fn()
const teamMock = {
    id: 31,
    name: 'team test',
    logo: 'https://restcountries.eu/data/bra.svg',
    code: 'team',
}
const cardTestId = 'testteamcard'

describe('TeamCard component', () => {
    it('should render correctly and call function when click on card', () => {
        render(
            <TeamCard
                onClick={onClickMock}
                team={teamMock}
            />
        )

        expect(screen.getByText('team test')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId(cardTestId))
        expect(onClickMock).toHaveBeenCalled()
    })
    it('should render correctly when card is not selected', () => {
        render(
            <TeamCard
                onClick={onClickMock}
                team={teamMock}
            />
        )

        const card = screen.getByTestId(cardTestId)
        expect(card).toHaveClass('bg-green-50')
    })
    it('should render correctly when card is selected', () => {
        render(
            <TeamCard
                onClick={onClickMock}
                selected={true}
                team={teamMock}
            />
        )

        const card = screen.getByTestId(cardTestId)
        expect(card).toHaveClass('bg-emerald-800')
    })
})
