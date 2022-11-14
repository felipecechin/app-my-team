import { render, screen } from '@testing-library/react'

import PlayersList from '.'

const playersMock = [
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
]

describe('PlayersList component', () => {
    it('should render correctly', () => {
        render(
            <PlayersList
                players={playersMock}
            />
        )

        expect(screen.getByTestId('testplayerslist')).toBeInTheDocument()
        expect(screen.getByTestId('testplayerslist').children).toHaveLength(2)
    })
})
