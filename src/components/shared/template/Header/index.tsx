import { IoMdFootball } from 'react-icons/io'
import { useAuth } from '@/contexts/AuthContext'

interface IHeaderProps {
    children: React.ReactNode
}

function Header({ children }: IHeaderProps): JSX.Element {
    const { signout } = useAuth()

    return (
        <header className='w-full bg-gradient-to-r from-emerald-700 to-green-500 px-4 py-4'>
            <div className='max-w-7xl flex flex-col mx-auto pb-32'>
                <div className='rounded-lg bg-white flex items-center justify-between px-4 py-4'>
                    <span className='flex items-center normal-case text-xl font-bold text-emerald-800'>
                        <IoMdFootball className='h-6 w-6 mr-1 self-center flex-shrink-0' />
                        Meu time
                    </span>
                    <button
                        className='link link-hover text-emerald-700 hover:text-emerald-900'
                        data-testid='testsignout'
                        onClick={signout}
                    >
                        Sair
                    </button>
                </div>
                <h1 className='mt-12 text-3xl font-bold text-white flex items-center'>
                    {children}
                </h1>
            </div>
        </header>
    )
}

export default Header
