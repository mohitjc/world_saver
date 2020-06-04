import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
const InviteModal = ({ isOpen, handleModal }) => {
  return (
    <Modal
      show={isOpen}
      onHide={handleModal}
      dialogClassName="modal-90w"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Select User Emails</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Select options={options} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModal}>
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InviteModal;
