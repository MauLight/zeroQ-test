
import { render, screen, fireEvent } from '@testing-library/react'
import Searchbar from '@/components/home/Searchbar'
import { vi } from 'vitest'

describe('Searchbar Component', () => {
    const mockSetSearchTerm = vi.fn()

    test('renders Searchbar with initial searchTerm', () => {
        render(<Searchbar searchTerm="initial term" setSearchTerm={mockSetSearchTerm} />)

        const inputElement = screen.getByPlaceholderText(/buscar sucursal/i)
        expect(inputElement).toBeInTheDocument()
        expect(inputElement).toHaveValue('initial term')
    })

    test('calls setSearchTerm on input change', () => {
        render(<Searchbar searchTerm="" setSearchTerm={mockSetSearchTerm} />)

        const inputElement = screen.getByPlaceholderText(/buscar sucursal/i)
        fireEvent.change(inputElement, { target: { value: 'new term' } })

        expect(mockSetSearchTerm).toHaveBeenCalledWith('new term')
    })

    test('calls setSearchTerm on Backspace key down', () => {
        render(<Searchbar searchTerm="initial term" setSearchTerm={mockSetSearchTerm} />)

        const inputElement = screen.getByPlaceholderText(/buscar sucursal/i)
        fireEvent.keyDown(inputElement, { key: 'Backspace', target: { value: 'initial ter' } })

        expect(mockSetSearchTerm).toHaveBeenCalledWith('initial ter')
    })
})