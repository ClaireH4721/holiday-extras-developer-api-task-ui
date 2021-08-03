import React from 'react';
import UserFormModal from './UserFormModal';

const UpdateUserModal = (props) => {
  const { closeModal, isOpen, handleUpdateUserSubmit } = props;
  return (
    <UserFormModal
      modalTitle="Update User"
      closeModal={closeModal}
      isOpen={isOpen}
      handleUserSubmit={handleUpdateUserSubmit}
    />
  );
};

export default UpdateUserModal;
