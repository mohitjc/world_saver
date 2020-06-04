import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';

const InviteModal = ({ isOpen, handleModal, userList }) => {
  const setOptions = (users) => {
    const arr = [];
    if (users && users.data && users.data.users) {
      const list = users.data.users;
      list.map((user) => {
        if (user.email) {
          arr.push({ id: user.id, value: user.email, label: user.email });
        }
      });
    }
    return arr;
  };
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
        <Select options={setOptions(userList)} isMulti />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModal}>
          Close
        </Button>
        <Button variant="primary">Send Invite</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InviteModal;
