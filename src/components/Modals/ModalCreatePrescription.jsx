import { Button, Divider, Modal } from '@mui/material'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import data from '../../data/basemed.json';
import { useMutation,useQueryClient } from 'react-query';
import { createPrescription } from '../.././services/PrescriptionService';
import {toast,ToastContainer} from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width:'50%',
    transform: 'translate(-50%, -50%)',
  };
function ModalCreatePrescription({open,onClose,appointment,close,auth}) {


    const [medicament,setMedicament] = useState("");
    const [medicaments,setMedicaments] = useState([]);

    const { register,handleSubmit } = useForm();
    const itemsMed = data.map((item, i) => ({...item,id: i}))
    const qc = useQueryClient();
    const key = ["loadPrescriptionMedecin",auth?._id];
   const  {mutate} = useMutation((data) => createPrescription(data), {
       onSuccess: (_) => {
           toast.success('Ordonnace crée !!');
           qc.invalidateQueries(key);
           close();
       },
       onError: (_) =>  {
           toast.error('Erreur !!')
       }
   })

    const detacheMedicament = (m) => setMedicaments((c) => c.filter((t) => t.medicament !== m.medicament))
    const onSubmit = (data) =>  {
        const dts = {...data,number: + data.number, medicament }
        setMedicaments((c) => [...c,dts]);
    }
    const onSelect = (item) => {
      setMedicament(item.LIBEL);
    }

    const onChange = (v) => setMedicament(v);

    const save = () => {
        const patientId = appointment?.patient?.user?._id
        const doctorId = auth?._id;
        const data = {prescriptions: [...medicaments],patientId,doctorId};
       mutate(data);
    }

  return (
    <>
     <Modal
    open={open}
     onClose={onClose}
      >
        <div className="rounded-lg min-w-2/3 max-h-screen overflow-y-scroll bg-gray-50 px-2 py-1" style={style}>
           <div className="flex flex-col">
            <div className="bg-gray-50 px-5 py-8">
            <div className="text-center text-primary font-bold text-lg">Prescription P-FRD-001</div>
           <div className="flex justify-between items-center">
               <div>
                   <div className="text-primary font-bold text-lg">Dr Abdoulaye NDIAYE</div>
                   <p className="text-primary text-sm">abdoulaye@gmail.com</p>
                   <p className="text-primary text-sm">(+221) 33 664 75 37</p>
               </div>
               <div>
                   <img src="/docteur.png" alt="doctor" className="w-28 h-28 rounded-full" />
               </div>

           </div>
           <div className="flex justify-between items-center mt-2 mb-10">
               <div>
                   <div className="text-primary font-bold text-lg">Salif SANE</div>
                   <p className="text-primary text-sm">(+221) 77 668 00 57</p>
                   <p className="text-primary text-sm">27 ans</p>
               </div>
               <div>
               <p className="text-primary text-sm">Dakar, le 12-03-2021</p>
               </div>  
           </div>
           <div className="space-y-3 my-2">
            <div className="text-primary font-bold text-3xl">INFORMATIONS MEDICAMENTS</div>
         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row items-center w-full space-y-2 md:space-x-2">
         <div className="w-full">
                 <ReactSearchAutocomplete 
                            items={itemsMed}
            styling={{ zIndex: 2,color:'black' }} // To display it on top of the search box below
            autoFocus
            fuseOptions={{ keys: ["LIBEL","FALIB"] }}
            resultStringKeyName="LIBEL"
            placeholder="médicaments ..."
            onSelect={onSelect}
            onSearch={onChange}
          />
         </div>
         <div className="w-full">
         <div className="w-full flex justify-center">
            <div className="w-full">
    <select className="form-select appearance-none
      block
      w-full
      px-3
      py-2.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded-2xl
      mb-1
      focus:shadow-lg
      hover:shadow-lg
      transition
      ease-in-out
      focus:text-gray-700 focus:bg-white focus:outline-none"
       aria-label="frequence selection"
       {...register('frequence',{required:true})}
       defaultValue="jour"
      >
        <option value="jour">Par Jour</option>
        <option value="semaine">Par Semaine</option>
        <option value="mois">Par Mois</option>
    </select>
            </div>
        </div>
         </div>
         <div className="w-full">
         <div className="w-full flex justify-center">
     <div className="w-full">
    <input
      type="number"
      {...register('number', {required:true})}
      className="
        form-control
        block
        w-full
        px-3
        py-2.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded-2xl
        mb-1
      focus:shadow-lg
      hover:shadow-lg
        transition
        ease-in-out
        focus:text-gray-700 focus:bg-white focus:outline-none
      "
      id="x-fois"
      placeholder="Nombre de fois"
    />
  </div>
</div>
         </div>
         <div className="flex items-center justify-end">
     <button type="submit" className="inline-block px-6 py-2.5 bg-primary text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mb-1 ">Ajouter</button>
        </div>

            </form>
            </div>
            {medicaments.map((m,i) => (
               <div key={i} className="px-4 py-3 flex justify-between items-center bg-gray-200 rounded-3xl my-2">
               <div className="flex justify-between items-center w-full">
                   <div>
                       <div className="text-primary font-bold text-lg">{m.medicament}</div>
                   </div>
                   <p className="text-primary font-bold text-lg">{m.number} x Par {m.frequence}</p>
               </div>
               <Button onClick={() => detacheMedicament(m)} className="print:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 print:hidden" viewBox="0 0 20 20" fill="currentColor">
         <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
         </svg>
        </Button>
            </div>  
            ))}
           <Divider />
            </div>
            <div>
            <div className="flex justify-end items-center py-2">
           <button onClick={() => close()} className=" bg-danger text-white active:bg-red-600 font-bold text-xs px-6 py-3 rounded-full shadow hover:shadow-md outline-none
            focus:outline-none mx-6 mb-1 ease-linear transition-all 
            duration-150" type="button"> Fermer</button>
            <button onClick={save} className="bg-primary text-white active:bg-red-600
            font-bold text-xs px-6 py-3 rounded-full shadow hover:shadow-md 
            outline-none focus:outline-none mx-6 mb-1 ease-linear transition-all 
            duration-150" type="button"> Enrégister la prescription</button>
          </div>
            </div>
           </div>   
       </div>
    </Modal>
    <ToastContainer />
    </>
  )
}

export default ModalCreatePrescription