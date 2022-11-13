import { ITeamStatistics } from '@/types/teamStatistics'
import PlayersList from './PlayersList'
import ResultsDataTable from './ResultsDataTable'
import dynamic from 'next/dynamic'

// eslint-disable-next-line @typescript-eslint/naming-convention
const ApexPieChart = dynamic(() => import('@/components/shared/charts/ApexPieChart'), {
    ssr: false,
})

interface ITeamStatisticsResultsProps {
    teamStatistics: ITeamStatistics
    divResultsRef: React.RefObject<HTMLDivElement>
}

function TeamStatisticsResults({ teamStatistics, divResultsRef }: ITeamStatisticsResultsProps): JSX.Element {
    return (
        <div
            className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2'
            ref={divResultsRef}
        >
            <div className='px-4 py-4 bg-white rounded-lg shadow-lg flex flex-col'>
                <h2 className='text-2xl font-bold leading-6 text-emerald-900 my-6'>
                    Tabela de resultados
                </h2>
                <ResultsDataTable
                    data={teamStatistics.resultsTable}
                />
            </div>
            <div className='px-4 py-4 bg-white rounded-lg shadow-lg flex flex-col'>
                <h2 className='text-2xl font-bold leading-6 text-emerald-900 my-6'>
                    Lista de jogadores
                </h2>
                <div className='flex-grow flex'>
                    <PlayersList
                        players={teamStatistics.players}
                    />
                </div>
            </div>
            <div className='px-4 py-4 bg-white rounded-lg shadow-lg flex flex-col'>
                <h2 className='text-2xl font-bold leading-6 text-emerald-900 my-6'>
                    Formação mais utilizada
                </h2>
                <span className='text-5xl font-bold text-emerald-800 flex-grow flex items-center justify-center'>
                    {teamStatistics.mostUsedFormation}
                </span>
            </div>
            <div className='px-4 py-4 bg-white rounded-lg shadow-lg flex flex-col'>
                <h2 className='text-2xl font-bold leading-6 text-emerald-900 my-6'>
                    Quantidade de gols por tempo de jogo
                </h2>
                <span
                    className='flex-grow flex items-center justify-center'
                >
                    <ApexPieChart
                        data={teamStatistics.goalsPerGameTime}
                        labelsKey='minute'
                        responsiveHeight={[
                            '300px',
                            '250px',
                            '250px',
                            '300px',
                        ]}
                        responsiveLegendPosition={[
                            'bottom',
                            'bottom',
                            'bottom',
                            'bottom',
                        ]}
                        responsiveWidth={[
                            '100%',
                            '100%',
                            '100%',
                            '350px',
                        ]}
                        seriesKey='goals'
                        width="350px"
                    />
                </span>
            </div>
        </div>
    )
}

export default TeamStatisticsResults