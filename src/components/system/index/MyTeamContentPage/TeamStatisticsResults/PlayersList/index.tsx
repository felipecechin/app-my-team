import { IPlayer } from '@/types/player'

interface IPlayersListProps {
    players: IPlayer[]
}

function PlayersList({ players }: IPlayersListProps): JSX.Element {
    return (
        <ul className='w-full max-h-60 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4'>
            {players.map((player) => (
                <li
                    className='flex flex-col'
                    key={player.id}
                >
                    <span className='text-lg font-bold text-emerald-800'>
                        {player.name}
                    </span>
                    <span className='ml-2 text-sm italic font-medium text-gray-800'>
                        Idade: {player.age}
                    </span>
                    <span className='ml-2 text-sm italic font-medium text-gray-800'>
                        Nacionalidade: {player.nationality}
                    </span>
                </li>
            ))}
        </ul>
    )
}

export default PlayersList