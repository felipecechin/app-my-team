import { render, screen } from '@testing-library/react'

import MainContent from '.'

describe('MainContent component', () => {
    it('should render correctly', () => {
        render(<MainContent>Content test</MainContent>)

        expect(screen.getByText('Content test')).toBeInTheDocument()
    })
})
