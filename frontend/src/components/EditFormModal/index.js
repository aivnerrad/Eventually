import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSaleForm from './EditSaleForm';

function EditSaleModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit your Sale!</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSaleForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditSaleModal;
