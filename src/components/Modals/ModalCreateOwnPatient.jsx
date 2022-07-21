import { Modal } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { createOwnPatient } from '../../services/UserService';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask'
import { Button } from 'primereact/button';
import { SelectButton } from 'primereact/selectbutton';
import { classNames } from 'primereact/utils';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };


function ModalCreateOwnPatient({open,onClose,variables,auth}) {

  const defaultValues =  {sexe:'Inconnu',name:'',email:'',phoneNumber:'',adresse:'',ville:''};
  const sexeOptions = [{label:'Homme', value:'Homme'},{label:'Femme',value:'Femme'}];
    const { control, handleSubmit, formState: { errors }, reset } = useForm( {defaultValues});

    const getFormErrorMessage = (name) => {
      return errors[name] && <small className="p-error">{errors[name].message}</small>
  };

    const { mutate,isLoading } = useMutation((data) => createOwnPatient(data), {
      onSuccess: (_) => {
        toast.success('Patient Crée !!');
        reset();
        onClose();
      },
      onError: (_) => {
          toast.error('Erreur !!')
      }
    })

   const  OnSubmit = (data) =>  {
      const {sexe,name,email,phoneNumber,adresse,ville,...rest} = data
     const v = Object.keys(rest).reduce((acc, cur) => [...acc,{name: cur, value: rest[cur]}],[]);
      const d = {sexe,name,email,phoneNumber,adresse,ville,doctorId: auth?._id,variables: v}
      mutate(d);
   }
  return <div>
    <Modal onBackdropClick={() => onClose()}
        open={open}
      >
       <div className="rounded-3xl w-2/4 max-h-screen overflow-y-scroll bg-gray-50 px-5 py-3" style={style}>
       <div className="text-center text-primary font-bold text-3xl my-2">Nouveau Patient</div>
       <form onSubmit={handleSubmit(OnSubmit)} className="p-fluid space-y-2">
                        <div className="field">
                               <Controller control={control} name="name" rules={{required: 'Votre nom est obligatoire'}} render={({field,fieldState}) => (
                                  <InputText {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Nom complet*" />
                          )} />                         
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="field">
                            
                            <Controller control={control} name="sexe" render={({field,fieldState}) => (
                           <SelectButton {...field}  options={sexeOptions}></SelectButton>
                          )}/>
                              
                            {getFormErrorMessage('sexe')}
                        </div>
                        <div className="field">
                        <Controller control={control} name="email" rules={{required: 'Votre email est obligatoire',pattern:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}} render={({field,fieldState}) => (
                            <InputText {...field} className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Email*" />
                        )}/>
                            {getFormErrorMessage('email')}
                        </div>
                        <div className="field">
                        <Controller control={control} name="phoneNumber" rules={{required: 'Votre numéro de téléphone est obligatoire'}} render={({field,fieldState}) => (
                           <InputMask mask="999999999" {...field} className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Téléphone" ></InputMask>
                        )}/>
                        </div>
                        
                        <div className="field">
                        <Controller control={control} name="adresse" rules={{required: 'Votre adresse est obligatoire'}} render={({field,fieldState}) => (
                            <InputText {...field} className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Adresse*" />
                        )}/>
                        {getFormErrorMessage('adresse')}
                        </div>
                        <div className="field">
                        <Controller control={control} name="ville" rules={{required: 'Votre ville est obligatoire'}} render={({field,fieldState}) => (
                            <InputText {...field} className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Ville*" />
                        )}/>
                        {getFormErrorMessage('ville')}
                        </div>
                        {variables && variables.map((v,i) => (
     <div key={i} className="mb-3 w-full">
      <div className="field">
                        <Controller control={control} name={v.name} rules={{required: `${v.name} est obligatoire pour le patient`}} render={({field,fieldState}) => (
                            <InputText {...field} className={classNames({ 'p-invalid': fieldState.invalid })} placeholder={`${v.name}*`} />
                        )}/>
                        {getFormErrorMessage(v.name)}
                        </div>
   </div> 
  ))}
                        <Button type="submit" label="CREER PATIENT" loading={isLoading} className="mt-2" />
                    </form>
       </div>
      </Modal>
  </div>;
}

export default ModalCreateOwnPatient;
