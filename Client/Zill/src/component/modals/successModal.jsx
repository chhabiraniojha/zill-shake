import { Modal, Button } from 'react-bootstrap';
import './successModal.css';
import successLogo from '../../assets/img/success.jpg';

const SuccessModal = ({ open, onClose, message }) => {
    return (
        <Modal show={open} onHide={onClose} className=" succesfull_pupu">
            <Modal.Header closeButton className="modal-header">
                <Modal.Title className="modal-title">Success</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
                <img src={successLogo} alt="Success Logo" className="success-logo" />
                <div className="message">{message}</div>
            </Modal.Body>
            <Modal.Footer className="modal-footer">
                <Button variant="secondary" onClick={onClose} className="close-button">
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SuccessModal;