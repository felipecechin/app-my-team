/* eslint-disable @typescript-eslint/no-explicit-any */

import { fireEvent, render, screen } from '@testing-library/react'

import SeasonCard from '.'

const onClickMock = jest.fn()
const cardTestId = 'testseasoncard'

describe('SeasonCard component', () => {
    it('should render correctly and call function when click on card', () => {
        render(
            <SeasonCard
                onClick={onClickMock}
                season={2020}
            />
        )

        expect(screen.getByText('2020')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId(cardTestId))
        expect(onClickMock).toHaveBeenCalled()
    })
    it('should render correctly when card is not selected', () => {
        render(
            <SeasonCard
                onClick={onClickMock}
                season={2020}
            />
        )

        const card = screen.getByTestId(cardTestId)
        expect(card).toHaveClass('bg-green-50')
    })
    it('should render correctly when card is selected', () => {
        render(
            <SeasonCard
                onClick={onClickMock}
                season={2020}
                selected={true}
            />
        )

        const card = screen.getByTestId(cardTestId)
        expect(card).toHaveClass('bg-emerald-800')
    })
})
