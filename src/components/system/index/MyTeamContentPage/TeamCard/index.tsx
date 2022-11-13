import { ITeam } from '@/types/team'
import Image from 'next/image'
import classNames from '@/utils/classNames'

interface ITeamCardProps {
    team: ITeam
    onClick: (team: ITeam) => void
    selected?: boolean
}

function TeamCard({ team, onClick, selected = false }: ITeamCardProps): JSX.Element {
    return (
        <div
            className={
                classNames(
                    'py-4 px-4 border border-emerald-800 shadow-lg shadow-emerald-200  rounded-lg flex flex-col items-center justify-center',
                    !selected && 'hover:shadow-emerald-300 hover:bg-green-100 hover:cursor-pointer',
                    selected ? 'bg-emerald-800 text-white' : 'bg-green-50 text-emerald-800',
                    'font-bold text-sm md:text-base'
                )
            }
            onClick={() => onClick(team)}
            role={'button'}
        >
            <div className='relative w-16 h-16'>
                <Image
                    alt='svg'
                    fill
                    src={team.logo}
                    style={{ objectFit: 'contain' }}
                />
            </div>
            <p className='text-center'>{team.name}</p>
        </div>
    )
}

export default TeamCard