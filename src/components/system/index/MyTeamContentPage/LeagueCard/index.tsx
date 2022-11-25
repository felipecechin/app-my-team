import { ILeague } from '@/types/league'
import Image from 'next/image'
import classNames from '@/utils/classNames'

interface ILeagueCardProps {
    league: ILeague
    onClick: (league: ILeague) => void
    selected?: boolean
}

function LeagueCard({
    league,
    onClick,
    selected = false,
}: ILeagueCardProps): JSX.Element {
    return (
        <div
            className={classNames(
                'py-4 px-4 border border-emerald-800 shadow-lg shadow-emerald-200  rounded-lg flex flex-col items-center justify-center',
                !selected &&
                    'hover:shadow-emerald-300 hover:bg-green-100 hover:cursor-pointer',
                selected
                    ? 'bg-emerald-800 text-white'
                    : 'bg-green-50 text-emerald-800',
                'font-bold text-sm md:text-base'
            )}
            data-testid='testleaguecard'
            onClick={() => onClick(league)}
            role={'button'}
        >
            <div className='relative w-16 h-16'>
                <Image
                    alt='svg'
                    fill
                    src={league.logo}
                    style={{ objectFit: 'contain' }}
                />
            </div>
            <p className='text-center'>{league.name}</p>
        </div>
    )
}

export default LeagueCard
