import {useState} from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getConsultationByMedecin } from '../../services/ConsultationService';
import { useQuery } from 'react-query';
import {addMinutes} from 'date-fns';
import { useAppointmentStore, useStore } from '../Modals/stateModal';
import shallow from 'zustand/shallow';


function Step2({medecinId}) {
  const { selectActe } = useStore(state => ({selectActe: state.selectActe }),shallow)
  const {setProp,date} = useAppointmentStore(state => ({setProp: state.setProp,date: state.date}),shallow);
    const [state, setstate] = useState('')

    const key2 = ['loadConsulationInfo',medecinId];
    const {data} = useQuery(key2,() =>  getConsultationByMedecin(medecinId), {
      staleTime: 100_000
    });


    const handleChange = (e) => {
        setstate(e.target.value)
        setProp('title', e.target.value.title);
        setProp('endTime',addMinutes(date,e.target.value.time).toISOString());
        selectActe(true);
    }
    return (
        <>
           {data && <div className="px-3 py-5" >
        <FormControl variant="filled" sx={{ m: 1, minWidth: '100%' }}>
        <InputLabel id="type-de-rendez-vous">RV pour</InputLabel>
        <Select
          labelId="rendez-vous-pour"
          id="rendez-vous-rendez-vous"
          defaultValue={state}
          value={state ?? "consultation générale"}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {data?.map(d => (
             <MenuItem key={d._id} value={d}>{d.title.toUpperCase()}</MenuItem>
          ))}
        </Select>
      </FormControl>
</div> }
        </>
    )
}

export default Step2
