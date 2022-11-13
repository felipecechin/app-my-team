import { FaChartBar } from 'react-icons/fa'
import Footer from '@/components/shared/template/Footer'
import { GetServerSideProps } from 'next'
import Header from '@/components/shared/template/Header'
import { ICountry } from '@/types/country'
import MainContent from '@/components/shared/template/MainContent'
import MyTeamContentPage from '@/components/system/index/MyTeamContentPage'
import { withSSRAuth } from '@/utils/withSSRAuth'

interface IMyTeamProps {
    countries: ICountry[]
    seasons: number[]
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
    const countries = [
        {
            'name': 'Albania',
            'code': 'AL',
            'flag': 'https://media.api-sports.io/flags/al.svg'
        },
        {
            'name': 'Algeria',
            'code': 'DZ',
            'flag': 'https://media.api-sports.io/flags/dz.svg'
        },
        {
            'name': 'Andorra',
            'code': 'AD',
            'flag': 'https://media.api-sports.io/flags/ad.svg'
        },
        {
            'name': 'Angola',
            'code': 'AO',
            'flag': 'https://media.api-sports.io/flags/ao.svg'
        },
        {
            'name': 'Argentina',
            'code': 'AR',
            'flag': 'https://media.api-sports.io/flags/ar.svg'
        },
        {
            'name': 'Armenia',
            'code': 'AM',
            'flag': 'https://media.api-sports.io/flags/am.svg'
        },
        {
            'name': 'Aruba',
            'code': 'AW',
            'flag': 'https://media.api-sports.io/flags/aw.svg'
        },
        {
            'name': 'Australia',
            'code': 'AU',
            'flag': 'https://media.api-sports.io/flags/au.svg'
        },
        {
            'name': 'Austria',
            'code': 'AT',
            'flag': 'https://media.api-sports.io/flags/at.svg'
        },
        {
            'name': 'Azerbaidjan',
            'code': 'AZ',
            'flag': 'https://media.api-sports.io/flags/az.svg'
        },
        {
            'name': 'Bahrain',
            'code': 'BH',
            'flag': 'https://media.api-sports.io/flags/bh.svg'
        },
        {
            'name': 'Bangladesh',
            'code': 'BD',
            'flag': 'https://media.api-sports.io/flags/bd.svg'
        },
        {
            'name': 'Barbados',
            'code': 'BB',
            'flag': 'https://media.api-sports.io/flags/bb.svg'
        },
        {
            'name': 'Belarus',
            'code': 'BY',
            'flag': 'https://media.api-sports.io/flags/by.svg'
        },
        {
            'name': 'Belgium',
            'code': 'BE',
            'flag': 'https://media.api-sports.io/flags/be.svg'
        },
        {
            'name': 'Belize',
            'code': 'BZ',
            'flag': 'https://media.api-sports.io/flags/bz.svg'
        },
        {
            'name': 'Benin',
            'code': 'BJ',
            'flag': 'https://media.api-sports.io/flags/bj.svg'
        },
        {
            'name': 'Bermuda',
            'code': 'BM',
            'flag': 'https://media.api-sports.io/flags/bm.svg'
        },
        {
            'name': 'Bhutan',
            'code': 'BT',
            'flag': 'https://media.api-sports.io/flags/bt.svg'
        },
        {
            'name': 'Bolivia',
            'code': 'BO',
            'flag': 'https://media.api-sports.io/flags/bo.svg'
        },
        {
            'name': 'Bosnia',
            'code': 'BA',
            'flag': 'https://media.api-sports.io/flags/ba.svg'
        },
        {
            'name': 'Botswana',
            'code': 'BW',
            'flag': 'https://media.api-sports.io/flags/bw.svg'
        },
        {
            'name': 'Brazil',
            'code': 'BR',
            'flag': 'https://media.api-sports.io/flags/br.svg'
        },
        {
            'name': 'Bulgaria',
            'code': 'BG',
            'flag': 'https://media.api-sports.io/flags/bg.svg'
        },
        {
            'name': 'Burkina-Faso',
            'code': 'BF',
            'flag': 'https://media.api-sports.io/flags/bf.svg'
        },
        {
            'name': 'Burundi',
            'code': 'BI',
            'flag': 'https://media.api-sports.io/flags/bi.svg'
        },
        {
            'name': 'Cambodia',
            'code': 'KH',
            'flag': 'https://media.api-sports.io/flags/kh.svg'
        },
    ]

    const seasons = [
        2008,
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
        2021,
        2022,
        2023
    ]

    return {
        props: {
            countries,
            seasons
        }
    }
})