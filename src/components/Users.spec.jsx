import React from 'react';
import '@testing-library/jest-dom';

import {
  render, screen, fireEvent, cleanup,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import moxios from 'moxios';

import Users from './Users';

describe('Users', () => {
  beforeEach(async () => {
    moxios.install();
    await act(async () => {
      await render(<Users />);
    });
    moxios.stubRequest('https:localhost:5000/api/users', {
      status: 200,
      response: [
        {
          id: '1',
          email: 'testuser1@test.com',
          givenName: 'test1',
          familyName: 'user1',
          created: '2017-07-31T11:20:59.489Z',
        },
        {
          id: '2',
          email: 'testuser2@test.com',
          givenName: 'test2',
          familyName: 'user2',
          created: '2017-07-29T11:43:59.489Z',
        },
      ],
    });
  });

  afterEach(() => {
    moxios.uninstall();
    cleanup();
  });

  describe('Initial Render', () => {
    it('should load add user button', () => {
      const addUserBtn = screen.getByTestId('add-user-btn');

      expect(addUserBtn).toBeInTheDocument();
    });
  });

  describe('Add User', () => {
    it('should load add user modal', async () => {
      await act(async () => {
        await fireEvent.click(screen.getByTestId('add-user-btn'));
      });

      const modal = screen.getByRole('dialog');

      expect(modal).toBeInTheDocument();
    });

    it('should close add user modal', async () => {
      await act(async () => {
        await fireEvent.click(screen.getByTestId('add-user-btn'));
        await fireEvent.click(screen.getByText(/close/i));
      });

      expect(screen.queryByRole('dialog')).toBeFalsy();
    });

    it('should submit add user form', async () => {
      await moxios.wait(jest.fn);
      await act(async () => {
        await fireEvent.click(screen.getByTestId('add-user-btn'));
        await fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@test.com' } });
        await fireEvent.change(screen.getByTestId('given-name-input'), { target: { value: 'test' } });
        await fireEvent.change(screen.getByTestId('family-name-input'), { target: { value: 'user' } });
        await fireEvent.submit(screen.getByTestId('user-form'));

        const request = moxios.requests.mostRecent();
        await request.respondWith({
          status: 200,
          response: [],
        });
      });

      expect(screen.queryByRole('dialog')).toBeFalsy();
    });
  });

  describe('Update User', () => {
    it('should load update user modal', async () => {
      await act(async () => {
        await fireEvent.click(screen.getByTestId('update-user-btn'));
      });

      const modal = screen.getByRole('dialog');

      expect(modal).toBeInTheDocument();
    });

    it('should close update user modal', async () => {
      await act(async () => {
        await fireEvent.click(screen.getByTestId('update-user-btn'));
        await fireEvent.click(screen.getByText(/close/i));
      });

      expect(screen.queryByRole('dialog')).toBeFalsy();
    });

    it('should submit update user form', async () => {
      await moxios.wait(jest.fn);
      await act(async () => {
        await fireEvent.click(screen.getByTestId('update-user-btn'));
        await fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@test.com' } });
        await fireEvent.change(screen.getByTestId('given-name-input'), { target: { value: 'test' } });
        await fireEvent.change(screen.getByTestId('family-name-input'), { target: { value: 'user' } });
        await fireEvent.submit(screen.getByTestId('user-form'));

        const request = moxios.requests.mostRecent();
        await request.respondWith({
          status: 200,
          response: [],
        });
      });

      expect(screen.queryByRole('dialog')).toBeFalsy();
    });
  });

  describe('Delete User', () => {
    it('should load delete user modal', async () => {
      await act(async () => {
        await fireEvent.click(screen.getByTestId('delete-user-btn'));
      });

      const modal = screen.getByRole('dialog');

      expect(modal).toBeInTheDocument();
    });

    it('should close delete user modal', async () => {
      await act(async () => {
        await fireEvent.click(screen.getByTestId('delete-user-btn'));
        await fireEvent.click(screen.getByText(/close/i));
      });

      expect(screen.queryByRole('dialog')).toBeFalsy();
    });

    it('should submit delete user form', async () => {
      await moxios.wait(jest.fn);
      await act(async () => {
        await fireEvent.click(screen.getByTestId('delete-user-btn'));
        await fireEvent.click(screen.getByText('Delete'));

        const request = moxios.requests.mostRecent();
        await request.respondWith({
          status: 200,
          response: [],
        });
      });

      expect(screen.queryByRole('dialog')).toBeFalsy();
    });
  });
});
