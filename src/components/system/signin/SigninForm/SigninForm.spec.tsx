/* eslint-disable @typescript-eslint/no-explicit-any */

import { fireEvent, render, screen } from '@testing-library/react'

import SigninForm from '.'
import { useAuth } from '@/contexts/AuthContext'

jest.mock('@/contexts/AuthContext')

describe('SigninForm component', () => {
    it('should call signin function when user type key and submit signin form', () => {
        const useAuthMocked = jest.mocked(useAuth)
        const signinMocked = jest.fn()

        useAuthMocked.mockReturnValueOnce({
            signin: signinMocked,
        } as any)

        render(<SigninForm />)

        const input = screen.getByTestId('testinputtoken')
        fireEvent.change(input, { target: { value: 'key' } })
        fireEvent.click(screen.getByTestId('testbuttonsignin'))
        expect(signinMocked).toHaveBeenCalled()
    })

    it('should not call signin function when user not type key and submit signin form', () => {
        const useAuthMocked = jest.mocked(useAuth)
        const signinMocked = jest.fn()

        useAuthMocked.mockReturnValueOnce({
            signin: signinMocked,
        } as any)

        render(<SigninForm />)

        const input = screen.getByTestId('testinputtoken')
        fireEvent.change(input, { target: { value: '' } })
        fireEvent.click(screen.getByTestId('testbuttonsignin'))
        expect(signinMocked).not.toHaveBeenCalled()
    })
})
