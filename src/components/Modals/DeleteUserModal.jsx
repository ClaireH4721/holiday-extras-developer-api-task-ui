import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteUserModal = (props) => {
  const { isOpen, closeModal, handleDeleteUserSubmit } = props;
  return (
    <Modal className="user-modal-form" show={isOpen} onHide={closeModal} contentClassName="user-modal-form-content">
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this user?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={handleDeleteUserSubmit}>
          Delete
        </Button>
        <Button variant="danger" onClick={closeModal}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUserModal;
