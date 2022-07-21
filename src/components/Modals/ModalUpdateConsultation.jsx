import { Modal } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
function ModalUpdateConsultation({open,onClose,children}) {
    return (
        <div>
            <Modal
        open={open}
        onClose={onClose}
      >
       <div className="rounded-3xl min-w-2/3 min-h-1/2 bg-gray-50 px-5 py-8" style={style}>
          {children}   
       </div>
      </Modal>
        </div>
    )
}

export default ModalUpdateConsultation
