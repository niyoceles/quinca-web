import React from "react";
import { Modal } from "../Ui/Modal";

const ModalUi = ({ open, toggleModal, children, title = "System Notification" }) => {
  return (
    <Modal
      open={open}
      onClose={toggleModal}
      title={title}
      maxWidth="lg"
    >
      <div className="animate-in fade-in zoom-in-95 duration-300">
        {children}
      </div>
    </Modal>
  );
};

export default ModalUi;
