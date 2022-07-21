import { Button, Divider, FormControl, InputLabel, MenuItem, Modal, Select } from '@mui/material'
import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getConsultationByMedecin } from '../../services/ConsultationService';
import { createOwnFacture, getAllAssurances } from '../../services/FacturationService';
import { toast, ToastContainer } from 'react-toastify';
import items from '../../data/assurances.json'
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width:'50%',
    transform: 'translate(-50%, -50%)',
  };

function ModalOwnBilling({open,onClose,close,auth}) {

  const [value,setValue] = useState(null)
  const [consultations,setConsultations] = useState(new Set())
  const [prenom,setPrenom] = useState('')
  const [nom,setNom] = useState('')
  const [phoneNumber,setPhoneNumber] = useState('')
  const [assurances,setAssurance] = useState([]);
  const [total,setTotal] = useState(0)
  const [isAssuranceFetch, setIsAssuranceFetch] = useState(false);
  const [taux,setTaux] = useState(0);
  const [selectedAssurance,setSelectedAssurance] = useState(null);


  useEffect(() => {
    const itemsAss = items.map((item, i) => ({...item,id: i}))
    setAssurance(itemsAss);
  }, [])


 const qc = new useQueryClient()
  const key = ['loadConsulationInfo',auth?._id];
  const keyfacture = ["loadOwnFactueMedecin",auth?.id];
  const {data} = useQuery(key,() =>  getConsultationByMedecin(auth?._id), {
    staleTime: 100_000
  });

  const keyAssurance = ["loadAssurances"];

  useQuery(keyAssurance,() => getAllAssurances(),{
    enabled:!isAssuranceFetch,
    onSuccess: (_) => {
      let itemfs = [];
      for(let i=0; i< _.length; i++)
      itemfs.push({name:_[i].name,id: items.length + i});
      setAssurance((a) => [...a,...itemfs]);
      setIsAssuranceFetch(true);
    },
  })

  const {mutate} = useMutation((data) => createOwnFacture(data),{
    onSuccess(_) {
      qc.invalidateQueries(keyfacture)
      toast.success('Facture créée !!')
      close()
    },
    onError(_){
      toast.error('Error !!!')
    }
  })

  const onTauxChange = (e) => setTaux(e.target.value);

  const onSelectAsssurance = (v) => {setSelectedAssurance(v)}

  const handleChange = (e) => {
    setValue(e.target.value)
    setConsultations((set) => set.add(e.target.value));
    const t = Array.from(consultations).reduce((acc,cur) => acc + cur.price,e.target.value.price);
    setTotal(t);
  }

  const detacheConsultation = (consultation) => {
     consultations.delete(consultation);
     setConsultations(new Set([...Array.from(consultations)]));
  }
  const getTotalInfo = (total,t) =>  {
    if(!isNaN(t) && selectedAssurance) {
      const vt = total * t / 100;

     return {total: total - vt, deducted: vt }
    }
    return {total,deducted: 0 };
  }

  const saveFacture = () => {
    if(prenom === '' || prenom.length < 2) return toast.error('prenom vide ou mal renseigné !!');
    if(nom === '') return toast.error('nom vide ou mal renseigné !!');
    if(phoneNumber === '' || phoneNumber.length < 7) return toast.error('téléphone vide ou mal renseigné !!');
    const { total:price, deducted } = getTotalInfo(total,taux)
    let data = {
      prenom,
      nom,
      phoneNumber,
      doctorId: auth?._id,
      consultations: Array.from(consultations),
      total: price
    };

    data = (selectedAssurance && (!isNaN(taux)) && (taux > 0)) ? {...data, assurance: {name:selectedAssurance.name,value: deducted}} : data;
    mutate(data);
  }
    return (
        <>
             <Modal
        open={open}
        onClose={onClose}
      >
        <div className="rounded-lg min-w-2/3 max-h-screen bg-gray-50 px-5 py-8 overflow-scroll" style={style}>
        <div style={{padding:'10px'}}>
    <div className="text-center text-primary font-bold text-lg">Prescription P-FRD-001</div>
    <div className="flex justify-between items-center">
        <div>
            <div className="text-primary font-bold text-lg">{auth?.name}</div>
            <p className="text-primary text-sm">{auth?.email}</p>
            <p className="text-primary text-sm">(+221) {auth?.phoneNumber}</p>
        </div>

    </div>
    <div className="flex justify-between items-center mt-2 mb-10">
     <form className="w-full">
     <div className="mb-3 w-full">
    <label htmlFor="prenom" className="form-label inline-block mb-2 text-gray-700"
      >Prenom du Patient</label>
    <input
      type="text"
      value={prenom}
      onChange={(e) => setPrenom(e.target.value)}
      className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      id="prenom"
      placeholder="Prenom du patient"
    />
  </div>
  <div className="mb-3 w-full">
    <label htmlFor="nom" className="form-label inline-block mb-2 text-gray-700"
      >Nom du Patient</label>
    <input
      type="text"
      value={nom}
      onChange={(e) => setNom(e.target.value)}
      className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      id="nom"
      placeholder="Nom du patient"
    />
  </div>
  <div className="mb-3 w-full">
    <label htmlFor="telephone" className="form-label inline-block mb-2 text-gray-700"
      >Téléphone du Patient</label>
    <input
      type="text"
      value={phoneNumber}
      onChange={(e) => setPhoneNumber(e.target.value)}
      className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      id="telephone"
      placeholder="Téléphone du patient"
    />
  </div>
     </form> 
    </div>
    <div className="px-4 py-3 my-2 print:hidden">
    <FormControl variant="filled" sx={{ m: 1, minWidth: '100%' }}>
 <InputLabel id="type-de-rendez-vous">Actes Médicaux</InputLabel>
 <Select
   labelId="rendez-vous-pour"
   id="rendez-vous-rendez-vous"
   value={value ?? ""}
   onChange={handleChange}
 >
   {data?.map(d => (
      <MenuItem key={d._id} value={d}>{d.title.toUpperCase()}</MenuItem>
   ))}
 </Select>
</FormControl>
<div className="w-full my-2 flex iems-center space-x-2 mx-2">
    <div className="w-full">
        <ReactSearchAutocomplete 
                            items={assurances}
            styling={{ zIndex: 2,color:'black',iconColor:'#42a5f5' }} // To display it on top of the search box below
            fuseOptions={{ keys: ["name"] }}
            resultStringKeyName="name"
            placeholder="Assurances ..."
            onSelect={onSelectAsssurance}
            onClear={() => {setSelectedAssurance(null)}}
          />
    </div>
               
          <div className="flex justify-center w-36">
  <div className="xl:w-96">
    <input
      type="number"
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
        rounded-3xl
        transition
        focus:shadow-md
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none
      "
      id="taux"
      placeholder="Entrer le taux"
      value={taux}
      onChange={onTauxChange}
    />
  </div>
  <span className="w-10 h-10 p-4 mt-1 mx-1 rounded-3xl flex items-center justify-center text-lg bg-slate-400 text-white">
   %
 </span>
</div>
 
         </div>
    </div>
    {consultations && Array.from(consultations).map(c => (
    <div key={c._id} className="flex space-x-1 w-full">
        <div className="w-full px-4 py-3 bg-gray-200 rounded-3xl my-2">
             <div className="flex justify-between items-center">
            <div>
                <div className="text-primary font-bold text-lg">{c?.title?.toUpperCase()}</div>
               <p className="text-primary text-sm">{c?.time} minutes</p>
            </div>
            <p className="text-primary text-sm">{c?.price} FCFA</p>
        </div>
        
         </div>
        <Button onClick={() => detacheConsultation(c)} className="print:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 print:hidden" viewBox="0 0 20 20" fill="currentColor">
         <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
         </svg>
        </Button>
    </div>
    )) }
    <div className="flex items-center justify-between">
    <div className="text-primary font-bold text-lg">Total : <span className="text-primary text-lg">{total}</span> FCFA </div>
    </div>
    <Divider />
</div>
       <div className="flex justify-end items-center py-2">
        <button onClick={close} className=" bg-danger text-white active:bg-red-600 font-bold text-xs px-6 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mx-6 mb-1 ease-linear transition-all duration-150" type="button"> Fermer</button>
        <button onClick={saveFacture}
         className="bg-primary text-white active:bg-red-600 font-bold text-xs px-6 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mx-6
          mb-1 ease-linear transition-all duration-150" type="button">Enrégitrer la facture</button>
           </div>
       </div>
      </Modal>
      <ToastContainer />
        </>
    )
}

export default ModalOwnBilling
