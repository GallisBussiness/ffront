import {Controller, useForm } from 'react-hook-form';
import { registerPatient, registerPatientByGoogle } from '../../services/UserService';
import  { GoogleLogin } from 'react-google-login'
  import { useSignIn } from 'react-auth-kit'
  import  {useNavigate } from 'react-router-dom'
 import { toast, ToastContainer } from 'react-toastify';
import { useMutation } from 'react-query';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask'
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Checkbox } from 'primereact/checkbox';


function InsPatient() {
 const signIn = useSignIn()
 const navigate  = useNavigate()

   const responseSuccessGoogle = ({profileObj}) => {
     const name = profileObj.givenName +' '+profileObj.familyName;
     const email = profileObj.email;
     const password = profileObj.googleId;

     const user = {name, email, password};

      google(user);

   }

   const reponseFailureGoogle = (response) =>  {
   console.log(response);
  }
  const defaultValues = {name:'',phoneNumber:'',email:'',password:'', accept:false}
  const {control,handleSubmit , formState: {errors}} = useForm({defaultValues});
    const {isLoading, mutate} = useMutation((data) =>  registerPatient(data), {
      onSuccess(data) { 
        if(signIn({token: data?.token,
          expiresIn: 60,
          tokenType: "Bearer",
          authState: {_id:data?.user?._id,type_user: data?.user?.type_user,status: data?.user?.status, userId: data?.user?.userId},
             })){ 
              navigate('/dashboard-patient')
              }else {
                toast.error('Nous avons rencontrés des problèmes pour vous incrire !')
           }
      },
      onError: (_) => {
        toast.error('Nous avons rencontrés des problèmes pour vous incrire !')
      }
    })

    const {mutate: google} = useMutation((data) =>  registerPatientByGoogle(data), {
      onSuccess(data) { 
        if(signIn({token: data?.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: data?.user,
             })){ 
              navigate('/validation')
              }else {
                toast.error('Nous avons rencontrés des problèmes pour vous incrire !')
           }
      },
      onError: (_) => {
        toast.error('Nous avons rencontrés des problèmes pour vous incrire !')
      }
    })


    const getFormErrorMessage = (name) => {
      return errors[name] && <small className="p-error">{errors[name].message}</small>
  };

    const onSubmit = data => {
      delete data.accept;
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
                                      
                  <Controller control={control} name="name" rules={{required: 'Votre nom est obligatoire'}} render={({field,fieldState}) => (
                    <InputText {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Nom complet*" />
                    )} />
                      {getFormErrorMessage('name')}
                  </div>
                        <div className="field">
                        <Controller control={control} name="email" rules={{required: 'Votre email est obligatoire',pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Email Invalide . E.g. example@email.com' }}} render={({field,fieldState}) => (
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
                          <Controller control={control} name="password" rules={{required: 'Votre password est obligatoire'}} render={({field,fieldState}) => (
                            <Password {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Password*" header={passwordHeader} footer={passwordFooter} />
                          )} />
                            {getFormErrorMessage('password')}
                        </div>
                        <div className="field-checkbox">
                        <Controller control={control} name="accept" rules={{required:'Avez-vous accepter les conditions ?'}} render={({field,fieldState}) => (
                          <Checkbox onChange={(e) => field.onChange(e.checked)} checked={field.value}  className={classNames({ 'p-invalid': fieldState.invalid })} />
                        )}/>
                         <label className={classNames({ 'p-error': errors.accept })}> <a href="/conditions" target="_blank" > J'accepte les termes et conditions*</a></label>
                        </div> 
                        <Button type="submit" label="S'inscrire" loading={isLoading} className="mt-2" />
         </form>
 <GoogleLogin
    clientId="628598715675-olvlgachmar35l8jtvtbmqqtjc3le0k0.apps.googleusercontent.com"
    render={renderProps => (
      <button onClick={renderProps.onClick} disabled={renderProps.disabled}
       type="button" className="w-full block mt-3 bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300 cursor-pointer">
      <div className="flex items-center justify-center">
      <img src="/google.png" alt="google" className="w-8 h-8" />
      <span className="ml-4">
      S'inscrire avec Gmail</span>
      </div>
    </button>
    )}
    onSuccess={responseSuccessGoogle}
    onFailure={reponseFailureGoogle}
    cookiePolicy={'single_host_origin'}
  /> 
            </div>
            <ToastContainer /> 
        </>
    )
}

export default InsPatient
