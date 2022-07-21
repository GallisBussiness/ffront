import {Divider, List,ListItem,ListItemText } from '@mui/material';
import { useQuery } from 'react-query';
import { getAllNotificationsByUser } from '../../../services/NotificationService';
import {MdNotifications} from 'react-icons/md';
import { parseISO } from 'date-fns';
import ModalNotification from '../../Modals/ModalNotification';
import { useState } from 'react';
function Notifications({auth}) {
    const [open, setOpen] = useState(false);
    const [notif,setNotif] = useState(null);
    const key = ["loadNotification",auth?._id];
    
    const { data } = useQuery(key,() => getAllNotificationsByUser(auth?._id), {
        staleTime: 100_000,
    })

    const handleClose = () => {
      setOpen(false);
    }

    const handleOpen = (n) => {
      setNotif(n);
      setOpen(true)
    }
  return (
    <div className="mx-6 my-4">
                    <div className="flex items-center h-40 p-4 justify-between  bg-primary rounded-3xl">
                    <div className="flex items-center space-x-4">
                    <MdNotifications className="h-28 w-28 text-white" />
                     <p className="text-bold text-5xl text-white">Notifications</p>
                    </div>
                    </div>

               <div className="my-6 w-full">
     <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
         {data && data.map(d => (
             <div key={d._id} className={d?.isRead ? `bg-white cursor-pointer`  : `bg-primary cursor-pointer`}>
                <ListItem  onClick={() => handleOpen(d)} >
                <ListItemText primary={d.message} secondary={parseISO(d.createdAt).toLocaleDateString()} />
            </ListItem> 
            <Divider />
             </div> 
         ))}
      
    </List>
    </div>
    <ModalNotification  open={open} onClose={handleClose} notif={notif} auth={auth}/>
    </div>
  )
}

export default Notifications