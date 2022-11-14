import { fireEvent, render, screen } from '@testing-library/react'

import ButtonRemove from '.'

describe('ButtonRemove component', () => {
    it('should render correctly and call function when click on button', () => {
        const onClickMock = jest.fn()

        render(
            <ButtonRemove
                label={'label'}
                onClick={onClickMock}
            />
        )

        expect(screen.getByText('label')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId('testbuttonremove'))
        expect(onClickMock).toHaveBeenCalled()
    })
})
