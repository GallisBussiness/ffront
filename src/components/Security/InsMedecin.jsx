import {Controller,useForm } from 'react-hook-form';
import { useSignIn } from 'react-auth-kit'
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask'
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import  { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import { registerMedecin} from '../../services/UserService';
import { classNames } from 'primereact/utils';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import {Checkbox} from 'primereact/checkbox';
import data from '../../data/data.json';
import { useMutation } from 'react-query';

function InsMedecin() {
  const signIn = useSignIn()
  const navigate  = useNavigate()
   const specialities = data.map(d => ({...d,label: d.KEY,value:d.KEY.toLocaleLowerCase()}));
   const titleOptions = [{label:'Mr',value:'Mr'},{label:'Mme',value:'Mme'},{label:'Dr',value:'Dr'},{label:'Pr',value:'Pr'}]
  const defaultValues = {password:'',name:'',title:'Dr',adresse:'',ville:'',phoneNumber:'',email:'',speciality:'',accept:false}
    const {control,handleSubmit , formState: {errors}} = useForm({defaultValues});
    const {isLoading, mutate} = useMutation((data) =>  registerMedecin(data), {
      onSuccess(data) { 
        toast.success('Vos informations sont modifiées avec success');
        if(signIn({token: data?.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState:{_id:data?.user?._id,type_user: data?.user?.type_user,status: data?.user?.status, userId: data?.user?.userId},
             })){ 
              navigate('/dashboard')
              }else {
                toast.error('Nous avons rencontrés des problèmes pour vous incrire !')
           }
      },
      onError:(_) => {
        toast.error('Nous avons rencontrés des problèmes pour vous incrire !')
      }
    })

    const getFormErrorMessage = (name) => {
      return errors[name] && <small className="p-error">{errors[name].message}</small>
  };

    const onSubmit = data => {
      delete data.accept;
      const {title} = data;
      delete data.title;
      data.name = title + ' '+ data.name
      mutate(data);
    }

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

    return (
        <>
        <div className="py-3">
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
                        <div className="field">
                          <Controller control={control} name="password" rules={{required: 'Votre password est obligatoire'}} render={({field,fieldState}) => (
                            <Password {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Password*" header={passwordHeader} footer={passwordFooter} />
                          )} />
                            {getFormErrorMessage('password')}
                        </div>
                        <div className="field-checkbox">
                        <Controller control={control} name="accept" rules={{required:'Avez-vous accepter les conditions ?'}} render={({field,fieldState}) => (
                          <Checkbox  onChange={(e) => field.onChange(e.checked)} checked={field.value} className={classNames({ 'p-invalid': fieldState.invalid })} />
                        )}/>
                        <label className={classNames({ 'p-error': errors.accept })}> <a href="/conditions" target="_blank">J'accepte les termes et conditions*</a> </label>
                        </div> 

                        <Button type="submit" label="S'inscrire" loading={isLoading} className="mt-2" />
                    </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default InsMedecin
