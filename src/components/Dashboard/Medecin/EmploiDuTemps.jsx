import { Backdrop, Divider } from "@mui/material"
import ScheduleDay from "./UtilsComponents/ScheduleDay"
import {useForm} from 'react-hook-form'
import { useMutation, useQuery } from "react-query";
import { createSchedule, getScheduleByMedecin } from '../../../services/ScheduleService';
import { FlapperSpinner } from "react-spinners-kit";
import { toast, ToastContainer } from "react-toastify";

function EmploiDuTemps({auth}) {
const days = ['LUNDI','MARDI','MERCREDI','JEUDI','VENDREDI','SAMEDI','DIMANCHE']
const key = ["loadScheduleInfo",auth?._id]
const {data,isLoading:loading} = useQuery(key,() => getScheduleByMedecin(auth?._id),{
    refetchOnWindowFocus: false,
})
 const { mutate, isLoading} = useMutation((data) => createSchedule(data), {
     onSuccess: (_) => {
        toast.success('Emploie du temps modifié !!!')
     }
});
const {handleSubmit, register} = useForm();

const submit = (data) => {
     let slots = [];
     let day = new Set()
    Object.keys(data).forEach((v,i) => {
        let dayname = v.split('_')[0];
        let isActive = data[`${dayname}_isActive`];
        if(!day.has(dayname)) {
            let slot = {};
            slot.dayName = dayname;
            slot.isActive = isActive;
            slot.hours = [];
            const curDays = Object.keys(data).filter(v => v.includes(`${dayname}_start`))
            curDays.forEach((v,i) => slot.hours.push({startTime: data[`${dayname}_start_${i}`], endTime: data[`${dayname}_end_${i}`]}))
            slots.push(slot);
            day.add(dayname)
        }
    })
   mutate({doctorId: auth?._id,slots});
};

    return (
        <>
         <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={loading || isLoading}
>
<FlapperSpinner  loading={loading || isLoading} color='blue'/>
</Backdrop>
        <form onSubmit={handleSubmit(submit)}>
        <ScheduleDay day={data?.slots[0]?.dayName || days[0]} isActive={data?.slots[0]?.isActive || false} hours={data?.slots[0]?.hours || []} register={register} /> 
        <Divider />
        <ScheduleDay day={data?.slots[1]?.dayName || days[1]} isActive={data?.slots[1]?.isActive || false} hours={data?.slots[1]?.hours || []} register={register} /> 
        <Divider />
        <ScheduleDay day={data?.slots[2]?.dayName || days[2]} isActive={data?.slots[2]?.isActive || false} hours={data?.slots[2]?.hours || []} register={register} /> 
        <Divider />
        <ScheduleDay day={data?.slots[3]?.dayName || days[3]} isActive={data?.slots[3]?.isActive || false} hours={data?.slots[3]?.hours || []} register={register} /> 
        <Divider />
        <ScheduleDay day={data?.slots[4]?.dayName || days[4]} isActive={data?.slots[4]?.isActive || false} hours={data?.slots[4]?.hours || []} register={register} /> 
        <Divider />
        <ScheduleDay day={data?.slots[5]?.dayName || days[5]} isActive={data?.slots[5]?.isActive || false} hours={data?.slots[5]?.hours || []} register={register} /> 
        <Divider />
        <ScheduleDay day={data?.slots[6]?.dayName || days[6]} isActive={data?.slots[6]?.isActive || false} hours={data?.slots[6]?.hours || []} register={register} /> 
        <Divider />
         <div className="flex space-x-2 justify-center my-6">
        <button type="submit" className="inline-block px-6 py-2.5 bg-blue-600 text-white
         font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 
         hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Sauvegarder</button>
        </div>
        </form>
        <ToastContainer />
        </>
    )
}

export default EmploiDuTemps
