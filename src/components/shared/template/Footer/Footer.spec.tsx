import { render, screen } from '@testing-library/react'

import Footer from '.'

describe('Footer component', () => {
    it('should render correctly', () => {
        render(<Footer />)
        expect(screen.getByTestId('testcopyright')).toHaveTextContent(
            'Copyright © 2022 - All right reserved'
        )
    })
})
