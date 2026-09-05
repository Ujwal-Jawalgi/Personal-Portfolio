import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from '../pages/Contact';

// Mock matchMedia for jsdom
window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

describe('Contact Form', () => {
  it('renders validation errors when fields are empty', async () => {
    render(<Contact />);
    
    const submitBtn = screen.getByText('Send Message');
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
      expect(screen.getByText('Message must be at least 10 characters')).toBeInTheDocument();
    });
  });
});
