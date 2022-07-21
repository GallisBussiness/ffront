import React from 'react'
import { useQuery } from 'react-query';
import { appointmentFindAllByDoctor } from '../../../services/AppointementService';
import Calendrier from '../../Calendrier'

function CalendarProfile({auth}) {

  const key  = ["loadRecevedAppointementsByDoctor"];

  const {data} = useQuery(key,() => appointmentFindAllByDoctor(auth?._id,'PENDING'),{
    staleTime: 50_000,
  })
   let events = [];
    if(data) {
      events = data.map(d => {
         return {
            date: d.date,
            start: d.startTime,
             end: d.endTime,
            title: d.title.toUpperCase(),
           classNames: 'text-lg font-semibold'
         }
      })
    }
    // const events = [{
    //      
    //     },
    //     {
    //       start: '2021-10-07T09:00:00',
    //       end: '2021-10-07T11:00:00',
    //       title: 'Rendez avec le patient Amadou Ba',
    //       classNames: ['bg-primary', 'text-lg font-semibold']
    //     },
    //          { title: 'event 2', date: '2021-10-04' }
    //          ]
    return (
        <>
            <div className="mx-6 my-4">
                    <div className="flex items-center h-40  bg-primary rounded-3xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-28 w-28 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <h1 className="text-6xl font-bold my-5 mx-4 text-white">Calendrier</h1>
                    </div>
                    <div className="my-3 text-black">
                      <Calendrier eventColor='blue' events={events} hiddenDays={[]} slotMaxTime="24:00:00" slotMinTime="6:00:00" />
                    </div>
            </div> 
        </>
    )
}

export default CalendarProfile
