/* eslint-disable @typescript-eslint/no-explicit-any */

import { fireEvent, render, screen } from '@testing-library/react'

import CountryCard from '.'

describe('CountryCard component', () => {
    it('should render correctly and call function when click on card', () => {
        const onClickMock = jest.fn()

        render(
            <CountryCard
                country={{
                    name: 'Brazil',
                    flag: 'https://restcountries.eu/data/bra.svg',
                    code: 'BR',
                }}
                onClick={onClickMock}
            />
        )

        expect(screen.getByText('Brazil')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId('testcountrycard'))
        expect(onClickMock).toHaveBeenCalled()
    })
    it('should render correctly when card is not selected', () => {
        const onClickMock = jest.fn()

        render(
            <CountryCard
                country={{
                    name: 'Brazil',
                    flag: 'https://restcountries.eu/data/bra.svg',
                    code: 'BR',
                }}
                onClick={onClickMock}
            />
        )

        const card = screen.getByTestId('testcountrycard')
        expect(card).toHaveClass('bg-green-50')
    })
    it('should render correctly when card is selected', () => {
        const onClickMock = jest.fn()

        render(
            <CountryCard
                country={{
                    name: 'Brazil',
                    flag: 'https://restcountries.eu/data/bra.svg',
                    code: 'BR',
                }}
                onClick={onClickMock}
                selected={true}
            />
        )

        const card = screen.getByTestId('testcountrycard')
        expect(card).toHaveClass('bg-emerald-800')
    })
})
