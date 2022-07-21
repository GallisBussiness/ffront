import { Modal } from "@mui/material";
import TabConApp from "../Security/TabConApp";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
function ModalAuth({open,onClose,close}) {
  return <div>
    <Modal onBackdropClick={() => onClose()}
        open={open}
      >
       <div className="rounded-3xl w-2/4 min-h-1/2 bg-gray-50 px-5 py-3" style={style}>
          <TabConApp close={close} />
       </div>
      </Modal>
  </div>;
}

export default ModalAuth;
