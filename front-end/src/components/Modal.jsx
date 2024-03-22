import { Modal } from "react-bootstrap";

export const CustomModal = ({ smShow, closeModal, title, description }) => {
  return (
    <div>
      {" "}
      <Modal
        size="sm"
        show={smShow}
        onHide={closeModal}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1>${description}</h1>
        </Modal.Body>
      </Modal>
    </div>
  );
};
