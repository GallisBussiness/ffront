import { Modal } from "@mui/material";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import  {markAsReadNotification  } from '../../services/NotificationService'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
function ModalNotification({open,onClose,notif,auth}) {
    const qc = useQueryClient()
    const key = ["loadNotification",auth?._id];
    const {mutate} = useMutation(() => markAsReadNotification(notif?._id),{
    onSuccess: (_) => {
     qc.invalidateQueries(key);
    },
    onError: (_) => { console.log(_)},
    }
    )

    useEffect(() => {
    if(notif?.isRead === false) {
        mutate();
    }
    }, [mutate,notif])
    return <div>
    <Modal onBackdropClick={() => onClose()}
        open={open}
      >
       <div className="rounded-3xl w-2/4 min-h-1/2 bg-gray-50 px-5 py-3" style={style}>
         {notif?.message}
       </div>
      </Modal>
  </div>;
}

export default ModalNotification