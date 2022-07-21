import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
export default function PikeTime({enabled,value,register,index,day,remove}) {
  const handleRemove = () => remove(index-1)
  return (
    <div className="flex space-x-1 items-center my-3">
    <div className="timepicker relative form-floating mb-3 xl:w-1/3 w-full">
      <input type="time" disabled={!enabled}
        defaultValue={value?.startTime ?? ""}
        {...register(`${day}_start_${index}`, {required: true})}
        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Select a time" />
      <label htmlFor="floatingInput" className="text-gray-700">Debut </label>
      <button tabIndex="0" type="button" className="timepicker-toggle-button" data-mdb-toggle="timepicker">
        <i className="fas fa-clock timepicker-icon"></i>
      </button>
    </div>
    <div className="timepicker relative form-floating mb-3 xl:w-1/3 w-full">
      <input type="time" disabled={!enabled}
        defaultValue={value?.endTime ?? ""}
        {...register(`${day}_end_${index}`,{required: true})}
        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Select a time" />
      <label htmlFor="floatingInput" className="text-gray-700">fin</label>
      <button tabIndex="0" type="button" className="timepicker-toggle-button" data-mdb-toggle="timepicker">
        <i className="fas fa-clock timepicker-icon"></i>
      </button>
    </div>
    { index > 0 && <div>
       <IconButton aria-label="delete" size="large" onClick={handleRemove}>
      <DeleteIcon fontSize="inherit" />
    </IconButton>
    </div>}
    </div>
  );
}