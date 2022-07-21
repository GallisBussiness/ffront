import {useState} from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useAppointmentStore } from '../Modals/stateModal';
import shallow from 'zustand/shallow';

function Step3() {

  const {type,setProp} = useAppointmentStore(state => ({setProp: state.setProp,type: state.type}),shallow);
   
    const [state, setstate] = useState(type)
    const handleChange = (e) => {
        setstate(e.target.value)
        setProp('type',e.target.value);
    }
    return (
        <>
           <div className="px-3 py-2" >
<FormControl variant="filled" sx={{ m: 1, minWidth: '100%' }}>
        <InputLabel id="type-de-rendez-vous">Type de RV</InputLabel>
        <Select
          labelId="type-de-rendez-vous"
          id="tyde-de-rendez-vous"
          defaultValue={state}
          value={state ?? "PHYSICAL"}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="PHYSICAL">PHYSIQUE</MenuItem>
          <MenuItem value="CALLING_VIDEO">TELECONSULTATION</MenuItem>
        </Select>
      </FormControl>
</div> 
        </>
    )
}

export default Step3
