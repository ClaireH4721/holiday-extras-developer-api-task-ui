import React from 'react';
import UserFormModal from './UserFormModal';

const AddUserModal = (props) => {
  const { closeModal, isOpen, handleAddUserSubmit } = props;
  return (
    <UserFormModal
      className="add-user-modal"
      modalTitle="Add User"
      closeModal={closeModal}
      isOpen={isOpen}
      handleUserSubmit={handleAddUserSubmit}
    />
  );
};

export default AddUserModal;
