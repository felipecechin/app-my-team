import { fireEvent, render, screen } from '@testing-library/react'

import MyTeamContentPage from '.'

const countriesMock = [
    {
        name: 'Brazil',
        code: 'BR',
        flag: 'https://restcountries.eu/data/bra.svg',
    },
    {
        name: 'United States of America',
        code: 'US',
        flag: 'https://restcountries.eu/data/usa.svg',
    }
]

const seasonsMock = [
    2019,
    2020,
    2021
]

describe('MyTeamContentPage component', () => {
    it('should render correctly', async () => {
        render(
            <MyTeamContentPage
                countries={countriesMock}
                seasons={seasonsMock}
            />
        )

        expect(screen.getByText('Primeiro, selecione um país.')).toBeInTheDocument()
        expect(screen.getByTestId('testlistcountries').children).toHaveLength(countriesMock.length)
    })
    it('should show seasons div when country is selected', async () => {
        render(
            <MyTeamContentPage
                countries={countriesMock}
                seasons={seasonsMock}
            />
        )

        const countryCard = screen.getByTestId('testlistcountries').childNodes[0]
        fireEvent.click(countryCard)

        expect(screen.getByText('Agora, selecione uma temporada.')).toBeInTheDocument()
    })
    it('should show leagues div when season is selected', async () => {
        render(
            <MyTeamContentPage
                countries={countriesMock}
                seasons={seasonsMock}
            />
        )

        const countryCard = screen.getByTestId('testlistcountries').childNodes[0]
        fireEvent.click(countryCard)

        const seasonCard = screen.getByTestId('testlistseasons').childNodes[0]
        fireEvent.click(seasonCard)

        expect(screen.getByText('Agora, selecione uma liga.')).toBeInTheDocument()
    })
})
