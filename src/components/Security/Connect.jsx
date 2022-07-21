import { useEffect } from 'react'
import {Controller, useForm } from 'react-hook-form';
import { useSignIn,useIsAuthenticated,useAuthUser} from 'react-auth-kit'
import {ToastContainer, toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../services/UserService';
import { Backdrop, CircularProgress } from '@mui/material';
import { useMutation } from 'react-query';
import GoogleLogin from 'react-google-login';
import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

const schema = yup.object({
   username: yup.string()
   .matches(/(^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)|((\+221|00221)?)((7[7608][0-9]{7}$)|(3[03][98][0-9]{6}$))/,{message:"username invalide !"})
   .required(),
  password: yup.string().required(),
}).required();

function Connect() {

    const isAuth = useIsAuthenticated();
    const auth = useAuthUser()()
    const signIn = useSignIn();
    const navigate = useNavigate();
    useEffect(() => {
      if(isAuth()) {
        const targetDashboard = auth?.type_user === 'PATIENT' ? '/dashboard-patient' : '/dashboard';
        navigate(targetDashboard, { replace: true });
      }
      return;
    }, [isAuth,navigate,auth])

    const defaultValues = {username:'',password:''};
    const { control, handleSubmit,formState: { errors } } = useForm({
      resolver: yupResolver(schema),
      defaultValues
    });
    const getFormErrorMessage = (name) => {
      return errors[name] && <small className="p-error">{errors[name].message}</small>
  };

  
    const {isLoading, mutate} = useMutation((data) => login(data), {
      onSuccess(data) { 
        toast.success('Vos informations sont modifiées avec success');
        if(signIn({token: data?.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: {_id:data?.user?._id,type_user: data?.user?.type_user,status: data?.user?.status, userId: data?.user?.userId},
             })){ 
              const targetDashboard = data?.user?.type_user === 'PATIENT' ? '/dashboard-patient' : '/dashboard';
              navigate(targetDashboard, { replace: true });
              }else {
                toast.error('Nous avons rencontrés des problèmes pour vous conntecté !');
           }
      },
      onError:(_) => {
        toast.error('username et/ou mot de passe incorrect !!!');
      }
    })
    

    const responseSuccessGoogle = ({profileObj}) => {
      const username = profileObj.email;
      const password = profileObj.googleId;
      
      const user = {username, password};
 
       mutate(user);
 
    }
 
    const reponseFailureGoogle = (response) =>  {
    console.log(response);
   }
    const onConnect = data => {
      mutate(data);
      };
    return (
        <>
          <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={isLoading}
>
  <CircularProgress color="inherit" />
</Backdrop>
         <div className="pt-3">
            <div className="rounded-3xl bg-gray-100 px-6 py-3">
           <h1 className="text-lg md:text-4xl font-normal leading-tight mt-6 text-center">SE CONNECTER</h1>
      <form onSubmit={handleSubmit(onConnect)} className="p-fluid  my-3 space-y-2">
      <div className="field">
          <Controller control={control} name="username" render={({field,fieldState}) => (
                            <InputText {...field} className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Email ou numéro de téléphone*" />
             )}/>
                            {getFormErrorMessage('username')}
                        </div>
             <div className="field">
                          <Controller control={control} name="password" render={({field,fieldState}) => (
                            <Password {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Password*" />
                          )} />
                            {getFormErrorMessage('password')}
          </div>

              <div className="text-right mt-2">
                <Link to="/forgot-password" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Mot de passe oublié?</Link>
              </div>

              <Button type="submit" label="CONNEXION" className="mt-2" />
</form>
            </div>
 

<hr className="my-6 border-gray-300 w-full" />

<GoogleLogin
    clientId="628598715675-olvlgachmar35l8jtvtbmqqtjc3le0k0.apps.googleusercontent.com"
    render={renderProps => (
      <button onClick={renderProps.onClick} disabled={renderProps.disabled}
       type="button" className="w-full block mt-3 bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
      <div className="flex items-center justify-center">
      <img src="/google.png" alt="google" className="w-8 h-8" />
      <span className="ml-4">
      Se Connecter avec Gmail</span>
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

export default Connect
