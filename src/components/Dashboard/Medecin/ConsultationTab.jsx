import { useCallback, useState } from 'react';
import { useForm } from "react-hook-form";
import { createConsultation, deleteConsultation, getConsultationByMedecin,updateConsultation } from "../../../services/ConsultationService";
import { Grid, CircularProgress, Backdrop, IconButton} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ModalUpdateConsultation from '../../Modals/ModalUpdateConsultation'

function ConsultationTab({auth}) {
    const { register,handleSubmit, reset} = useForm();
    const { register:updatereg,handleSubmit:handleUpdate, reset:resetUpdate} = useForm();
    const key = ['loadConsulationInfo',auth?._id];
    const queryClient = useQueryClient();
    const [modalEditOpen,setModalEditOpen] = useState(false);
    const [consultationEdit,setConsultationEdit] = useState(null);
    const {data, isLoading} = useQuery(key,() =>  getConsultationByMedecin(auth._id), {
      staleTime: 50_000
    });

    const {mutate: del} = useMutation((id) => deleteConsultation(id), {
      onSuccess: (_) => {
        queryClient.invalidateQueries(key);
      }
    })
    
    const {mutate: add} = useMutation((data) => createConsultation(data), {
      onSuccess: (_) => {
        queryClient.invalidateQueries(key);
        reset();
      }
    })
    const {mutate: update,isLoading: isUpdating} = useMutation((data) => updateConsultation(consultationEdit._id,data), {
      onSuccess: (_) => {
        queryClient.invalidateQueries(key);
        setModalEditOpen(false)
        resetUpdate()
      }
    })

    const handleEdit = (raw) => {
      setConsultationEdit(raw);
      setModalEditOpen(true)
    };
    const handleModalClose = useCallback(() => {
      setModalEditOpen(false);
      setConsultationEdit(null);
    }, [])
    const onSubmit = (data) => {
      const consulatation = {title: data.title, price: +data.price, time: +data.time, doctorId: auth._id}
      add(consulatation);
    }

    const onUpdate = (data) => { 
      update(data);
    }
    const handleDelete = (id) => del(id);
    return (
        <div className="text-black">
          <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={isLoading || isUpdating}
>
  <CircularProgress color="inherit" />
</Backdrop>
       <ModalUpdateConsultation open={modalEditOpen}>
       <form onSubmit={handleUpdate(onUpdate)}
            className="my-12 rounded-3xl bg-gray-100 min-h-96 px-4 py-4"
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <div className="w-full">
                  <label htmlFor="acteUpdate" className="text-gray-800">
                    {" "}
                    Acte Médical
                    <input
                      type="text"
                      defaultValue={consultationEdit?.title}
                      {...updatereg('title')}
                      id="acteUpdate"
                      placeholder="Acte médical"
                      className="w-full px-4 py-2 rounded-lg 
                              bg-gray-50 mt-2 border focus:border-grey-500 
                              focus:bg-white focus:outline-none"
                    />
                  </label>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="w-full">
                  <label htmlFor="updatePrice" className="text-gray-800">
                    {" "}
                    Tarif (FCFA)
                    <input
                      type="number"
                      defaultValue={consultationEdit?.price}
                      {...updatereg('price')}
                      placeholder="tarif"
                      id="updatePrice"
                      className="w-full px-4 py-2 rounded-lg 
                              bg-gray-50 mt-2 border focus:border-grey-500 
                              focus:bg-white focus:outline-none"
                    />
                  </label>
                </div>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <div className="w-full">
                  <label htmlFor="updateTime"  className="text-gray-800">
                    {" "}
                    Durée en (minutes)
                    <input
                      type="number"
                      defaultValue={consultationEdit?.time}
                      {...updatereg('time')}
                      placeholder="durée"
                      id="updateTime"
                      className="w-full px-4 py-2 rounded-lg 
                              bg-gray-50 mt-2 border focus:border-grey-500 
                              focus:bg-white focus:outline-none"
                    />
                  </label>
                </div>
              </Grid>
            </Grid>
            <div className="flex justify-between">
               <button
                  className="bg-red-500 mt-8 mx-3 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none
                             focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleModalClose}
                >
                  Annuler
                </button>
                <button
                  className="bg-blue-500 mt-8 mx-3 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none
                             focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Modifier
                </button>
            </div>
          </form>

        
       </ModalUpdateConsultation>
         {data &&  <div> <form
            onSubmit={handleSubmit(onSubmit)}
            className="my-12 rounded-3xl bg-gray-100 min-h-96 px-4 py-4"
          >
            <Grid container spacing={4}>
              <Grid item xs={12} sm={3} md={3}>
                <div className="w-full">
                  <label htmlFor="acte" className="text-gray-800">
                    {" "}
                    Acte Médical
                    <input
                      type="text"
                      {...register("title")}
                      placeholder="Acte médical"
                      id="acte"
                      className="w-full px-4 py-2 rounded-lg 
                              bg-gray-50 mt-2 border focus:border-grey-500 
                              focus:bg-white focus:outline-none"
                    />
                  </label>
                </div>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <div className="w-full">
                  <label htmlFor="tarif" className="text-gray-800">
                    {" "}
                    Tarif (FCFA)
                    <input
                      type="number"
                      {...register("price")}
                      placeholder="tarif"
                      id="tarif"
                      className="w-full px-4 py-2 rounded-lg 
                              bg-gray-50 mt-2 border focus:border-grey-500 
                              focus:bg-white focus:outline-none"
                    />
                  </label>
                </div>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <div className="w-full">
                  <label htmlFor="duree" className="text-gray-800">
                    {" "}
                    Durée en (minutes)
                    <input
                      type="number"
                      {...register("time")}
                      placeholder="durée"
                      id="duree"
                      className="w-full px-4 py-2 rounded-lg 
                              bg-gray-50 mt-2 border focus:border-grey-500 
                              focus:bg-white focus:outline-none"
                    />
                  </label>
                </div>
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                <button
                  className="bg-primary mt-8 mx-3 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none
                             focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Ajouter
                </button>
              </Grid>
            </Grid>
          </form>
          <div className="flex flex-col">
  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Consultations
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tarifs (FCFA)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Temps (min)
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map(d => (
               <tr key={d?._id}>
              <td className="px-6 py-4 whitespace-nowrap">
               {d?.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {d?.price} FCFA
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
               {d?.time} min
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <IconButton aria-label="edit" onClick={() => handleEdit(d)}>
                   <EditIcon />
              </IconButton>
                <IconButton aria-label="delete" color="primary" onClick={() => handleDelete(d?._id)}>
                  <DeleteIcon />
                  </IconButton>
              </td>
            </tr>
            ))}
           
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
          </div>
          }
        </div>
    )
}

export default ConsultationTab
