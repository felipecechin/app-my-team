import { ICountry } from '@/types/country'
import Image from 'next/image'
import classNames from '@/utils/classNames'

interface ICountryCardProps {
    country: ICountry
    onClick: (country: ICountry) => void
    selected?: boolean
}

function CountryCard({ country, onClick, selected = false }: ICountryCardProps): JSX.Element {
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
            data-testid='testcountrycard'
            onClick={() => onClick(country)}
            role={'button'}
        >
            <Image alt='svg' className={'rounded-lg'} height={100} src={country.flag} style={{ width: 'auto' }} width={100} />
            <p className='text-center'>{country.name}</p>
        </div>
    )
}

export default CountryCard