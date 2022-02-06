import { Modal } from 'react-bootstrap';
import Button from '../Button';

function Popup({ show, handleClose, handleSetYes, heading, body }) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton className="bg-dark">
        <Modal.Title>
          <p className='f-md'>{heading}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <p className='f-sm'>{body}</p>
      </Modal.Body>
      <Modal.Footer className="bg-dark">
        <Button
          type="button"
          className="custom-primary-outline-btn"
          onClick={() => {
            handleSetYes();
            handleClose();
          }}>
          Yes
        </Button>
        <Button type="button" className="custom-secondary-outline-btn" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default Popup;