import { Grid, Modal } from "@mui/material"
import { useForm } from "react-hook-form";
import {useMutation} from 'react-query'
import { toast, ToastContainer} from "react-toastify";
import {createEvent} from '../../../services/EventService'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
  
function CreateEvent({open, close,auth}) {

  const {handleSubmit,register} = useForm()
  const {mutate} = useMutation((data) => createEvent(data),
  {
    onSuccess(_) {
      toast.success('Evenemet crée !!!')
      close()
    },
    onError(_) {
      toast.error('Erreur !!!')
      close()
    }
  }
  )
   const OnSubmit = (data) => {
     const fd = new FormData();
     fd.append('title',data.title);
     fd.append('description',data.description);
     fd.append('medecinId',auth?._id);
     fd.append('startAt',new Date(data.startAt).toISOString());
     fd.append('endAt',new Date(data.endAt).toISOString());
     fd.append('image',data.image[0],data.image[0].filename);
     mutate(fd)
   }
  return (
    <>
     <Modal open={open} onBackdropClick={() => close()}>
       <div style={style}>
           <div className="w-2/3 min-h-96 rounded-3xl bg-gray-100 min-h-96 px-4 py-4">
            <div className="flex items-center jsutify-center mb-6 py-3">
               <h1 className="text-3xl font-bold"> Creation d'un événement</h1>
            </div>
            <form
            onSubmit={handleSubmit(OnSubmit)}
            className="my-6"
          >
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12}>
                <div className="w-full">
                  <label htmlFor="title" className="text-gray-800">
                    {" "}
                    Titre de l'événement
                    <input
                      type="text"
                      placeholder="Titre de l'événement"
                      id="title"
                      {...register('title',{required:true})}
                      className="w-full px-4 py-2 rounded-lg 
                              bg-gray-50 mt-2 border focus:border-grey-500 
                              focus:bg-white focus:outline-none"
                    />
                  </label>
                </div>
              </Grid>
              
              <Grid item xs={12} sm={12}>
                <div className="w-full">
                  <label htmlFor="description" className="text-gray-800">
                    {" "}
                    Description
                    <textarea
                      id="description"
                      {...register('description',{required:true})}
                      className="w-full px-4 py-2 rounded-lg 
                              bg-gray-50 mt-2 border focus:border-grey-500 
                              focus:bg-white focus:outline-none"
                    />
                  </label>
                </div>
              </Grid>
              <Grid item xs={12} sm={12}>
                <div className="w-full">
                  <label htmlFor="image" className="text-gray-800">
                    {" "}
                    Image
                    <input
                      type="file"
                    
                      placeholder="prendre une image"
                      id="image"
                      {...register('image',{required:true})}
                      className="w-full px-4 py-2 rounded-lg 
                              bg-gray-50 mt-2 border focus:border-grey-500 
                              focus:bg-white focus:outline-none"
                    />
                  </label>
                </div>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <div className="w-full">
                  <label htmlFor="startAt" className="text-gray-800">
                    {" "}
                   Debut 
                    <input
                      type="date"
                    
                      placeholder="Date de début de l'événement'"
                      id="startAt"
                      {...register('startAt',{required:true})}
                      className="w-full px-4 py-2 rounded-lg 
                              bg-gray-50 mt-2 border focus:border-grey-500 
                              focus:bg-white focus:outline-none"
                    />
                  </label>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className="w-full">
                  <label htmlFor="endAt" className="text-gray-800">
                    {" "}
                    Fin
                    <input
                      type="date"
                    
                      placeholder="Date de fin l'événement'"
                      id="endAt"
                      {...register('endAt',{required:true})}
                      className="w-full px-4 py-2 rounded-lg 
                              bg-gray-50 mt-2 border focus:border-grey-500 
                              focus:bg-white focus:outline-none"
                    />
                  </label>
                </div>
              </Grid>
            </Grid>
            <div className="flex items-center justify-end mx-3 my-6">
              <button
                className="bg-primary text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none
                         focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                CREER EVENEMENT
              </button>
            </div>
          </form>
           </div>
       </div>
     </Modal>
     <ToastContainer />
    </>
  )
}

export default CreateEvent