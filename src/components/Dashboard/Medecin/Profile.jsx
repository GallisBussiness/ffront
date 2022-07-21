import { PhotoCamera } from '@mui/icons-material'
import {Badge,IconButton } from '@mui/material'
import React,{useRef} from 'react'
import ProfileTab from './ProfileTab'
import { uploadProfileImage } from '../../../services/UserService'
import { useCallback } from 'react'
import { useMutation, useQueryClient} from 'react-query'
import { toast } from 'react-toastify'

function Profile({auth}) {
  const key = ["loadMedecinInfo"];
  const queryClient = useQueryClient();
   const inputHidden = useRef(null)
   const handlePhoto = useCallback(() => {
     inputHidden.current.click()
   },[])
  
    const {mutate} = useMutation((fd) => uploadProfileImage(auth?._id,fd,'medecin'), {
      onSuccess(_) { 
        toast.success('Vos informations sont modifiées avec success');
        queryClient.invalidateQueries(key);
      },
    })
  
   const handleFile = useCallback((event) => {
     const file = event.target.files[0];
      const fd = new FormData();
     fd.set('profile',file,file.name);
     mutate(fd);
   },[mutate]);

    return (
        <>
          <div className="mx-6 my-4">
                    <div className="flex items-center h-40  bg-primary rounded-3xl">
                    <Badge 
                         anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                                        }}
                        overlap="circular"
                        badgeContent={<IconButton onClick={handlePhoto} aria-label="upload picture" component="span">
                        <PhotoCamera className="text-white" />
                      </IconButton>}
                      className="mx-6"
                    >
                     <img src={`//localhost:3100/uploads/${auth?.profile_image}`} alt="docteur" className="h-28 w-28 rounded-full" />
                    </Badge>
                    <input type="file" className="invisible" ref={inputHidden} onChange={handleFile}/>
                    <h1 className="text-lg md:text-3xl font-semibold my-5 mx-4 text-white">{auth?.name}</h1>
                    </div>
                    <ProfileTab auth={auth} />
        </div>
        </>
    )
}

export default Profile
