import { useCallback, useRef } from 'react'

import { FaSignInAlt } from 'react-icons/fa'
import { useAuth } from '@/contexts/AuthContext'

export default function SigninForm(): JSX.Element {
    const { signin } = useAuth()
    const inputTokenRef = useRef<HTMLInputElement>(null)

    const handleFormSubmit = useCallback((event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        if (inputTokenRef.current && inputTokenRef.current.value) {
            signin(inputTokenRef.current.value)
        }
    }, [signin])

    return (
        <form onSubmit={handleFormSubmit}>
            <div className='mb-6'>
                <label className='block mb-2 font-extrabold'>Chave</label>
                <input
                    className='inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-emerald-700 bg-white shadow border-2 border-emerald-700 rounded focus:outline-none focus:ring focus:ring-emerald-300'
                    data-testid='testinputtoken'
                    placeholder='Insira a chave de acesso'
                    ref={inputTokenRef}
                    type='text'
                />
            </div>
            <button
                className='flex items-center justify-center w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-emerald-800 hover:bg-emerald-900 border-3 border-emerald-900 shadow rounded transition duration-200'
                data-testid='testbuttonsignin'
            >
                <FaSignInAlt className='w-6 h-6 mr-2' /> Entrar
            </button>
        </form>
    )
}