import { FormControlLabel, Modal, Switch } from "@mui/material"
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { CircleSpinner } from "react-spinners-kit";
import { toast, ToastContainer } from "react-toastify";
import { createNote } from "../../services/PrescriptionService";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width:'50%',
    transform: 'translate(-50%, -50%)',
  };


const ModalCreateNote = ({open,onClose,appointment,auth}) => {

    const { register,handleSubmit } = useForm();

    const {mutate, isLoading} = useMutation((data) => createNote(data),{
        onSuccess(_) {
          toast.success('Note médicale créée !!')
          onClose()
        },
        onError(_){
          toast.error('Error !!!')
        }
      })

    const saveNote = (data) => {
       const form = {...data,patientId: appointment?.patient?.patientId,doctorId: auth?._id};
       mutate(form);
      }
  return (
    <>
           <Modal
        open={open}
        onClose={onClose}
        onBackdropClick={onClose}
      >
        <div className="rounded-lg min-w-2/3 min-h-1/2 bg-gray-50 px-5 py-8" style={style}>
        <div className="text-center text-primary font-bold text-3xl my-3">Nouveau note médicale</div>
       <form onSubmit={handleSubmit(saveNote)} className="py-2">
       <div className="flex flex-col w-full space-y-2">
     <div className="mb-3 w-full">
    <label htmlFor="content" className="form-label inline-block mb-2 text-gray-700"
      >Ecrire une note médicale</label>
    <textarea
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
        focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none
      "
      id="content"
      rows="3"
      placeholder="écrivez une note "
      {...register('content',{ required:true })}
    ></textarea>
  </div>
  <FormControlLabel {...register('isPublic')} control={<Switch defaultChecked />} label="Note public" />
</div>
<div className="flex items-center justify-end my-2">
                <button
         className="bg-primary text-white active:bg-primary font-bold text-xs px-6 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mx-6
          mb-1 ease-linear transition-all duration-150" type="submit">
               { isLoading ? <CircleSpinner size={20} className="text-white inline" loading={true} /> : "ENREGISTER LA NOTE" }
              </button>
</div>
       
           </form>
       </div>
      </Modal>
      <ToastContainer />
    </>
  )
}

export default ModalCreateNote