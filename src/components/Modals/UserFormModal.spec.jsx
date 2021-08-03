import React from 'react';
import '@testing-library/jest-dom';

import {
  render, screen, fireEvent, cleanup,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import UserFormModal from './UserFormModal';

describe('UserFormModal', () => {
  const props = {
    modalTitle: 'Test',
    closeModal: jest.fn(),
    isOpen: true,
    handleUserSubmit: jest.fn(),
  };

  beforeEach(async () => {
    await act(async () => {
      await render(<UserFormModal {...props} />);
    });
  });

  afterEach(() => {
    cleanup();
  });

  describe('Initial Render', () => {
    it('should load modal with title Test', () => {
      const title = screen.getAllByText('Test')[0];
      expect(title).toBeInTheDocument();
    });

    it('should load modal with form with 3 text boxes', () => {
      const form = screen.getAllByRole('textbox');
      expect(form.length).toBe(3);
    });

    it('should load modal with button Test', () => {
      const submitBtn = screen.getAllByText('Test')[1];
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

  describe('Change Email', () => {
    it('should update email value', async () => {
      const input = screen.getByTestId('email-input');

      await act(async () => {
        await fireEvent.change(input, { target: { value: 'test@test.com' } });
      });

      expect(input.value).toBe('test@test.com');
    });
  });

  describe('Change Given Name', () => {
    it('should update given name value', async () => {
      const input = screen.getByTestId('given-name-input');

      await act(async () => {
        await fireEvent.change(input, { target: { value: 'test' } });
      });

      expect(input.value).toBe('test');
    });
  });

  describe('Change Family Name', () => {
    it('should update family name value', async () => {
      const input = screen.getByTestId('family-name-input');

      await act(async () => {
        await fireEvent.change(input, { target: { value: 'user' } });
      });

      expect(input.value).toBe('user');
    });
  });

  describe('Submit Form', () => {
    it('should call handleUserSubmit', async () => {
      await act(async () => {
        await fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@test.com' } });
        await fireEvent.change(screen.getByTestId('given-name-input'), { target: { value: 'test' } });
        await fireEvent.change(screen.getByTestId('family-name-input'), { target: { value: 'user' } });
        await fireEvent.submit(screen.getByTestId('user-form'));
      });

      expect(props.handleUserSubmit).toHaveBeenCalledTimes(1);
    });

    describe('Validation Errors', () => {
      beforeEach(async () => {
        await act(async () => {
          await fireEvent.change(screen.getByTestId('email-input'), { target: { value: '' } });
          await fireEvent.change(screen.getByTestId('given-name-input'), { target: { value: '' } });
          await fireEvent.change(screen.getByTestId('family-name-input'), { target: { value: '' } });
          await fireEvent.submit(screen.getByTestId('user-form'));
        });
      });

      it('should display validation error for email', async () => {
        expect(screen.getByText('Please provide a valid email address.')).toBeInTheDocument();
      });

      it('should display validation error for given name', async () => {
        expect(screen.getByText('Please provide a valid given name.')).toBeInTheDocument();
      });

      it('should display validation error for family name', async () => {
        expect(screen.getByText('Please provide a valid family name.')).toBeInTheDocument();
      });

      it('should not call handleUserSubmit if there are validation errors', async () => {
        expect(props.handleUserSubmit).toHaveBeenCalledTimes(0);
      });
    });
  });
});
