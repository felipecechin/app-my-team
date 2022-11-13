import { IoMdFootball } from 'react-icons/io'
import SigninForm from '@/components/system/signin/SigninForm'

export default function Signin(): JSX.Element {
    return (
        <main>
            <div className='flex min-h-screen h-fit py-4 bg-emerald-800 items-center'>
                <div className='container px-4 mx-auto'>
                    <div className='bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm-max:m-5 py-10 px-4 sm:px-10'>
                        <div className='max-w-lg mx-auto'>
                            <div className='text-center mb-8'>
                                <h2 className='flex flex-row justify-center text-emerald-800 font-bold text-4xl'>
                                    <IoMdFootball className='mr-1 self-center flex-shrink-0' />
                                    Meu time
                                </h2>
                            </div>
                            <SigninForm />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}


