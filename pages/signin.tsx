import SigninForm from '@/components/system/signin/SigninForm'

export default function Signin(): JSX.Element {
    return (
        <main>
            <div className='flex min-h-screen h-fit py-4 bg-emerald-800 items-center'>
                <div className='container px-4 mx-auto'>
                    <div className='bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm-max:m-5 py-10 px-4 sm:px-10'>
                        <div className='max-w-lg mx-auto'>
                            <div className='text-center mb-8'>
                                <h2 className='text-3xl md:text-4xl font-extrabold mb-2'>
                                    Faça login
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


