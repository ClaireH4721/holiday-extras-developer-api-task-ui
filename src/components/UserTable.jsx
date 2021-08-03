import './UserTable.css';

import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/fontawesome-free-solid';

const UserTable = (props) => {
  const {
    setId, openUpdateUserModal, openDeleteUserModal, userData,
  } = props;

  const handleUpdateClick = (id) => {
    setId(id);
    openUpdateUserModal();
  };

  const handleDeleteClick = (id) => {
    setId(id);
    openDeleteUserModal();
  };

  return (
    <div data-testid="user-table" className="user-table">
      <Table striped bordered hover responsive variant="dark" bsPrefix="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Given Name</th>
            <th>Family Name</th>
            <th>Email</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.givenName}</td>
              <td>{user.familyName}</td>
              <td>{user.email}</td>
              <td>{user.created}</td>
              <td>
                <Button data-testid="update-user-btn" bsPrefix="btn" onClick={() => handleUpdateClick(user.id)}>
                  <FontAwesomeIcon icon={faEdit} size="1x" color="white" />
                </Button>
                <Button data-testid="delete-user-btn" bsPrefix="btn" onClick={() => handleDeleteClick(user.id)}>
                  <FontAwesomeIcon icon={faTrashAlt} size="1x" color="white" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
