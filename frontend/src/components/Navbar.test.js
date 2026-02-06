import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

test('renders navbar logo and links', () => {
    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    );

    // Check for logo
    const logoElement = screen.getByText(/Laxminath Krishi Kendra/i);
    expect(logoElement).toBeInTheDocument();

    // Check for specific links
    expect(screen.getByText(/Products/i)).toBeInTheDocument();
    expect(screen.getByText(/Inventory/i)).toBeInTheDocument();
    expect(screen.getByText(/Sales/i)).toBeInTheDocument();
    expect(screen.getByText(/Purchases/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
});
