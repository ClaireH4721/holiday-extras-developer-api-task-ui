import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserFormModal.css';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const UserFormModal = (props) => {
  const {
    isOpen, closeModal, modalTitle, handleUserSubmit,
  } = props;
  const [email, setEmail] = useState('');
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      handleUserSubmit({
        email,
        givenName,
        familyName,
      });
    }
    setValidated(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleGivenNameChange = (e) => {
    setGivenName(e.target.value);
  };

  const handleFamilyNameChange = (e) => {
    setFamilyName(e.target.value);
  };

  return (
    <Modal className="user-modal-form" show={isOpen} onHide={closeModal} contentClassName="user-modal-form-content">
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="user-form" data-testid="user-form">
        <Modal.Body>
          <Form.Group>
            <Form.Label>Email: </Form.Label>
            <Form.Control data-testid="email-input" type="email" onChange={handleEmailChange} value={email} placeholder="Email Address" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Given Name: </Form.Label>
            <Form.Control data-testid="given-name-input" type="text" onChange={handleGivenNameChange} value={givenName} placeholder="Given Name" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid given name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Family Name: </Form.Label>
            <Form.Control data-testid="family-name-input" type="text" onChange={handleFamilyNameChange} value={familyName} placeholder="Family Name" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid family name.
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" type="submit" data-testid="submit-btn">
            {modalTitle}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UserFormModal;
