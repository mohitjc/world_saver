import React from 'react';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import { history } from '../../main/history';

export default function Preview({ isOpen, handleModal, img, userId }) {
  const history = useNavigate();
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={() => {}}
      onRequestClose={() => handleModal('')}
    >
      <div className="modal-body modal-img">
        <img src={img} className="prew-image" />
      </div>
      <div className="modal-footer">
        <Button letiant="secondary" onClick={() => history(`/${userId}`)}>
          View Profile
        </Button>
        <Button letiant="secondary" onClick={() => handleModal('')}>
          Close
        </Button>
      </div>
    </Modal>
  );
}
