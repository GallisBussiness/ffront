import React,{useContext} from 'react';
import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { fr } from "date-fns/locale";
import ApContext from '../../AppointementContext';


export default function DatePickers() {
  const context = useContext(ApContext)
  const [value, setValue] = React.useState(context.date);
  return (
    <LocalizationProvider locale={fr} dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        orientation="portrait"
        label="Selectionnez le jour"
        openTo="day"
        value={value}
        minDate={new Date()}
        shouldDisableDate={isWeekend}
        onChange={(newValue) => {
          setValue(newValue);
          context.date = newValue.toLocaleDateString().replace(/\/+/g,'-');
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}