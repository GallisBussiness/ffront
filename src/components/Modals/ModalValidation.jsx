import { Modal } from '@mui/material';
import React from 'react';
import Validation from '../Security/Validation';

function ModalValidation({open,onClose,close}) {
  return <div>
      <Modal open={open} onClose={onClose}>
        <div className="flex flex-col justify-between">
            <Validation close={close}/>
         </div>
      </Modal>
      
  </div>;
}

export default ModalValidation;
