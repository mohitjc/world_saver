// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import swal from 'sweetalert';
import { sendInvites } from './../../store/actions/userActions';
import { Media, Col } from 'reactstrap';
import Image from 'react-bootstrap/Image';
import userImg from './user.png';
const InviteModal = ({ isOpen, handleModal, userList, selectedProject }) => {
  const dispatch = useDispatch();
  const [emails, set_emails] = useState([]);
  const setOptions = (users) => {
    const arr = [];
    if (users && users.data && users.data.users) {
      const list = users.data.users;
      list.map((user) => {
        if (user.email) {
          arr.push({
            id: user.id,
            value: user.email,
            label: user.fullName,
          });
        }
      });
    }
    return arr;
  };
  const setEmails = (value) => {
    set_emails(value);
  };
  const sendInvite = () => {
    dispatch(
      sendInvites({ projectId: selectedProject, users: emails }, (res) => {
        if (res) {
          swal('Invites sent successfully !!!', {
            buttons: false,
            timer: 1500,
          });
          handleModal();
        }
      })
    );
  };
  const CustomOption = (props) => {
    const { innerProps, innerRef } = props;
    return (
      <Media ref={innerRef} {...innerProps}>
        <Media left>
          <Image src={userImg} roundedCircle className="invite-img" />
        </Media>
        <Media body>
          <Media heading> {props.data.label}</Media>
          {props.data.value}
        </Media>
      </Media>
    );
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
        <Select
          options={setOptions(userList)}
          isMulti
          onChange={(e) => setEmails(e)}
          components={{ Option: CustomOption }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModal}>
          Close
        </Button>
        <Button variant="primary" onClick={sendInvite}>
          Send Invite
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InviteModal;
