import { act, render, screen } from '@testing-library/react'

import React from 'react'
import TeamStatisticsResults from '.'

const teamStatisticsMock = {
    players: [
        {
            id: 33,
            name: 'player test',
            age: 20,
            nationality: 'Brazil',
        },
        {
            id: 32,
            name: 'player test 2',
            age: 21,
            nationality: 'England',
        }
    ],
    mostUsedFormation: '4-4-2',
    resultsTable: {
        played: {
            home: 1,
            away: 1,
            total: 2
        },
        wins: {
            home: 1,
            away: 1,
            total: 2
        },
        draws: {
            home: 1,
            away: 1,
            total: 2
        },
        loses: {
            home: 1,
            away: 1,
            total: 2
        }
    },
    goalsPerGameTime: [
        {
            minute: '0-15',
            goals: 21
        },
        {
            minute: '16-30',
            goals: 30
        }
    ]
}

jest.mock('react-apexcharts', () =>
    jest.fn(() => {
        return null
    })
)
jest.mock('apexcharts', () => ({
    exec: jest.fn(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return new Promise((resolve, reject) => {
            resolve('uri')
        })
    })
}))


describe('TeamStatisticsResults component', () => {
    it('should render correctly', async () => {
        const ref = React.createRef<HTMLDivElement>()
        await (act(async () => {
            render(
                <TeamStatisticsResults
                    divResultsRef={ref}
                    teamStatistics={teamStatisticsMock}
                />
            )
        }))
        expect(screen.getByText('Tabela de resultados')).toBeInTheDocument()
        expect(screen.getByText('Lista de jogadores')).toBeInTheDocument()
        expect(screen.getByText('Formação mais utilizada')).toBeInTheDocument()
        expect(screen.getByText('Quantidade de gols por tempo de jogo')).toBeInTheDocument()
    })
})
