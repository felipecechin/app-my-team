import classNames from '@/utils/classNames'

interface ISeasonCardProps {
    season: number
    selected?: boolean
    onClick: (season: number) => void
}

function SeasonCard({ season, selected = false, onClick }: ISeasonCardProps): JSX.Element {
    return (
        <span
            className={
                classNames(
                    'py-4 px-4 border border-emerald-800 shadow-lg shadow-emerald-200  rounded-lg flex flex-col items-center justify-center',
                    !selected && 'hover:shadow-emerald-300 hover:bg-green-100 hover:cursor-pointer',
                    selected ? 'bg-emerald-800 text-white' : 'bg-green-50 text-emerald-800',
                    'font-bold text-sm md:text-base'
                )
            }
            onClick={() => onClick(season)}
            role={'button'}
        >
            {season}
        </span>
    )
}

export default SeasonCard