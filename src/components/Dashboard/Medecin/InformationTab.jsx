import { useCallback } from 'react'
import {Controller, useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import {updateMedecin, updatePassword } from '../../../services/UserService';
import spec from '../../../data/data.json'
import { useMutation, useQueryClient } from 'react-query';
import { classNames } from 'primereact/utils';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask'
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';


function InformationTab({auth}) {

  const specialities = spec.map(d => ({...d,label: d.KEY,value:d.KEY.toLocaleLowerCase()}));
   const titleOptions = [{label:'Mr',value:'Mr'},{label:'Mme',value:'Mme'},{label:'Dr',value:'Dr'},{label:'Pr',value:'Pr'}];
   const sexeOptions = [{label:'Homme', value:'Homme'},{label:'Femme',value:'Femme'}];
   const {email,phoneNumber,adresse,ville,speciality,sexe} = auth;
   const [t,p,n] = auth?.name.split(' ');
  const defaultValues =  {sexe,name: `${p} ${n}` ,email,phoneNumber,adresse,ville,speciality,title: t};
  const defaultValuesPassword = {password:'', oldPassword:''};
    const { control, handleSubmit, formState: { errors }} = useForm({defaultValues});
    const { control:controlPassword, handleSubmit:handleUpdatePassword,formState: {errors:errorsPassword} } = useForm({defaultValues:defaultValuesPassword});
    const getFormErrorMessage = (name) => {
      return errors[name] && <small className="p-error">{errors[name].message}</small>
  };

  const getFormErrorMessagePassword = (name) => {
    return errorsPassword[name] && <small className="p-error">{errorsPassword[name].message}</small>
};

  const passwordHeader = <h6>Entrer un mot de passe</h6>;
    const passwordFooter = (
        <>
            <Divider />
            <p className="mt-2">Indications</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>Au moins une muniscule</li>
                <li>Au mois une majuscule</li>
                <li>Au moins un nombre</li>
                <li>Minimum 8 caractères</li>
            </ul>
        </>
    );

    const key = ["loadMedecinInfo"];
    const queryClient = useQueryClient();
    const {mutate,isLoading} = useMutation(({id, ...rest}) => updateMedecin(id,rest), {
      onSuccess(_) { 
        toast.success('Vos informations sont modifiées avec success');
        queryClient.invalidateQueries(key);
      },
      onError(_) {
        toast.error('Impossible de modifier les informations !');
      }
    })

    const {mutate:update,isLoading:isUpdatingPassword} = useMutation((data) => updatePassword(data), {
      onSuccess(_) { 
        toast.success('Votre mot de passe est modifié avec success !!!');
        queryClient.invalidateQueries(key);
      },
      onError(_) {
          toast.error('Mot de passe non modifié !!!')
      }
    })

   const onSubmit = useCallback((data) => {
    const {title} = data;
    data.name = title + ' '+ data.name;
    delete data.title;
    data.id = auth?.userId;
    mutate(data);
   }, [mutate,auth])


   const onUpdatePassword = (data) => {
     const d = {...data,id:auth?.userId};
     update(d);
   };

    return (
        <>
               <form onSubmit={handleSubmit(onSubmit)} className="p-fluid space-y-2">
                        <div className="field">
                            <div className="flex space-x-1">
                            <Controller control={control} name="title" rules={{required:'Votre titre est obligatoire!'}} render={({field,fieldState}) => (
                            <Dropdown {...field} options={titleOptions} />
                          )}/>
                               <Controller control={control} name="name" rules={{required: 'Votre nom est obligatoire'}} render={({field,fieldState}) => (
                                  <InputText {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Nom complet*" />
                          )} />
                            </div>
                         
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="field">
                            
                            <Controller control={control} name="sexe" rules={{required:'Votre sexe est obligatoire!'}} render={({field,fieldState}) => (
                            <Dropdown {...field} options={sexeOptions} className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Sexe" />
                          )}/>
                              
                            {getFormErrorMessage('sexe')}
                        </div>
                        <div className="field">
                        <Controller control={control} name="email" rules={{required: 'Votre email est obligatoire'}} render={({field,fieldState}) => (
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
                         <div className="field">
                          <Controller control={control} name="speciality" rules={{required:'Votre spécialité est obligatoire!'}} render={({field,fieldState}) => (
                            <Dropdown {...field} options={specialities} placeholder="Spécialités " />
                          )}/>
                         {getFormErrorMessage('speciality')}
                        </div>

                        <Button type="submit" label="Mettre à jour" loading={isLoading} className="mt-2" />
                    </form>
          <form
            onSubmit={handleUpdatePassword(onUpdatePassword)}
            className="my-12 rounded-3xl bg-gray-100 min-h-96 px-4 py-4 p-fluid space-y-2"
          >
                  <div className="field">
                          <Controller control={controlPassword} name="oldPassword" rules={{required: 'Votre ancien mot de passe obligatoire'}} render={({field,fieldState}) => (
                            <Password {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Ancien Mot de passe*" header={passwordHeader} footer={passwordFooter} />
                          )} />
                            {getFormErrorMessagePassword('oldPassword')}
                        </div>
                        <div className="field">
                          <Controller control={controlPassword} name="password" rules={{required: 'Votre nouveau mot de passe est obligatoire'}} render={({field,fieldState}) => (
                            <Password {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Nouveau Mot de Passe*" header={passwordHeader} footer={passwordFooter} />
                          )} />
                            {getFormErrorMessagePassword('password')}
                        </div>
                        <Button type="submit" label="Mettre à jour le mot de passe" loading={isUpdatingPassword} className="mt-2" />
          </form>
          <ToastContainer />
        </>
    )
}

export default InformationTab
