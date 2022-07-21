import { useState } from 'react';
import {MdEventAvailable} from 'react-icons/md';
import { useQuery } from 'react-query';
import { getEventsByMedecin } from '../../../services/EventService';
import CreateEvent from '../EventsComponents/CreateEvent';
function Events({auth}) {
   const [newEvent,setNewEvent] = useState(false)
   const close = () => setNewEvent(false)
   const createEvent = () => setNewEvent(true)
   const key = ['loadEvents',auth._id];
   const {data} = useQuery(key,() => getEventsByMedecin(auth?._id))

  return (
    <>
     <div className="mx-6 my-4 space-y-4 min-h-screen">
                    <div className="flex items-center h-40  bg-primary rounded-3xl">
                   <MdEventAvailable className="h-28 w-28 text-white" />
                   <p className="text-bold text-5xl text-white">Evenements</p>
                    <span style={{flex: '1 1 auto'}}></span>
                    <button type="button" onClick={createEvent} className="inline-block px-6 py-2.5 bg-white text-primary font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-white hover:shadow-lg focus:bg-white focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-6">CREER UN EVENEMENT</button>
                    </div>
                   {data && data.map(d => (
                     <div key={d._id} className="flex justify-center">
                     <div className="rounded-lg shadow-lg bg-white max-w-sm">
                      
                         <img className="rounded-t-lg" src={`//localhost:3100/uploads/${d.image}`} alt="event_image"/>
                      
                       <div className="p-6">
                         <h5 className="text-gray-900 text-xl font-medium mb-2">{d?.title}</h5>
                         <p className="text-gray-700 text-base mb-4">
                          {d?.description}
                         </p>
                         
                       </div>
                     </div>
                   </div>
                   ))}
                 <CreateEvent open={newEvent} close={close} auth={auth} />
            </div> 
     
    </>
  )
}

export default Events