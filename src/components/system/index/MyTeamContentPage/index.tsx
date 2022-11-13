import { FaRegWindowClose, FaSearch } from 'react-icons/fa'
import { RefObject, useCallback, useRef, useState } from 'react'

import CountryCard from './CountryCard'
import { ICountry } from '@/types/country'
import { ILeague } from '@/types/league'
import LeagueCard from './LeagueCard'
import SeasonCard from './SeasonCard'
import classNames from '@/utils/classNames'

interface IMyTeamContentPageProps {
    countries: ICountry[]
    seasons: number[]
}

export default function MyTeamContentPage({ countries, seasons }: IMyTeamContentPageProps): JSX.Element {
    const [filteredCountries, setFilteredCountries] = useState(countries)
    const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null)
    const inputSearchCountryRef = useRef<HTMLInputElement>(null)
    const divCountriesRef = useRef<HTMLDivElement>(null)

    const [filteredSeasons, setFilteredSeasons] = useState(seasons)
    const [selectedSeason, setSelectedSeason] = useState<number | null>(null)
    const inputSearchSeasonRef = useRef<HTMLInputElement>(null)
    const divSeasonsRef = useRef<HTMLDivElement>(null)

    const [selectedLeague, setSelectedLeague] = useState<ILeague | null>(null)
    const [leagues, setLeagues] = useState<ILeague[]>([
        {
            'id': 88,
            'name': 'Eredivisie',
            'logo': 'https://media.api-sports.io/football/leagues/88.png'
        },
        {
            'id': 89,
            'name': 'Eerste Divisie',
            'logo': 'https://media.api-sports.io/football/leagues/89.png'
        },
        {
            'id': 61,
            'name': 'Ligue 1',
            'logo': 'https://media.api-sports.io/football/leagues/61.png'
        },
        {
            'id': 3123,
            'name': 'Ligue 1',
            'logo': 'https://media.api-sports.io/football/leagues/61.png'
        },
        {
            'id': 3211,
            'name': 'Ligue 1',
            'logo': 'https://media.api-sports.io/football/leagues/61.png'
        },
        {
            'id': 32113,
            'name': 'Ligue 1',
            'logo': 'https://media.api-sports.io/football/leagues/61.png'
        }
    ])
    const divLeaguesRef = useRef<HTMLDivElement>(null)

    const executeScrollTo = useCallback((ref: RefObject<HTMLElement>): void => {
        setTimeout(() => {
            if (ref.current) {
                ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }, 500)
    }, [])

    const handleSelectCountry = useCallback((country: ICountry): void => {
        setSelectedCountry(country)
        executeScrollTo(divSeasonsRef)
        if (inputSearchCountryRef.current && inputSearchCountryRef.current.value) {
            inputSearchCountryRef.current.value = ''
            setFilteredCountries(countries)
        }
    }, [executeScrollTo, countries])

    const handleSearchCountry = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        const search = event.target.value.toLowerCase()
        const filtered = countries.filter(country => country.name.toLowerCase().includes(search))
        setFilteredCountries(filtered)
    }, [countries])

    const handleSelectSeason = useCallback((season: number): void => {
        setSelectedSeason(season)
        executeScrollTo(divLeaguesRef)
        if (inputSearchSeasonRef.current && inputSearchSeasonRef.current.value) {
            inputSearchSeasonRef.current.value = ''
            setFilteredSeasons(seasons)
        }
    }, [executeScrollTo, seasons])

    const handleSearchSeason = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        const search = event.target.value.toLowerCase()
        const filtered = seasons.filter(season => season.toString().toLowerCase().includes(search))
        setFilteredSeasons(filtered)
    }, [seasons])

    const handleSelectLeague = useCallback((league: ILeague): void => {
        setSelectedLeague(league)
    }, [])

    return (
        <div className='flex flex-col'>
            <div className='bg-white rounded-lg shadow-lg px-4 py-4 flex flex-col' ref={divCountriesRef}>
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
                    {selectedCountry && (
                        <button
                            className={
                                classNames(
                                    'flex flex-row mt-2 sm:mt-0 sm:ml-2 text-emerald-800 font-bold items-center px-4 py-2 border border-emerald-800 shadow-lg shadow-emerald-200 bg-green-50 rounded-lg',
                                    'hover:shadow-emerald-300 hover:bg-green-100 hover:cursor-pointer'
                                )
                            }
                            onClick={() => setSelectedCountry(null)}
                        >
                            {selectedCountry.name}
                            <FaRegWindowClose className='ml-2' />
                        </button>
                    )}
                </div>
                <div className='overflow-y-auto max-h-72 mt-4'>
                    <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3'>
                        {filteredCountries.map((country) => (
                            <CountryCard
                                country={country}
                                key={country.code}
                                onClick={handleSelectCountry}
                                selected={selectedCountry?.code === country.code}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className={
                classNames(
                    'bg-white rounded-lg shadow-lg px-4 py-4 flex flex-col mt-6',
                    !selectedCountry && 'hidden'
                )
            }
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
                    {selectedSeason && (
                        <button
                            className={
                                classNames(
                                    'flex flex-row mt-2 sm:mt-0 sm:ml-2 text-emerald-800 font-bold items-center px-4 py-2 border border-emerald-800 shadow-lg shadow-emerald-200 bg-green-50 rounded-lg',
                                    'hover:shadow-emerald-300 hover:bg-green-100 hover:cursor-pointer'
                                )
                            }
                            onClick={() => setSelectedSeason(null)}
                        >
                            {selectedSeason}
                            <FaRegWindowClose className='ml-2' />
                        </button>
                    )}
                </div>
                <div className='overflow-y-auto max-h-72 mt-4'>
                    <div className='grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3'>
                        {filteredSeasons.map((season) => (
                            <SeasonCard
                                key={season}
                                onClick={handleSelectSeason}
                                season={season}
                                selected={selectedSeason === season}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className={
                classNames(
                    'bg-white rounded-lg shadow-lg px-4 py-4 flex flex-col mt-6',
                    !selectedSeason && 'hidden'
                )
            }
                ref={divLeaguesRef}
            >
                <p className='font-bold text-emerald-800 text-lg'>
                    Agora, selecione uma liga.
                </p>
                {selectedLeague && (
                    <div className='my-4'>
                        <button
                            className={
                                classNames(
                                    'flex flex-row text-emerald-800 font-bold items-center px-4 py-2 border border-emerald-800 shadow-lg shadow-emerald-200 bg-green-50 rounded-lg',
                                    'hover:shadow-emerald-300 hover:bg-green-100 hover:cursor-pointer'
                                )
                            }
                            onClick={() => setSelectedLeague(null)}
                        >
                            {selectedLeague.name}
                            <FaRegWindowClose className='ml-2' />
                        </button>
                    </div>
                )}
                <div className='overflow-y-auto max-h-72 mt-4'>
                    <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3'>
                        {leagues.map((league) => (
                            <LeagueCard
                                key={league.id}
                                league={league}
                                onClick={handleSelectLeague}
                                selected={selectedLeague?.id === league.id}
                            />
                        ))}
                        {leagues.map((league) => (
                            <LeagueCard
                                key={league.id}
                                league={league}
                                onClick={handleSelectLeague}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}