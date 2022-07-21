import { Controller, useForm } from "react-hook-form";
import { Grid, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { BsFillGearFill } from 'react-icons/bs';
import { AiOutlinePlus  } from 'react-icons/ai';
import { deleteOwnPatient, getMedecin, getOwnPatients, sendSmsPatients, updateMedecin } from '../../../services/UserService';
import { useMutation, useQuery, useQueryClient} from "react-query";
import { useRef, useState } from "react";
import { CircleSpinner } from "react-spinners-kit";
import ModalCreateOwnPatient from "../../Modals/ModalCreateOwnPatient";
import { AiFillEye } from 'react-icons/ai';
import { FaSms } from 'react-icons/fa';

import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {InputText} from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { getConsultationByMedecin } from "../../../services/ConsultationService";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";

import DatePicker from 'react-datepicker'
import fr from 'date-fns/locale/fr'
import "react-datepicker/dist/react-datepicker.css";
import { getScheduleByMedecin } from "../../../services/ScheduleService";
import { add, getDay, parseISO } from "date-fns";
import { createOwnAppointment } from "../../../services/AppointementService";


const GestionPatient = ({auth}) => {
  const [variables,setVariables] = useState([]);
  const [v,setV] = useState([]);
  const [smsDialogVisible,setSmsDialogVisible] = useState(false);
  const [rvDialogVisible,setRvDialogVisible] = useState(false);
  const [showVariableDialog,setShowVariableDialog] = useState(false);
  const [selectedPatients,setSelectedPatients] = useState([])
  const [ createPatient,setCreatePatient ] = useState(false);
  const [sms,setSms] = useState('');
  const toast = useRef();
   const { register,handleSubmit} = useForm();
   const OwnPatientKey = ["loadOwnPatient"];
   const keyconsultations = ['loadConsulationInfo',auth?._id];
   const qc = useQueryClient();
   const typeOptions = [{label: 'PHYSIQUE', value:'PHYSICAL'},{label: 'TELECONSULTATION',value:'CALLING_VIDEO'}]
   const defaultValues = {title: null,date: new Date(new Date().setHours(0, 0, 0, 0)), time: '',type: ''};
   const { control, handleSubmit:handleRv, formState: { errors }} = useForm({defaultValues});

   const {data:ownpatients} = useQuery(OwnPatientKey,() => getOwnPatients(auth?._id),
   {
     staleTime: 1_000_000,
     refetchOnWindowFocus: false,
   });

   const {mutate:createOwnApp,isLoading:isCreatingOwnApp} = useMutation((data) => createOwnAppointment(data), {
    onSuccess: (_) => toast.current.show({severity: 'success', summary: 'Rendez-vous crée !', detail: 'Création rendez-vous'}),
    onError: (_) => toast.current.show({severity: 'error', summary: 'Impossible de creer ce rendez-vous !', detail: 'Création rendez-vous'}),
   })

   const {data: consultations} = useQuery(keyconsultations,() =>  getConsultationByMedecin(auth._id), {
    staleTime: 50_000,
  });

  const keySchedule = ["loadScheduleInfo",auth?._id]
  const {data:schedule} = useQuery(keySchedule,() => getScheduleByMedecin(auth?._id), {
      staleTime: 50_000,
  })

  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
};

   const { mutate:send,isLoading:isSendingSms } = useMutation((d) => sendSmsPatients(d), {
     onSuccess: (_) => console.log(_),
   })
   const key = ["loadMedecin"];
   useQuery(key,() => getMedecin(auth?._id), {
     staleTime: 100_000,
     onSuccess:(_) => {setVariables(_?.variables ?? [])}
   });
   const { mutate, isLoading } = useMutation((data) => updateMedecin(auth?._id, data))

   const {mutate:del} = useMutation((id) => deleteOwnPatient(id),{
    onSuccess(_){
      qc.invalidateQueries(OwnPatientKey);
    },
    onError(){},
})

  const save = () => {
    mutate({variables})  
  }
  const deletePatients = () => {
    for(let patient of selectedPatients) {
       del(patient._id);
    }
    setSelectedPatients([]);
 };
  const OnSubmit = (data) => {
    setVariables((v) => [...v, data])
  }
  const hideSmsDialog = () => setSmsDialogVisible(false);
  const openSmsDialog = () => setSmsDialogVisible(true);

  const hideRvDialog = () => setRvDialogVisible(false);
  const showRvDialog = () => setRvDialogVisible(true);

  const openVariableDialog = () => setShowVariableDialog(true);
  const hideVariableDialog = () => setShowVariableDialog(false);

    const handleDelete = (data) => {
      setVariables((v) => v.filter((c => c.name !== data.name)))
    }

    const handleCreatePatient = () => {
        setCreatePatient(true);
    }

    const handleCloseCreatePatient = () => { setCreatePatient(false); }
    const onSelectionChange = (e) => {
      setSelectedPatients(e.value)
   }
   
   const showVariable = (v) => {
     setV(v);
     openVariableDialog();
   }
   
   const onSubmitRv = (data) =>{
    const {date,time,title,type} = data;
    const dtz = date.toISOString().split('T')[0];
    const tmz = time.toISOString();
    const startTime = dtz +'T'+ tmz.split('T')[1];
    const endTime = add(parseISO(startTime),{
      minutes: title?.time,
    }).toISOString();

    const app = { patient: selectedPatients[0],date: dtz,title: title.title,startTime,endTime,type, doctor: auth?._id};
    createOwnApp(app);
   }

   const displayVariables = (v) => <div className="flex items-center justify-center w-full"><Button icon={<AiFillEye className="h-6 w-6 text-white" />} onClick={() => showVariable(v)} /> </div> ;
  
   const sendSms = (message) => {
    if(message === '') toast.current.show({severity: 'error', summary: 'Message Vide', detail: 'Renseigner le message'})
    const data = {id: auth?._id,message,tel: selectedPatients.map(p => p.phoneNumber)};
    console.log(data);
    send(data);
  }
   const leftToolbarTemplate = () => {
    return (
        <>
            <Button label="Supprimer" icon="pi pi-trash" className="p-button-danger" disabled={selectedPatients.length === 0} onClick={deletePatients} />
        </>
    )
  }

  const getDateFr = (n) => {
    const arr = [0,1,2,3,4,5,6];
    if(n === 0) return 6;
     return arr[n - 1];
}
const filteredDate = (date) => {
    if (schedule?.slots) {
        const day = getDateFr(getDay(date))
        return schedule?.slots[day]?.isActive
        }
    return true;
  };

  
  const rightToolbarTemplate = () => {
    return (
        <div className="flex items-center space-x-1">
             <Button label="Nouveau rendez-vous" onClick={showRvDialog}  icon={<FaRegCalendarCheck className="h-6 w-6" />} className="p-button-success" disabled={selectedPatients.length !== 1} />
            <Button label="Exporter" icon="pi pi-upload" className="p-button-help" />
            <Button label="Envoyer sms" icon={<FaSms className="ml-1 h-6 w-6 text-white"/>} disabled={selectedPatients.length === 0} onClick={openSmsDialog} />
        </div>
    )
  }

  const textEditor = (v) =>  <InputText value={v} onChange={(val) => console.log(val)} />


  return (
    <div className="mx-6 my-4">
                    <div className="flex items-center justify-between h-40  bg-primary rounded-3xl">
                      <div className="flex items-center space-x-2">
                        <BsFillGearFill className="text-white h-28 w-28" />
                    <p className="text-bold text-5xl text-white">Gestion Patients</p>
                      </div>
                    <button onClick={handleCreatePatient}
                   className="bg-white text-primary active:bg-primary font-bold text-xs px-6 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mx-6
                   mb-1 ease-linear transition-all duration-150" type="button">Nouveau Patient <AiOutlinePlus className="inline font-bold h-5 w-5" /></button>
                    </div>
         <div> <form
            onSubmit={handleSubmit(OnSubmit)}
            className="my-12 rounded-3xl bg-gray-100 min-h-96 px-4 py-4"
          >
            <Grid container spacing={4}>
              <Grid item xs={12} sm={3} md={3}>
                <div className="w-full">
                  <label htmlFor="nom_variable" className="text-gray-800">
                    {" "}
                    Nom du variable
                    <input
                      type="text"
                      {...register("name", { required:true})}
                      placeholder="variable"
                      id="nom_variable"
                      className="w-full px-4 py-2 rounded-lg 
                              bg-gray-50 mt-2 border focus:border-grey-500 
                              focus:bg-white focus:outline-none"
                    />
                  </label>
                </div>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
              <div className="w-full mt-3">
              <label htmlFor="type_variable" className="text-gray-800">
              {" "}
            Type du variable
        <select
         {...register("value", { required:true})}
         className="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:outline-none" aria-label="type variable">
        <option value="text">Texte</option>
        <option value="number">Nombre</option>
    </select>
    </label>
              </div>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <button
                  className="bg-primary mt-8 mx-3 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none
                             focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Ajouter
                </button>
              </Grid>
            </Grid>
          </form>
          <div className="flex flex-col">
  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom du variable
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type du Variable
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {variables?.map((v,i) => (
               <tr key={i}>
              <td className="px-6 py-4 whitespace-nowrap">
               {v?.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {v?.value}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <IconButton aria-label="delete" color="primary" onClick={() => handleDelete(v)}>
                  <DeleteIcon />
                  </IconButton>
              </td>
            </tr>
            ))}
           
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div className="flex items-center justify-end">
  <button   onClick={() => save()}
        className="bg-primary mt-8 mx-3 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none
                             focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  { isLoading ? <CircleSpinner size={20} className="text-white inline" loading={true} /> : "SAUVEGARDER"}
                </button>
  </div>
</div>
          </div>
          <div className="my-6">
          <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
              <DataTable
          dataKey="_id"
          header={header}
           value={ownpatients}
           showGridlines
          editMode="row"
          selection={selectedPatients}
          onSelectionChange={onSelectionChange}
           onRowEditComplete={(e) => console.log({e})}
           responsiveLayout="scroll"
           paginator
           paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="patients {first} de {last} à {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}
           >
            <Column selectionMode="multiple" headerStyle={{width: '3em'}}></Column>
            <Column field="name" header="Nom compet" editor={({name}) => textEditor(name)} sortable></Column>
            <Column field="adresse" header="Adresse" sortable></Column>
            <Column field="ville" header="Ville" sortable></Column>
            <Column field="phoneNumber" header="Téléphone"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="variables" header="Variables" body={({variables}) => displayVariables(variables)}></Column>
            <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
        </DataTable>
          </div>
          <Dialog  visible={showVariableDialog} onHide={hideVariableDialog}>
               le variable = {JSON.stringify(v)}
          </Dialog>
          <Dialog header={`CREER UN RENDEZ-VOUS POUR ${selectedPatients[0]?.name}`} visible={rvDialogVisible} onHide={hideRvDialog}>
            <div className="w-96">
              <form onSubmit={handleRv(onSubmitRv)} className="p-fluid space-y-2">
                        <div className="field">
                           
                            <Controller control={control} name="title" rules={{required:'Selectionnez votre acte!'}} render={({field,fieldState}) => (
                            <Dropdown  optionLabel="title" options={consultations} value={field.value} onChange={(e) => field.onChange(e.value)}  className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Selectionnez un acte médical*" />
                          )}/>
                            {getFormErrorMessage('title')}
                        </div>
                        <div className="field">
                        <Controller control={control} name="date" rules={{required:'Selectionnez la date!'}} render={({field,fieldState}) => (
                             <DatePicker
                             minDate={new Date()}
                             className={classNames({ 'p-invalid': fieldState.invalid })}
                              locale={fr}
                                inline
                                filterDate={filteredDate}
                                {...field} >
                                </DatePicker>
                          )}/>
                            {getFormErrorMessage('date')}
                        </div>
                        <div className="field">
                           
                            <Controller control={control} name="time" rules={{required:'Selectionnez quelle heure !'}} render={({field,fieldState}) => (
                            <Calendar  value={field.value} onChange={(e) => field.onChange(e.value)} timeOnly hourFormat="24" className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Selectionnez l'heure*" />
                          )}/>
                            {getFormErrorMessage('time')}
                        </div>
                        <div className="field">
                           
                            <Controller control={control} name="type" rules={{required:'Selectionnez votre type de Rendez-vous!'}} render={({field,fieldState}) => (
                            <Dropdown value={field.value} onChange={(e) => field.onChange(e.value)} options={typeOptions} className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Selectionnez votre type de rendez-vous*" />
                          )}/>
                            {getFormErrorMessage('type')}
                        </div>
                        <Button type="submit" label="Creer rendez-vous" loading={isCreatingOwnApp} className="mt-2" />
                    </form>
            </div>
          
          </Dialog>
          <Dialog visible={smsDialogVisible} onHide={hideSmsDialog}>
            <div className="flex flex-col w-full items-center space-y-2 p-4">
               <label htmlFor="sms" className="text-lg font-bold">Message</label>
            <InputTextarea id="sms" value={sms} onChange={(e) => setSms(e.target.value)} rows={5} cols={30} autoResize />
            <Button label="Envoyer"loading={isSendingSms}  onClick={() => sendSms(sms)}/>
            </div>
          
          </Dialog>
          <ModalCreateOwnPatient open={createPatient} onClose={handleCloseCreatePatient} variables={variables.map(v => ({name: v.name.split(' ').join('_'),value: v.value}))} auth={auth} />
          <Toast ref={toast} />
    </div>
  )
}

export default GestionPatient


const header = (
  <div className="mt-3">
      <h5 className="mx-0 my-1 text-lg font-bold uppercase">Gestion de mes Patients</h5>
      
          <InputText type="search" placeholder="Rechercher..." className="w-1/3"/>
  </div>
);
