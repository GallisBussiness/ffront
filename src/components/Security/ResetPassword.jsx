import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from 'react-query';
import { passwordReset } from "../../services/UserService";
import { useRef } from "react";
import { Toast } from "primereact/toast";

function ResetPassword() {
  const toast  = useRef()
  const {id,token} = useParams();
  const navigate = useNavigate();

  const defaultValues = {password:''};
  const {control, handleSubmit, formState: {errors}} = useForm({defaultValues});
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>
};

const {mutate,isLoading} = useMutation((data) => passwordReset(data),{
  onSuccess: (_) => {
    toast.current.show({severity: 'success', summary: 'Mot de Passe réinitialisé !', detail: 'Réinitialisation Mot de Passe'});
    navigate('/', {replace: true});
  },
  onError: (_) => toast.current.show({severity: 'error', summary: 'Impossible de réinitialisé le mot de passe !', detail: 'Réinitialisation Mot de Passe'}),
});

  const onSubmit = (data) => {
    const d = {...data,id,token};
    mutate(d);
  }


    return (
        <>
        <Toast ref={toast} />
         <section className="flex flex-col md:flex-row h-screen items-center">

<div className="hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
  <img src="/docteur.png" alt="" className="w-full h-full object-cover"></img>
</div>

<div className="bg-blue-500 w-full md:max-w-full lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/2 h-screen p-4
      flex items-center justify-center">
      <div className="rounded-3xl w-2/3 bg-gray-300 px-6 py-3">
           <h1 className="text-xl md:text-2xl font-normal leading-tight mt-6 text-center">Modification du mot de passe</h1>
           <form onSubmit={handleSubmit(onSubmit)} className="p-fluid space-y-2">
                  <div className="field">
                                      
                  <Controller control={control} name="password" render={({field,fieldState}) => (
                    <Password  {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Mot de passe*" />
                    )} />
                      {getFormErrorMessage('password')}
                  </div>
                        
            <Button type="submit" label="CHANGER MOT DE PASSE"  loading={isLoading} className="mt-2" />
         </form>
            </div>
</div>
</section>
        </>
    )
}

export default ResetPassword
