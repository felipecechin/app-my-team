/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react'

import Header from '.'
import { useAuth } from '@/contexts/AuthContext'

jest.mock('@/contexts/AuthContext')

describe('Header component', () => {
    it('should render correctly', () => {
        const useAuthMocked = jest.mocked(useAuth)

        useAuthMocked.mockReturnValueOnce({
            signout: jest.fn()
        } as any)

        render(
            <Header>
                My header test
            </Header>
        )

        expect(screen.getByText('My header test')).toBeInTheDocument()
        expect(screen.getByText('Meu time')).toBeInTheDocument()
    })

    it('should call signout function when click on signout button', () => {
        const useAuthMocked = jest.mocked(useAuth)
        const signoutMocked = jest.fn()

        useAuthMocked.mockReturnValueOnce({
            signout: signoutMocked
        } as any)

        render(
            <Header>
                My header test
            </Header>
        )

        const buttonSignout = screen.getByTestId('testsignout')
        fireEvent.click(buttonSignout)

        expect(signoutMocked).toHaveBeenCalled()
    })
})
