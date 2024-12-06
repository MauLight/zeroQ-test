import { render, screen, waitFor } from '@testing-library/react'
import { vi, MockedFunction } from 'vitest'
import App from '@/App'
import useFetchSort from '@/hooks/useFetchSort'

vi.mock('@/hooks/useFetchSort')

const mockUseFetchSort = useFetchSort as MockedFunction<typeof useFetchSort>

describe('App Component', () => {
    beforeEach(() => {
        mockUseFetchSort.mockReturnValue({
            offices: [],
            status: 'pending',
            error: '',
            searchTerm: '',
            setSearchTerm: vi.fn(),
            handleToggleOnline: vi.fn(),
            setOffices: vi.fn()
        })
    })

    test('renders loading spinner when status is pending', () => {
        render(<App />)
        expect(screen.getByLabelText('loader')).toBeInTheDocument()
    })

    test('renders error message when status is rejected', () => {
        mockUseFetchSort.mockReturnValueOnce({
            offices: [],
            status: 'rejected',
            error: 'Error fetching data',
            searchTerm: '',
            setSearchTerm: vi.fn(),
            handleToggleOnline: vi.fn(),
            setOffices: vi.fn()
        })

        render(<App />)
        expect(screen.getByText(/error fetching data/i)).toBeInTheDocument()
    })

    test('renders ServiceCard components when status is success', async () => {
        const mockOffices = [
            { id: 1, name: 'Office 1', elapsed: '10:00', waiting: 5, online: true, lines: [] },
            { id: 2, name: 'Office 2', elapsed: '20:00', waiting: 10, online: false, lines: [] },
        ]

        mockUseFetchSort.mockReturnValueOnce({
            offices: mockOffices,
            status: 'success',
            error: '',
            searchTerm: '',
            setSearchTerm: vi.fn(),
            handleToggleOnline: vi.fn(),
            setOffices: vi.fn()
        })

        render(<App />)

        await waitFor(() => {
            expect(screen.getByText(/office 1/i)).toBeInTheDocument()
            expect(screen.getByText(/office 2/i)).toBeInTheDocument()
        })
    })
})