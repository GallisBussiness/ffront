import  React,{useContext} from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticTimePicker from '@mui/lab/StaticTimePicker';
import { fr } from "date-fns/locale";
import ApContext from '../../AppointementContext'

export default function TimePicker({label}) {

  const context = useContext(ApContext)
  const [value, setValue] = React.useState(new Date());

  const handleChange = (newValue) =>  {
    setValue(newValue);
    context.heure = newValue.toLocaleTimeString();
  }

  return (
    <LocalizationProvider locale={fr} dateAdapter={AdapterDateFns}>
      <StaticTimePicker
      label={label}
        displayStaticWrapperAs="mobile"
        value={value}
        ampm={false}
        minTime={new Date(0, 0, 0, 8)}
        maxTime={new Date(0, 0, 0, 20, 0)}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}