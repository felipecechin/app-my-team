import { closeSwal, showSwalError, showSwalLoading } from '@/utils/reactSwal'
import { createContext, useContext, useEffect, useState } from 'react'

import fetcher from '@/utils/fetcher'
import { useRouter } from 'next/router'

type TAuthContextData = {
    token: string
    signin: (token: string) => Promise<void>
    signout: () => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const AuthContext = createContext({} as TAuthContextData)

interface IGetTokenResponse {
    data: string
}

interface ISigninResponse {
    data: string
}

interface IAuthProviderProps {
    children: React.ReactNode
}

export function AuthProvider({ children }: IAuthProviderProps): JSX.Element {
    const [token, setToken] = useState('')
    const router = useRouter()

    useEffect(() => {
        const getToken = async (): Promise<void> => {
            try {
                const response = (await fetcher({
                    method: 'GET',
                    url: '/api/getToken',
                    nextApi: true,
                    contentType: 'application/json',
                })) as IGetTokenResponse

                setToken(response.data)
            } catch (error) {
                /* como o token é verificado no Server Side com Next, se o usuário tentar acessar uma rota protegida sem estar logado, 
                    ele será redirecionado para a página de login. Não é necessário tratar o erro aqui. */
                setToken('')
            }
        }
        getToken()
    }, [])

    const signin = async (token: string): Promise<void> => {
        showSwalLoading()
        try {
            const response = (await fetcher({
                url: '/api/signin',
                method: 'POST',
                data: { token },
                nextApi: true,
                contentType: 'application/json',
            })) as ISigninResponse

            setToken(response.data)
            closeSwal()
            router.push('/')
        } catch (e) {
            showSwalError('Por favor, informe uma chave válida')
        }
    }

    const signout = async (): Promise<void> => {
        await fetcher({
            url: '/api/signout',
            method: 'GET',
            nextApi: true,
            contentType: 'application/json',
        })
        setToken('')
        router.push('/signin')
    }

    return (
        <AuthContext.Provider value={{ token, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): TAuthContextData => useContext(AuthContext)
