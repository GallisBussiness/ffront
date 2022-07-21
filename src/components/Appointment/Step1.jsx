import React, { useCallback, useState } from 'react'
import DatePicker from 'react-datepicker'
import fr from 'date-fns/locale/fr'
import "react-datepicker/dist/react-datepicker.css";
import { getScheduleByMedecin } from '../../services/ScheduleService';
import ModalAppointment from '../Modals/ModalAppoinment';
import {useQuery} from 'react-query'
import { getDay } from 'date-fns';
import { useAppointmentStore } from '../Modals/stateModal';
import shallow from 'zustand/shallow';


function Step1({medecin}) {
    const {setProp} = useAppointmentStore(state => ({setProp: state.setProp}),shallow)
    const  [open,setOpen] = useState(false);
    const  [showError,setShowError] = useState(true);
    const key = ["loadScheduleInfo",medecin]
    const {data} = useQuery(key,() => getScheduleByMedecin(medecin), {
        staleTime: 50_000,
    })
    const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
    
    const handleChange = (date) => {
        setDate(date)
        if(!filteredTime(date)) {
            setShowError(true)
        }
        else {
            setShowError(false)
            setProp('date',date);
            setProp('startTime',date.toISOString());
        }
      
    }

    const handleNext = () => setOpen(true);

  const handleMonthChange = (date) => {
      setShowError(true)
       setDate(new Date(date.setHours(0, 0, 0, 0)));
  }


    const handleClose = useCallback(() =>setOpen(false),[])

    const getDateFr = (n) => {
        const arr = [0,1,2,3,4,5,6];
        if(n === 0) return 6;
         return arr[n - 1];
    }
    const filteredDate = (date) => {
        if (data?.slots) {
            const day = getDateFr(getDay(date))
            return data?.slots[day]?.isActive
            }
        return true;
      };

      const filteredTime = (date) => {
          if(data) {
             const selectedDate = new Date(date).toLocaleTimeString().split(':')[0];
             const day = getDateFr(getDay(date));
             const Hours = data?.slots[day]?.hours;
            const intervals =  Hours?.map(h => {
              const start = h?.startTime?.split(':');
              const end = h?.endTime?.split(':');
              return [start[0],end[0]];
            })
         if (intervals.length === 0) return false;
             const res = intervals.some((e => {
                return (+e[0] <= +selectedDate) && (selectedDate <= +e[1]) 
             }
                 ))
         return res;
        }

        return true;
       
     };

    return (
        <>
        <div className="w-full">
    <DatePicker
     minDate={new Date()}
      locale={fr}
       showTimeSelect
        onMonthChange={handleMonthChange}
        inline
        filterDate={filteredDate}
        filterTime={filteredTime}
        selected={date}
        adjustDateOnChange={true}
        timeCaption='Heures'
        onChange={handleChange}>
        {showError ? 
        <div className="text-sm text-yellow-700">
         Selectionnez une heure disponible svp !!!
      </div>
          : <div className="abosulte bottom-0 mx-auto w-2/3 my-1">
              <button type="button" onClick={handleNext} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Continuer</button>
          </div>
          
          }
        </DatePicker>
        
        </div>
        <ModalAppointment open={open} medecinID={medecin} close={handleClose} />
        </>
    )
}

export default Step1
