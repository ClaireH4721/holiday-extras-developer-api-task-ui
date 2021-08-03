import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  describe('Initial Render', () => {
    beforeEach(() => {
      render(<App />);
    });
    it('renders Holiday Extras header', () => {
      const header = screen.getByText('Holiday Extras');
      expect(header).toBeInTheDocument();
    });
  });
});
