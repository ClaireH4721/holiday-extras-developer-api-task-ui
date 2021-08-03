import React from 'react';
import '@testing-library/jest-dom';

import {
  render, screen, fireEvent, cleanup,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import UpdateUserModal from './UpdateUserModal';

describe('UpdateUserModal', () => {
  const props = {
    closeModal: jest.fn(),
    isOpen: true,
    handleUpdateUserSubmit: jest.fn(),
  };

  beforeEach(async () => {
    await act(async () => {
      await render(<UpdateUserModal {...props} />);
    });
  });

  afterEach(() => {
    cleanup();
  });

  describe('Initial Render', () => {
    it('should load modal with title Update User', () => {
      const title = screen.getAllByText('Update User')[0];
      expect(title).toBeInTheDocument();
    });

    it('should load modal with form with 3 text boxes', () => {
      const form = screen.getAllByRole('textbox');
      expect(form.length).toBe(3);
    });

    it('should load modal with button Update User', () => {
      const submitBtn = screen.getAllByText('Update User')[1];
      expect(submitBtn).toBeInTheDocument();
    });
  });

  describe('Close Modal', () => {
    it('should call closeModal', async () => {
      await act(async () => {
        await fireEvent.click(screen.getByText(/close/i));
      });

      expect(props.closeModal).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update User', () => {
    it('should call handleUpdateUserSubmit', async () => {
      await act(async () => {
        await fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@test.com' } });
        await fireEvent.change(screen.getByTestId('given-name-input'), { target: { value: 'test' } });
        await fireEvent.change(screen.getByTestId('family-name-input'), { target: { value: 'user' } });
        await fireEvent.submit(screen.getByTestId('user-form'));
      });

      expect(props.handleUpdateUserSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
