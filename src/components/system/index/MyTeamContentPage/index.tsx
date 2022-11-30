import { RefObject, useCallback, useRef, useState } from 'react'
import { mergeWith as lodashMergeWith, orderBy as lodashOrderBy } from 'lodash'

import ButtonRemove from './ButtonRemove'
import CountryCard from './CountryCard'
import { FaSearch } from 'react-icons/fa'
import { ICountry } from '@/types/country'
import { ILeague } from '@/types/league'
import { IPlayer } from '@/types/player'
import { IResultsTable } from '@/types/resultsTable'
import { ITeam } from '@/types/team'
import { ITeamStatistics } from '@/types/teamStatistics'
import LeagueCard from './LeagueCard'
import SeasonCard from './SeasonCard'
import TeamCard from './TeamCard'
import TeamStatisticsResults from './TeamStatisticsResults'
import classNames from '@/utils/classNames'
import fetcher from '@/utils/fetcher'
import { reactSwal } from '@/utils/reactSwal'
import { sweetAlertOptions } from '@/utils/sweetAlertOptions'
import { useAuth } from '@/contexts/AuthContext'

interface IMyTeamContentPageProps {
    countries: ICountry[]
    seasons: number[]
}

interface ISelectedFilter {
    country: ICountry | null
    league: ILeague | null
    season: number | null
    team: ITeam | null
    teamStatistics: ITeamStatistics | null
}

interface IGoalsAggregated {
    [key: string]: {
        total: number
    }
}

interface IFetchResponseTeams {
    response: {
        team: ITeam
    }[]
}

interface IFetchResponseLeagues {
    response: {
        league: ILeague
    }[]
}

interface IFetchResponsePlayers {
    response: {
        player: IPlayer
    }[]
}

interface IGoals {
    minute: {
        [key: string]: {
            total: number | null
        }
    }
}

interface IFetchResponseTeamStatistics {
    response: {
        fixtures: IResultsTable
        goals: {
            for: IGoals
            against: IGoals
        }
        lineups: {
            formation: string
            played: number
        }[]
    }
}

export default function MyTeamContentPage({
    countries,
    seasons,
}: IMyTeamContentPageProps): JSX.Element {
    const { token } = useAuth()
    const [selectedFiltersAndResults, setSelectedFiltersAndResults] =
        useState<ISelectedFilter>({
            country: null,
            league: null,
            season: null,
            team: null,
            teamStatistics: null,
        })
    const [filteredCountries, setFilteredCountries] = useState(countries)
    const inputSearchCountryRef = useRef<HTMLInputElement>(null)
    const divCountriesRef = useRef<HTMLDivElement>(null)

    const [filteredSeasons, setFilteredSeasons] = useState(seasons)
    const inputSearchSeasonRef = useRef<HTMLInputElement>(null)
    const divSeasonsRef = useRef<HTMLDivElement>(null)

    const [filteredLeagues, setFilteredLeagues] = useState<ILeague[]>([])
    const loadedLeagues = useRef<ILeague[]>([])
    const divLeaguesRef = useRef<HTMLDivElement>(null)
    const inputSearchLeagueRef = useRef<HTMLInputElement>(null)

    const [filteredTeams, setFilteredTeams] = useState<ITeam[]>([])
    const loadedTeams = useRef<ITeam[]>([])
    const divTeamsRef = useRef<HTMLDivElement>(null)
    const inputSearchTeamRef = useRef<HTMLInputElement>(null)

    const divResultsRef = useRef<HTMLDivElement>(null)

    const executeScrollTo = useCallback((ref: RefObject<HTMLElement>): void => {
        setTimeout(() => {
            if (ref.current) {
                ref.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                })
            }
        }, 500)
    }, [])

    const handleSelectCountry = useCallback(
        (country: ICountry): void => {
            setSelectedFiltersAndResults({
                country,
                league: null,
                season: null,
                team: null,
                teamStatistics: null,
            })
            executeScrollTo(divSeasonsRef)
            if (
                inputSearchCountryRef.current &&
                inputSearchCountryRef.current.value
            ) {
                inputSearchCountryRef.current.value = ''
                setFilteredCountries(countries)
            }
        },
        [executeScrollTo, countries]
    )

    const handleSearchCountry = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            const search = event.target.value.toLowerCase()
            const filtered = countries.filter((country) =>
                country.name.toLowerCase().includes(search)
            )
            setFilteredCountries(filtered)
        },
        [countries]
    )

    const handleSelectSeason = useCallback(
        async (season: number): Promise<void> => {
            setSelectedFiltersAndResults((prev) => {
                return {
                    ...prev,
                    season,
                    league: null,
                    team: null,
                    teamStatistics: null,
                }
            })
            executeScrollTo(divLeaguesRef)
            if (
                inputSearchSeasonRef.current &&
                inputSearchSeasonRef.current.value
            ) {
                inputSearchSeasonRef.current.value = ''
                setFilteredSeasons(seasons)
            }

            reactSwal.fire({
                title: 'Por favor, aguarde...',
                allowEscapeKey: false,
                allowOutsideClick: false,
            })
            reactSwal.showLoading(null)
            try {
                const response = (await fetcher({
                    url: '/leagues',
                    method: 'GET',
                    queryParams: {
                        code: selectedFiltersAndResults.country?.code as string,
                        season: String(season),
                    },
                    auth: token,
                })) as IFetchResponseLeagues

                loadedLeagues.current = response.response.map(
                    (item) => item.league
                )
                setFilteredLeagues(loadedLeagues.current)
                reactSwal.close()
            } catch (err) {
                reactSwal.fire({
                    title: 'Oops!',
                    icon: 'error',
                    text: 'Ocorreu algum erro ao buscar as ligas',
                    confirmButtonColor: sweetAlertOptions.confirmButtonColor,
                })
            }
        },
        [executeScrollTo, seasons, selectedFiltersAndResults, token]
    )

    const handleSearchSeason = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            const search = event.target.value.toLowerCase()
            const filtered = seasons.filter((season) =>
                season.toString().toLowerCase().includes(search)
            )
            setFilteredSeasons(filtered)
        },
        [seasons]
    )

    const handleSelectLeague = useCallback(
        async (league: ILeague): Promise<void> => {
            setSelectedFiltersAndResults((prev) => {
                return {
                    ...prev,
                    league,
                    team: null,
                    teamStatistics: null,
                }
            })
            executeScrollTo(divTeamsRef)
            if (
                inputSearchLeagueRef.current &&
                inputSearchLeagueRef.current.value
            ) {
                inputSearchLeagueRef.current.value = ''
                setFilteredLeagues(loadedLeagues.current)
            }

            reactSwal.fire({
                title: 'Por favor, aguarde...',
                allowEscapeKey: false,
                allowOutsideClick: false,
            })
            reactSwal.showLoading(null)
            try {
                const response = (await fetcher({
                    url: '/teams',
                    method: 'GET',
                    queryParams: {
                        country: selectedFiltersAndResults.country
                            ?.name as string,
                        season: String(selectedFiltersAndResults.season),
                        league: String(league.id),
                    },
                    auth: token,
                })) as IFetchResponseTeams

                loadedTeams.current = response.response.map((item) => item.team)
                setFilteredTeams(loadedTeams.current)
                reactSwal.close()
            } catch (err) {
                reactSwal.fire({
                    title: 'Oops!',
                    icon: 'error',
                    text: 'Ocorreu algum erro ao buscar os times',
                    confirmButtonColor: sweetAlertOptions.confirmButtonColor,
                })
            }
        },
        [executeScrollTo, selectedFiltersAndResults, token]
    )

    const handleSearchLeague = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            const search = event.target.value.toLowerCase()
            const filtered = loadedLeagues.current.filter((league) =>
                league.name.toLowerCase().includes(search)
            )
            setFilteredLeagues(filtered)
        },
        []
    )

    const handleSelectTeam = useCallback(
        async (team: ITeam): Promise<void> => {
            if (
                inputSearchTeamRef.current &&
                inputSearchTeamRef.current.value
            ) {
                inputSearchTeamRef.current.value = ''
                setFilteredTeams(loadedTeams.current)
            }

            reactSwal.fire({
                title: 'Por favor, aguarde...',
                allowEscapeKey: false,
                allowOutsideClick: false,
            })
            reactSwal.showLoading(null)
            const queryParams = {
                league: String(selectedFiltersAndResults.league?.id as number),
                season: String(selectedFiltersAndResults.season),
                team: String(team.id),
            }

            try {
                const [playersResponse, teamStatisticsResponse]: [
                    IFetchResponsePlayers,
                    IFetchResponseTeamStatistics
                ] = await Promise.all([
                    fetcher({
                        url: '/players',
                        method: 'GET',
                        queryParams,
                        auth: token,
                    }),
                    fetcher({
                        url: '/teams/statistics',
                        method: 'GET',
                        queryParams,
                        auth: token,
                    }),
                ])
                const players = playersResponse.response.map(
                    (item) => item.player
                )
                const resultsTable = teamStatisticsResponse.response.fixtures
                const mostUsedFormation =
                    lodashOrderBy(
                        teamStatisticsResponse.response.lineups,
                        ['played'],
                        ['desc']
                    )[0]?.formation ?? 'Sem informação'
                const goalsForMinutes =
                    teamStatisticsResponse.response.goals.for.minute
                const goalsAgainstMinutes =
                    teamStatisticsResponse.response.goals.against.minute
                const goalsAggregated = lodashMergeWith(
                    goalsForMinutes,
                    goalsAgainstMinutes,
                    (objValue, srcValue, key) => {
                        if (key === 'total') {
                            return objValue + srcValue
                        }
                    }
                ) as unknown as IGoalsAggregated
                const goalsAggregatedToArray = Object.keys(goalsAggregated).map(
                    (key) => {
                        return {
                            minute: key + ' min',
                            goals: goalsAggregated[key].total,
                        }
                    }
                )

                executeScrollTo(divResultsRef)
                setSelectedFiltersAndResults((prev) => {
                    return {
                        ...prev,
                        team,
                        teamStatistics: {
                            players,
                            mostUsedFormation,
                            resultsTable,
                            goalsPerGameTime: goalsAggregatedToArray,
                        },
                    }
                })
                reactSwal.close()
            } catch (err) {
                reactSwal.fire({
                    title: 'Oops!',
                    icon: 'error',
                    text: 'Ocorreu algum erro ao buscar as estatísticas do time',
                    confirmButtonColor: sweetAlertOptions.confirmButtonColor,
                })
            }
        },
        [executeScrollTo, selectedFiltersAndResults, token]
    )

    const handleSearchTeam = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            const search = event.target.value.toLowerCase()
            const filtered = loadedTeams.current.filter((team) =>
                team.name.toLowerCase().includes(search)
            )
            setFilteredTeams(filtered)
        },
        []
    )

    return (
        <div className='flex flex-col'>
            <div
                className='bg-white rounded-lg shadow-lg px-4 py-4 flex flex-col'
                ref={divCountriesRef}
            >
                <p className='font-bold text-emerald-800 text-lg'>
                    Primeiro, selecione um país.
                </p>
                <div className='flex flex-col sm:flex-row items-center my-4'>
                    <div className='relative w-full sm:w-auto'>
                        <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                            <FaSearch className='text-gray-400' />
                        </div>
                        <input
                            className='border border-emerald-600 w-full sm:max-w-sm pl-10 py-2 rounded-lg focus:outline-none focus:ring focus:ring-emerald-300'
                            onChange={handleSearchCountry}
                            placeholder='País'
                            ref={inputSearchCountryRef}
                            type='text'
                        />
                    </div>
                    {selectedFiltersAndResults.country && (
                        <ButtonRemove
                            label={selectedFiltersAndResults.country.name}
                            onClick={() =>
                                setSelectedFiltersAndResults({
                                    country: null,
                                    league: null,
                                    season: null,
                                    team: null,
                                    teamStatistics: null,
                                })
                            }
                        />
                    )}
                </div>
                <div className='overflow-y-auto max-h-72 mt-4'>
                    <div
                        className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3'
                        data-testid='testlistcountries'
                    >
                        {filteredCountries.map((country) => (
                            <CountryCard
                                country={country}
                                key={country.name}
                                onClick={handleSelectCountry}
                                selected={
                                    selectedFiltersAndResults.country?.code ===
                                    country.code
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div
                className={classNames(
                    'bg-white rounded-lg shadow-lg px-4 py-4 flex flex-col mt-6',
                    !selectedFiltersAndResults.country && 'hidden'
                )}
                ref={divSeasonsRef}
            >
                <p className='font-bold text-emerald-800 text-lg'>
                    Agora, selecione uma temporada.
                </p>
                <div className='flex flex-col sm:flex-row items-center my-4'>
                    <div className='relative w-full sm:w-auto'>
                        <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                            <FaSearch className='text-gray-400' />
                        </div>
                        <input
                            className='border border-emerald-600 w-full sm:max-w-sm pl-10 py-2 rounded-lg focus:outline-none focus:ring focus:ring-emerald-300'
                            onChange={handleSearchSeason}
                            placeholder='Ano'
                            ref={inputSearchSeasonRef}
                            type='text'
                        />
                    </div>
                    {selectedFiltersAndResults.season && (
                        <ButtonRemove
                            label={selectedFiltersAndResults.season}
                            onClick={() =>
                                setSelectedFiltersAndResults((prev) => {
                                    return {
                                        ...prev,
                                        season: null,
                                        league: null,
                                        team: null,
                                        teamStatistics: null,
                                    }
                                })
                            }
                        />
                    )}
                </div>
                <div className='overflow-y-auto max-h-72 mt-4'>
                    <div
                        className='grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3'
                        data-testid='testlistseasons'
                    >
                        {filteredSeasons.map((season) => (
                            <SeasonCard
                                key={season}
                                onClick={handleSelectSeason}
                                season={season}
                                selected={
                                    selectedFiltersAndResults.season === season
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div
                className={classNames(
                    'bg-white rounded-lg shadow-lg px-4 py-4 flex flex-col mt-6',
                    !selectedFiltersAndResults.season && 'hidden'
                )}
                ref={divLeaguesRef}
            >
                <p className='font-bold text-emerald-800 text-lg'>
                    Agora, selecione uma liga.
                </p>
                <div className='flex flex-col sm:flex-row items-center my-4'>
                    <div className='relative w-full sm:w-auto'>
                        <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                            <FaSearch className='text-gray-400' />
                        </div>
                        <input
                            className='border border-emerald-600 w-full sm:max-w-sm pl-10 py-2 rounded-lg focus:outline-none focus:ring focus:ring-emerald-300'
                            onChange={handleSearchLeague}
                            placeholder='Liga'
                            ref={inputSearchLeagueRef}
                            type='text'
                        />
                    </div>
                    {selectedFiltersAndResults.league && (
                        <ButtonRemove
                            label={selectedFiltersAndResults.league.name}
                            onClick={() =>
                                setSelectedFiltersAndResults((prev) => {
                                    return {
                                        ...prev,
                                        league: null,
                                        team: null,
                                        teamStatistics: null,
                                    }
                                })
                            }
                        />
                    )}
                </div>
                <div className='overflow-y-auto max-h-72 mt-4'>
                    {filteredLeagues.length === 0 && (
                        <p className='italic'>Nenhuma liga encontrada.</p>
                    )}
                    <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3'>
                        {filteredLeagues.map((league) => (
                            <LeagueCard
                                key={league.id}
                                league={league}
                                onClick={handleSelectLeague}
                                selected={
                                    selectedFiltersAndResults.league?.id ===
                                    league.id
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div
                className={classNames(
                    'bg-white rounded-lg shadow-lg px-4 py-4 flex flex-col mt-6',
                    !selectedFiltersAndResults.league && 'hidden'
                )}
                ref={divTeamsRef}
            >
                <p className='font-bold text-emerald-800 text-lg'>
                    Agora, selecione um time.
                </p>
                <div className='flex flex-col sm:flex-row items-center my-4'>
                    <div className='relative w-full sm:w-auto'>
                        <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                            <FaSearch className='text-gray-400' />
                        </div>
                        <input
                            className='border border-emerald-600 w-full sm:max-w-sm pl-10 py-2 rounded-lg focus:outline-none focus:ring focus:ring-emerald-300'
                            onChange={handleSearchTeam}
                            placeholder='Time'
                            ref={inputSearchTeamRef}
                            type='text'
                        />
                    </div>
                    {selectedFiltersAndResults.team && (
                        <ButtonRemove
                            label={selectedFiltersAndResults.team.name}
                            onClick={() =>
                                setSelectedFiltersAndResults((prev) => ({
                                    ...prev,
                                    team: null,
                                    teamStatistics: null,
                                }))
                            }
                        />
                    )}
                </div>
                <div className='overflow-y-auto max-h-72 mt-4'>
                    {filteredLeagues.length === 0 && (
                        <p className='italic'>Nenhum time encontrado.</p>
                    )}
                    <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3'>
                        {filteredTeams.map((team) => (
                            <TeamCard
                                key={team.id}
                                onClick={handleSelectTeam}
                                selected={
                                    selectedFiltersAndResults.team?.id ===
                                    team.id
                                }
                                team={team}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {selectedFiltersAndResults.teamStatistics && (
                <TeamStatisticsResults
                    divResultsRef={divResultsRef}
                    teamStatistics={selectedFiltersAndResults.teamStatistics}
                />
            )}
        </div>
    )
}
