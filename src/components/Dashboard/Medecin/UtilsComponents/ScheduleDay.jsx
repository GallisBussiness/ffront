import { Button, Switch } from "@mui/material"
import { useCallback, useEffect, useState } from "react";
import PikeTime from "./PikeTime";

function ScheduleDay({day,register,hours, isActive}) {
  const [enabled,setEnabled] = useState(false);
  const [piketimes,setPiketimes] = useState([]);


  useEffect(() => {
    setEnabled(isActive);
},[isActive])
  const defaultReg = useCallback((v) => {},[])

  const addPikeTime = () => setPiketimes((piketimes) => [...piketimes,PikeTime])
  const onRemove = (index) => setPiketimes((piketimes) => piketimes.filter((p,i) => index !== i))
  

  const handleChange = () => setEnabled((v) => !v);
  
    return (
        <>
        <div className="flex items-center space-x-1 my-3">
            <h1 className="text-3xl font-bold">{day}</h1>
            <Switch checked={enabled} {...register(`${day}_isActive`)} onChange={handleChange} />
        </div>
           <PikeTime value={(hours && hours[0]) ?? null} enabled={enabled} register={enabled ? register : defaultReg} index={0} day={day} />
           {piketimes.length > 0 && piketimes?.map((P,i) => <P key={i} value={(hours && hours[i+1]) ?? null} enabled={enabled} index={i+1} register={enabled ? register: defaultReg} day={day} remove={onRemove} />)}
            <div className="flex items-center justify-end mx-3 my-2">
              <Button variant="contained" disabled={!enabled} onClick={addPikeTime}>Ajouter des horaires</Button>
            </div>
        </>
    )
}

export default ScheduleDay
