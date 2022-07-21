import { Divider, Paper } from '@mui/material'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputMask } from 'primereact/inputmask'
import { InputText } from 'primereact/inputtext'
import { classNames } from 'primereact/utils'
import React, { useRef } from 'react'
import { Controller,useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { toast, ToastContainer } from 'react-toastify'
import { updatePassword, updatePatient, uploadProfileImage} from '../../../services/UserService'


function Profile({auth}) {
    const queryClient = useQueryClient()
    const uploadInputRef = useRef(null)
    const sexeOptions = [{label:'Homme', value:'Homme'},{label:'Femme',value:'Femme'}];
    const {name,email,phoneNumber,adresse,ville,sexe} = auth;
    const defaultValues =  {sexe:sexe ?? '',name: name ?? '',email: email ?? '',phoneNumber: phoneNumber ?? '',adresse: adresse ?? '',ville:ville ?? ''};
    const { control, handleSubmit, formState: { errors }} = useForm({defaultValues});
    const key = ["loadPatientInfo"]

    const {register:rp,handleSubmit:upass } = useForm()

    const {mutate} = useMutation((data) => updatePassword(data),{
        onSuccess:(_) => {
            toast.success('Mot de passe modifié avec success !!!')
            queryClient.invalidateQueries(key)
        },
        onError:(_) => {
            toast.error('Erreur lors du traitement !!!')
        }
    })

    const {mutate:uploadFile} = useMutation((fd) => uploadProfileImage(auth?._id,fd,'patient'), {
        onSuccess(_) { 
          toast.success('Profile modifiée avec success !!!');
          queryClient.invalidateQueries(key);
        },
        onError(_) {
            toast.error('Erreur lors de le l\'opération')
        }
      })

    const {mutate:upInfo,isLoading} = useMutation((data) => updatePatient(auth?._id,data),{
        onSuccess:(_) => {
             toast.success('Informations modifiée avec success !!!')
             queryClient.invalidateQueries(key)
             
        },
        onError:(_) => {
            toast.error('Erreur lors du traitement !!!')
        }
    })

    const update = (data) => {
       upInfo(data); 
    }
    

    const updatePasswordData = (data) => {
        const d = {...data,id:auth?.userId};
        mutate(d);
    }

    const uploadImage = () => uploadInputRef.current.click();
    const handleUpload = () => {
        const file = uploadInputRef.current.files[0];
        const fd = new FormData();
       fd.set('profile',file,file.name);
       uploadFile(fd);
    }

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return (
        <>
          <div className="container py-2 space-y-4 my-4">
              <div className="flex flex-col md:flex-row px-2">
              <div className="flex w-1/3">
  <div className="flex items-center flex-col space-y-10 rounded-lg shadow-lg bg-white max-w-sm text-center w-full">
      <div className="space-y-4 w-full mx-auto flex flex-col items-center py-2">
          <img
        src={`//localhost:3100/uploads/${auth?.profile_image}`}
        className="rounded-full w-32 shadow-lg"
        alt="Avatar"
        />
        <input type="file" onChange={handleUpload} className="hidden" accept="image/png, image/gif, image/jpeg" ref={uploadInputRef} />
        <h3 className="text-3xl font-medium leading-tight mt-0 mb-2 text-black">{auth.firstName} {auth.lastName}</h3>
        <h6 className="text-base font-medium leading-tight mt-0 mb-2 text-blue-600">{auth.username}</h6>
      </div>
 
    <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
    <button type="button" onClick={uploadImage} className="inline-block px-6 py-2.5 bg-primary text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-lg transition duration-150 ease-in-out">Modifier l'image</button>
    </div>
  </div>
                </div>
                <div className="flex w-2/3 mx-2">
                    <Paper className="w-full p-4">
                        <div>
                        <h4 className="text-2xl font-medium leading-tight mt-0 mb-2 text-black">Mes Informations personnelles</h4>
                        <h2 className="text-lg font-medium leading-tight mt-0 mb-2 text-black">Vous pouvez les modifier ici</h2>
                        </div>
                        <Divider />
                        <div className="w-full my-3">
                        <form onSubmit={handleSubmit(update)} className="p-fluid space-y-2">
                        <div className="field">
                               <Controller control={control} name="name" rules={{required: 'Votre nom est obligatoire'}} render={({field,fieldState}) => (
                                  <InputText {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Nom complet*" />
                          )} />
                         
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
                         

                        <Button type="submit" label="Mettre à jour" loading={isLoading} className="mt-2" />
                    </form>
                        </div>
                    </Paper>
                </div>
              </div>
            {(!auth?.isGoogle && !auth?.isFacebook) && <Paper className="p-4">
                        <div>
                        <h4 className="text-2xl font-medium leading-tight mt-0 mb-2 text-black">Modifier votre mot de Passe</h4>
                        </div>
                        <Divider />
                        <div className="w-full my-3">
                            <form onSubmit={upass(updatePasswordData)}>
                            <div className="flex items-center">
                            <div className="flex justify-center w-1/2 mx-2">
                                <div className="mb-3 xl:w-96">
                                    <label htmlFor="oldPassword" className="form-label inline-block mb-2 text-gray-700">Ancien mot de passe</label>
                                    <input
                                    type="password"
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
                                    placeholder="ancien mot de passe"
                                    id="oldPassword"
                                    {...rp('oldPassword')}
                                    />
                                </div>
                                </div>
                                <div className="flex justify-center w-1/2 mx-2">
                                <div className="mb-3 xl:w-96">
                                    <label htmlFor="password"  className="form-label inline-block mb-2 text-gray-700">Nouveau mot de passe</label>
                                    <input
                                    type="password"
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
                                    placeholder="nouveau mot de passe"
                                    id="password"
                                    {...rp('password')}
                                    />
                                </div>
                                </div>
                            </div>
                            <Divider />
                            <div className="flex justify-end mt-6 px-4">
                            <button type="submit" className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">MODIFIER</button>
                            </div>
                            </form>
                            
                        </div>
                    </Paper> }
          </div>
          <ToastContainer />
        </>
    )
}

export default Profile
