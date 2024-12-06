// src/components/ServiceCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import ServiceCard from '@/components/home/ServiceCard'
import { OfficesProps } from '@/utils/types'
import { vi } from 'vitest'

const mockOffice: OfficesProps = {
  id: 1,
  name: 'Test Office',
  elapsed: '10:00',
  waiting: 5,
  online: true,
  lines: [],
}

const mockHandleToggleOnline = vi.fn()

describe('ServiceCard Component', () => {
  test('renders ServiceCard with office data', () => {
    render(<ServiceCard office={mockOffice} handleToggleOnline={mockHandleToggleOnline} />)

    expect(screen.getByText(/test office/i)).toBeInTheDocument()
    expect(screen.getByText(/10:00/i)).toBeInTheDocument()
    expect(screen.getByText(/5/i)).toBeInTheDocument()
  })

  test('calls handleToggleOnline when button is clicked', async () => {
    render(<ServiceCard office={mockOffice} handleToggleOnline={mockHandleToggleOnline} />)

    const buttonElement = screen.getByRole('button')
    await fireEvent.click(buttonElement)

    expect(mockHandleToggleOnline).toHaveBeenCalledWith(mockOffice.id)
  })

  test('renders with correct styles when online', () => {
    render(<ServiceCard office={mockOffice} handleToggleOnline={mockHandleToggleOnline} />)

    const headerElement = screen.getByRole('header')
    expect(headerElement).toHaveClass('text-[#ffffff]')
  })

  test('renders with correct styles when offline', () => {
    const offlineOffice = { ...mockOffice, online: false }
    render(<ServiceCard office={offlineOffice} handleToggleOnline={mockHandleToggleOnline} />)

    const headerElement = screen.getByRole('header')
    expect(headerElement).toHaveClass('text-gray-500')
  })
})