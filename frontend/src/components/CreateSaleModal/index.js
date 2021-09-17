import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSaleForm from './CreateSaleForm';

function CreateSaleModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create a Sale!</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSaleForm />
        </Modal>
      )}
    </>
  );
}

export default CreateSaleModal;
