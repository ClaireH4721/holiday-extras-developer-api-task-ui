import React from 'react';
import '@testing-library/jest-dom';

import {
  render, screen, fireEvent, cleanup, within,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import UserTable from './UserTable';

describe('UserTable', () => {
  const props = {
    userData: [
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
    setId: jest.fn(),
    openUpdateUserModal: jest.fn(),
    openDeleteUserModal: jest.fn(),
  };

  beforeEach(async () => {
    await act(async () => {
      await render(<UserTable {...props} />);
    });
  });

  afterEach(() => {
    cleanup();
  });

  describe('Initial Render', () => {
    describe('Table', () => {
      it('should load user table', () => {
        const userTable = screen.getByRole('table');

        expect(userTable).toBeInTheDocument();
      });

      it('should load user table with 3 rows', () => {
        const userTable = screen.getByRole('table');
        const rows = within(userTable).getAllByRole('row');

        expect(rows.length).toBe(3);
      });

      describe('Table Header', () => {
        let table;
        let columnheader;

        beforeEach(() => {
          table = screen.getByRole('table', { hidden: true });
          columnheader = within(table).getAllByRole('columnheader', { hidden: true });
        });

        it('should render header row with \'Code\' header', () => {
          expect(columnheader[0]).toHaveTextContent('Id');
        });

        it('should render header row with \'Given Name\' header', () => {
          expect(columnheader[1]).toHaveTextContent('Given Name');
        });

        it('should render header row with \'Family Name\' header', () => {
          expect(columnheader[2]).toHaveTextContent('Family Name');
        });

        it('should render header row with \'Email\' header', () => {
          expect(columnheader[3]).toHaveTextContent('Email');
        });

        it('should render header row with \'Created\' header', () => {
          expect(columnheader[4]).toHaveTextContent('Created');
        });
      });

      describe('Table Buttons', () => {
        it('should load update user buttons for every row in table', () => {
          const updateUserBtns = screen.getAllByTestId('update-user-btn');

          expect(updateUserBtns.length).toBe(2);
        });

        it('should load delete user button for every row in table', () => {
          const deleteUserBtns = screen.getAllByTestId('delete-user-btn');

          expect(deleteUserBtns.length).toBe(2);
        });
      });
    });
  });

  describe('Update User', () => {
    beforeEach(async () => {
      await act(async () => {
        await fireEvent.click(screen.getAllByTestId('update-user-btn')[0]);
      });
    });

    it('should call \'setId\'', async () => {
      expect(props.setId).toHaveBeenCalledTimes(1);
    });

    it('should call \'setId\' with id of first user data object', async () => {
      expect(props.setId).toHaveBeenCalledWith(props.userData[0].id);
    });

    it('should call \'openUpdateUserModal\'', async () => {
      expect(props.openUpdateUserModal).toHaveBeenCalledTimes(1);
    });
  });

  describe('Delete User', () => {
    beforeEach(async () => {
      await act(async () => {
        await fireEvent.click(screen.getAllByTestId('delete-user-btn')[0]);
      });
    });

    it('should call \'setId\'', async () => {
      expect(props.setId).toHaveBeenCalledTimes(1);
    });

    it('should call \'setId\' with id of second user data object', async () => {
      expect(props.setId).toHaveBeenCalledWith(props.userData[0].id);
    });

    it('should call \'openUpdateUserModal\'', async () => {
      expect(props.openDeleteUserModal).toHaveBeenCalledTimes(1);
    });
  });
});
