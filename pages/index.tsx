import { FaChartBar } from 'react-icons/fa'
import Footer from '@/components/shared/template/Footer'
import { GetServerSideProps } from 'next'
import Header from '@/components/shared/template/Header'
import { ICountry } from '@/types/country'
import MainContent from '@/components/shared/template/MainContent'
import MyTeamContentPage from '@/components/system/index/MyTeamContentPage'
import fetcher from '@/utils/fetcher'
import { withSSRAuth } from '@/utils/withSSRAuth'

interface IMyTeamProps {
    countries: ICountry[]
    seasons: number[]
}

interface IFetchResponseCountries {
    response: ICountry[]
}

interface IFetchResponseSeasons {
    response: number[]
}

export default function MyTeam({ countries, seasons }: IMyTeamProps): JSX.Element {
    return (
        <>
            <Header>
                <FaChartBar className='flex-shrink-0 mr-2' />
                Estatísticas
            </Header>
            <MainContent>
                <MyTeamContentPage
                    countries={countries}
                    seasons={seasons}
                />
            </MainContent>
            <Footer />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async ({ token }) => {
    const [responseCountries, responseSeasons]: [IFetchResponseCountries, IFetchResponseSeasons] = await Promise.all([
        fetcher({
            url: '/countries',
            method: 'GET',
            auth: token
        }),
        fetcher({
            url: '/leagues/seasons',
            method: 'GET',
            auth: token
        })
    ])

    const countries = responseCountries.response.filter(country => country.name !== 'World')

    return {
        props: {
            countries,
            seasons: responseSeasons.response
        }
    }
})