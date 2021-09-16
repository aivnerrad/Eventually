import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateSaleForm from './CreateSaleForm';

function CreateSaleModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div id="why">
      <button onClick={() => setShowModal(true)}>Create a Sale!</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSaleForm />
        </Modal>
      )}
    </div>
  );
}

export default CreateSaleModal;
