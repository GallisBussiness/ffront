import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr';
import  {useNavigate} from 'react-router-dom'
function Calendrier({events,hiddenDays,slotMinTime,slotMaxTime,height,colorEvent}) {
      const navigate = useNavigate()
    const handleEventClick = (e) => navigate('/dashboard/appoinment')
    return (
        <>
        <FullCalendar plugins={[timeGridPlugin,interactionPlugin]} initialView="timeGridWeek"
                                  events={events} 
                                         locales={frLocale}
                                     locale='fr' 
                                     editable={true}
                                     hiddenDays={hiddenDays}
                                     slotMinTime={slotMinTime}
                                     slotMaxTime={slotMaxTime}
                                     height={height}
                                     eventBackgroundColor={colorEvent}
                                     eventClick={handleEventClick}
                    />
        </>
    )
}

export default Calendrier
