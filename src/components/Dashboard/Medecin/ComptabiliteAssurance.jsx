import { DateRangePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {fr} from 'date-fns/locale'
import { Box, TextField } from '@mui/material';
import { useState } from 'react';
import { AiFillAccountBook,AiOutlineWarning } from 'react-icons/ai';
import { getAssuredFactureByMedecin } from '../../../services/FacturationService';
import { useQuery} from 'react-query';
import { parseISO,sub,isWithinInterval,add } from 'date-fns';


const ComptabiliteAssurance = ({auth}) => {
    const [value, setValue] = useState([sub(new Date(), {months: 1 }), new Date()]);
    const [filtered,setFiltered] = useState([]);
    const key = ["loadAssuredFacture"];
   const { data } = useQuery(key,() => getAssuredFactureByMedecin(auth?._id), {
        staleTime: 100_000,
        onSuccess: (_) => {
         const f = filterData(_,value);
         setFiltered(f);
        },
    })
   const filterData = (d,v) => {
    return d?.filter(a => {
        return a.items.filter(it => {
            const t = isWithinInterval(parseISO(it.createdAt),{start:sub(v[0],{days:1}), end: add(v[1],{days:1})});
           return  t;
            }).length > 0;
    });
   }
    const handleOnChange = (v) => {
        setValue(v);
        const f = filterData(data,v);
        setFiltered(f);
    }

  return (
    <>
         <div className="mx-6 my-4">
                    <div className="flex items-center h-40 p-4 justify-between  bg-primary rounded-3xl">
                    <div className="flex items-center space-x-4">
                       <AiFillAccountBook className="h-28 w-28 text-white" />
                     <p className="text-bold text-5xl text-white">Comptabilité Assurance</p>
                    </div>
                    </div>
              <div className="bg-white p-4 rounded-lg my-3">
                 <div className="my-4 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-800">Selectionnez une période</h1>
            </div>
            <div className="my-2 flex items-center justify-center">
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={fr}>
      <DateRangePicker
        startText="Début"
        endText="Fin"
        maxDate={new Date()}
        value={value}
        onChange={handleOnChange}
        renderInput={(startProps, endProps) => (
          <>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> à </Box>
            <TextField {...endProps} />
          </>
        )}
      />
    </LocalizationProvider>
            </div>
              </div>
        {filtered.length > 0 ? filtered.map((a,i) => (
            <div key={i} className="flex flex-col space-y-2 my-4">
              <div className="bg-white px-3 py-2 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-primary">{a.assurance}</h1>
                <h1 className="text-3xl font-bold text-black">Total: {a.total}</h1>
                </div>
                {a.items.map((it,index) => (
                  <div key={index} className="rounded-3xl min-h-60 w-60 bg-gray-100 py-2 mx-2 my-2">
              <div className="flex flex-col justify-between items-center">
              <div className="w-full px-4">
                      <div className="flex items-center justify-evenly">
                        <h1 className="text-sm text-primary">Facture N° :</h1>
                        <h1 className="text-sm text-primary">{it.numero}</h1>
                      </div>
                      <div className="flex items-center justify-around">
                        <h1 className="text-sm text-primary">Date :</h1>
                        <h1 className="text-sm text-primary">{parseISO(it.createdAt).toLocaleDateString()}</h1>
                      </div>
                      <div className="flex items-center justify-around">
                        <h1 className="text-sm text-primary">valeur :</h1>
                        <h1 className="text-sm text-primary">{it.assurance.value}</h1>
                      </div>
                      <div className="w-full mx-2 my-2">
                      </div>
                  </div>
                  </div>
                  </div>  
                ))}
              
              </div> 
        )) : 
        <div className="text-3xl font-bold flex flex-col items-center justify-center bg-white my-3 p-4">
              <div><AiOutlineWarning className="text-red-400 h-20 w-20"/></div>
              <div> Vous ne comptabilisez pas d'assurances sur cette période</div>
        </div>
        }
         
          </div>
    </>
  )
}

export default ComptabiliteAssurance