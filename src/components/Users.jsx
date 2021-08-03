import './Users.css';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/fontawesome-free-solid';
import UserTable from './UserTable';
import AddUserModal from './Modals/AddUserModal';
import UpdateUserModal from './Modals/UpdateUserModal';
import DeleteUserModal from './Modals/DeleteUserModal';

const Users = () => {
  const [userData, setUserData] = useState([{}]);
  const [id, setId] = useState('');
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [updateUserModalOpen, setUpdateUserModalOpen] = useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
  const [userDataUpdated, setUserDataUpdated] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsError(false);

      try {
        const users = await axios.get('http://localhost:5000/api/users');

        setUserData(users.data);
      } catch (error) {
        setIsError(true);
      }
    };
    fetchUserData();
  }, [userDataUpdated]);

  const openAddUserModal = () => {
    setAddUserModalOpen(true);
  };

  const closeAddUserModal = () => {
    setAddUserModalOpen(false);
  };

  const openUpdateUserModal = () => {
    setUpdateUserModalOpen(true);
  };

  const closeUpdateUserModal = () => {
    setUpdateUserModalOpen(false);
  };

  const openDeleteUserModal = () => {
    setDeleteUserModalOpen(true);
  };

  const closeDeleteUserModal = () => {
    setDeleteUserModalOpen(false);
  };

  const handleAddUserSubmit = async (userDetails) => {
    try {
      await axios.post('http://localhost:5000/api/users', userDetails);
      setUserDataUpdated(true);
      closeAddUserModal();
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }
  };

  const handleUpdateUserSubmit = async (userDetails) => {
    try {
      id && await axios.put(`http://localhost:5000/api/users/${id}`, userDetails);
      setUserDataUpdated(true);
      setId('');
      closeUpdateUserModal();
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }
  };

  const handleDeleteUserSubmit = async () => {
    try {
      id && await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUserDataUpdated(true);
      setId('');
      closeDeleteUserModal();
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }
  };

  return (

    <div className="users">
      {isError ? (<div data-testid="data-error">Something went wrong ...</div>)
        : (
          <div>
            <div className="add-user">
              <Button data-testid="add-user-btn" bsPrefix="btn" onClick={openAddUserModal}>
                <FontAwesomeIcon icon={faUserPlus} size="2x" color="black" />
                <label className="add-user-label">Add User</label>
              </Button>
            </div>
            {addUserModalOpen
              ? (
                <AddUserModal
                  closeModal={closeAddUserModal}
                  isOpen={addUserModalOpen}
                  handleAddUserSubmit={handleAddUserSubmit}
                />
              )
              : null}

            {updateUserModalOpen
              ? (
                <UpdateUserModal
                  closeModal={closeUpdateUserModal}
                  isOpen={updateUserModalOpen}
                  handleUpdateUserSubmit={handleUpdateUserSubmit}
                />
              )
              : null}

            {deleteUserModalOpen
              ? (
                <DeleteUserModal
                  closeModal={closeDeleteUserModal}
                  isOpen={deleteUserModalOpen}
                  handleDeleteUserSubmit={handleDeleteUserSubmit}
                />
              )
              : null}

            <UserTable
              userData={userData}
              openDeleteUserModal={openDeleteUserModal}
              openUpdateUserModal={openUpdateUserModal}
              setId={setId}
            />
          </div>
        )}
    </div>
  );
};

export default Users;
