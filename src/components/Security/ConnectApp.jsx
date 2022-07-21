import { useForm } from 'react-hook-form';
import SecurityIcon from '@mui/icons-material/Security';
import { useSignIn} from 'react-auth-kit'
import {ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../services/UserService';
import { Backdrop, CircularProgress } from '@mui/material';
import { useMutation } from 'react-query';
import GoogleLogin from 'react-google-login';
import shallow from 'zustand/shallow';
import { useAppointmentStore } from '../Modals/stateModal';

const schema = yup.object({
   username: yup.string()
   .matches(/(^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)|((\+221|00221)?)((7[7608][0-9]{7}$)|(3[03][98][0-9]{6}$))/,{message:"username invalide !"})
   .required(),
  password: yup.string().required(),
}).required();

function ConnectApp({close}) {
  const {setPatientProp} = useAppointmentStore(state => ({setPatientProp: state.setPatientProp}),shallow)
    const signIn = useSignIn();

    const { register, handleSubmit,formState: { errors } } = useForm({
      resolver: yupResolver(schema)
    });
  
    const {isLoading, mutate} = useMutation((data) => login(data), {
      onSuccess(data) { 
        toast.success('Authentification valide !');
        if(signIn({token: data?.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: {_id:data?.user?._id,type_user: data?.user?.type_user,status: data?.user?.status, userId: data?.user?.userId},
             })){ 
              setPatientProp('patientId', data?.user?._id);
             close();
              }else {
                toast.error('Nous avons rencontrés des problèmes pour vous conntecté !');
                close();
           }
      },
      onError:(_) => {
        toast.error('Erreur lors de la connexion !!!');
        close();
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
           <h1 className="text-lg md:text-2xl font-normal leading-tight mt-6 text-center">S'authentifier</h1>
      <form onSubmit={handleSubmit(onConnect)} className=" my-6">
     <div>
     <div className="mt-1 rounded-md shadow-sm">
     <input  {...register("username") } type="text" placeholder="Email ou Numéro de téléphone" className="w-full px-4 py-3 rounded-lg 
    bg-gray-50 mt-2 border focus:border-grey-500 pl-6 focus:bg-white focus:outline-none font-roboto"/>
  </div>
    {errors.username && <div className="text-sm font-medium text-red-500 px-3 py-1">{errors.username.message}</div>}
     </div>

  <div className="mt-4">
  <div className="mt-1 relative rounded-md shadow-sm">
   <input {...register("password")} type="password" placeholder="mot de passe" className="w-full px-4 py-3 rounded-lg bg-gray-50 mt-2 border focus:border-gray-500
          focus:bg-white pr-14 focus:outline-none font-roboto" autoComplete="true"/>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
      <span className="text-gray-900  text-lg pt-2">
        <SecurityIcon className="text-primary"/>
      </span>
    </div>
  </div>
          {errors.password && <div className="text-sm font-medium text-red-500 px-3 py-2">{errors.password.message}</div>}
  </div>
  <div className="text-right mt-2">
    <Link to="/forgot-password" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Mot de passe oublié?</Link>
  </div>

  <button type="submit" className="inline-block px-7 py-3 bg-primary text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">SOUMETTRE</button>
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
      Se Connecter avec Google</span>
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

export default ConnectApp
