import React from 'react';
import { Modal } from 'react-bootstrap';

const LoadingModal = ({ open, onClose }) => {
  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Body>
        <h4>Claiming Interest...</h4>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingModal;
