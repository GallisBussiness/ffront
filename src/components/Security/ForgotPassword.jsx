import {Controller,useForm} from 'react-hook-form'
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { sendPasswordResetRequest } from '../../services/UserService';
import { useMutation } from 'react-query';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

function ForgotPassword() {
  const toast = useRef();
  const schema = yup.object({
    username: yup.string()
    .matches(/(^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)|((\+221|00221)?)((7[7608][0-9]{7}$)|(3[03][98][0-9]{6}$))/,{message:"username invalide !"})
    .required(),
 }).required();
 

  const defaultValues = {username:''};
  const {control, handleSubmit, formState: {errors}} = useForm({ resolver: yupResolver(schema),defaultValues});
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
};

const {mutate,isLoading} = useMutation((data) => sendPasswordResetRequest(data),{
  onSuccess: (_) => {
    toast.current.show({severity: 'success', summary: 'Un Email de réinitialisation à été envoyé !', detail: 'Réinitialisation Mot de Passe'});
  },
  onError: (_) => {
    toast.current.show({severity: 'error', summary: 'Impossible d\'envoyé l\'email de réinitialisation!', detail: 'Réinitialisation Mot de Passe'});
  },
});

  const onSubmit = (data) => mutate(data);

    return (
        <>
        <Toast ref={toast} />
        <section className="flex flex-col md:flex-row h-screen items-center">

        <div className="hidden md:block w-full md:w-1/2 xl:w-2/3">
   <Link to="/" ><img src="/logo.png" className="mx-5 w-20 h-20" alt="logo"/></Link>
    <img src="/docteur.png" className="w-2/3 h-full py-2 mx-auto" alt="doctorimage" />
  </div>

<div className="bg-primary w-full md:max-w-full lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/2 h-screen p-4
      flex items-center justify-center">
      <div className="rounded-3xl w-2/3 bg-gray-100 px-6 py-3">
           <h1 className="text-xl md:text-2xl font-normal leading-tight my-6 text-center">Mot de Passe Oublié</h1>
           <form onSubmit={handleSubmit(onSubmit)} className="p-fluid space-y-2">
                  <div className="field">
                                      
                  <Controller control={control} name="username" render={({field,fieldState}) => (
                    <InputText  {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Email ou Numéro de téléphone*" />
                    )} />
                      {getFormErrorMessage('username')}
                  </div>
                        
            <Button type="submit" label="SOUMETTRE"  loading={isLoading} className="mt-2" />
         </form>
  </div>
</div>
</section>
        
        </>
    )
}

export default ForgotPassword
