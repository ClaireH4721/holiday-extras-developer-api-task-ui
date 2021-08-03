import React from 'react';
import '@testing-library/jest-dom';

import {
  render, screen, fireEvent, cleanup,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import DeleteUserModal from './DeleteUserModal';

describe('DeleteUserModal', () => {
  const props = {
    closeModal: jest.fn(),
    isOpen: true,
    handleDeleteUserSubmit: jest.fn(),
  };

  beforeEach(async () => {
    await act(async () => {
      await render(<DeleteUserModal {...props} />);
    });
  });

  afterEach(() => {
    cleanup();
  });

  describe('Initial Render', () => {
    it('should load modal with title Delete User', () => {
      const title = screen.getByText('Delete User');
      expect(title).toBeInTheDocument();
    });

    it('should load modal with delete confirmation text', () => {
      const confirmationText = screen.getByText('Are you sure you want to delete this user?');
      expect(confirmationText).toBeInTheDocument();
    });

    it('should load modal with button Delete', () => {
      const submitBtn = screen.getByText('Delete');
      expect(submitBtn).toBeInTheDocument();
    });

    it('should load modal with button Cancel', () => {
      const submitBtn = screen.getByText('Cancel');
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

  describe('Cancel', () => {
    it('should call closeModal', async () => {
      await act(async () => {
        await fireEvent.click(screen.getByText(/Cancel/i));
      });

      expect(props.closeModal).toHaveBeenCalledTimes(1);
    });
  });

  describe('Delete User', () => {
    it('should call closeModal', async () => {
      await act(async () => {
        await fireEvent.click(screen.getByText('Delete'));
      });

      expect(props.handleDeleteUserSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
