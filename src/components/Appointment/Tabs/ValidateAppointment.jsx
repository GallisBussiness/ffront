import { Backdrop, CircularProgress } from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import { appointmentChangeState, appointmentFindAllByDoctor } from "../../../services/AppointementService";
import ModalBilling from "../../Modals/ModalBilling";
import ModalCreatePrescription from "../../Modals/ModalCreatePrescription";
import ModalCreateNote from "../../Modals/ModalCreateNote";
import shallow from 'zustand/shallow';
import { useTabStore } from "../tabStore";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";


function ValidateAppointment({auth}) {
    const qc = useQueryClient()

    const [factApp,setFacApp] = useState(null)
    const [openCreateNote,setOpenCreateNote] = useState(false)
    const [openBilling,setOpenBilling] = useState(false)
    const [openPrescription,setOpenPrescription] = useState(false)
    const [layout, setLayout] = useState('grid');

    const { accept } = useTabStore( state => ({accept: state.accept}),shallow)

    const facturer = (a) => {
      setFacApp(a)
      setOpenBilling(true)
    }

    const prescrire = (a) => {
      setFacApp(a)
      setOpenPrescription(true)
    }

    const createNote = (a) => {
      setFacApp(a)
      setOpenCreateNote(true);
    }

    const close = () => {
      setOpenBilling(false);
    }

    const onCloseCreateNote = () => {
      setOpenCreateNote(false);
    }

    const closePrescription = () => {
      setOpenPrescription(false);
    }

    const key  = ["loadValidateAppointementsByDoctor"];

  const {data, isLoading} = useQuery(key,() => appointmentFindAllByDoctor(auth?._id,'CONFIRMED'),{
    staleTime: 50_000,
    onSuccess(_) {
     accept(_.length);
    }
  })
  
  const {mutate,isLoading:isUpdating} = useMutation((data) => appointmentChangeState(data), {
    onSuccess(_) {
      qc.invalidateQueries(key)
      toast.success("Rendez-vous validé !!!");
    },
    onError(_) {
      toast.error("Rendez-vous non validé ");
    }
  })


  const handleRejected = (id) => {
    mutate({id,state:'CANCELLED'});
  }

  const renderListItem = (a) => {
    return (
        <div className="w-full">
              <div className="rounded-3xl space-y-2 min-h-60 w-60 bg-white py-2 mx-2">
              <div className="flex items-center justify-center">
                          <img src={`//localhost:3100/uploads/${a?.patient?.user?.profile_image}`} className="h-20 w-20 rounded-full object-cover" alt="image_profile" />
                        </div>
              <div className="flex flex-col  items-center">
                  <div className="w-full space-y-2 px-4">
                      <div className="flex items-center">
                        <h1 className="text-sm font-semibold text-primary">Nom :</h1>
                        <h1 className="text-sm font-semibold text-primary">
                          {a.patient.owner === 'ME' ? a.patient?.user?.name :
                           a.patient?.name}</h1>
                      </div>
                      {a?.patient?.user?.phoneNumber && <div className="flex items-center">
                        <h1 className="text-sm font-semibold text-primary">Tel : </h1>
                        <h1 className="text-sm font-semibold text-primary">{a?.patient?.user?.phoneNumber}</h1>
                      </div>}
                      <div className="flex items-center">
                        <h1 className="text-sm font-semibold text-primary">Date :</h1>
                        <h1 className="text-sm font-semibold text-primary">{format(new Date(a?.date), 'dd/MM/yyyy')}</h1>
                      </div>
                      <div className="flex items-center">
                        <h1 className="text-sm font-semibold text-primary">Soin :</h1>
                        <h1 className="text-sm font-semibold text-primary">{a.title}</h1>
                      </div>
                      <div className="w-full mx-2 my-2">
                      <button onClick={() => facturer(a)} className="w-full bg-primary text-white active:bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            FACTURATION
                        </button>
                        <button onClick={() => prescrire(a)} className="w-full bg-primary text-white active:bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            PRESCRIPTION
                        </button>
                        <button onClick={() => createNote(a)}className="w-full bg-primary text-white active:bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            AJOUTER UNE NOTE
                        </button>
                        <button onClick={() => handleRejected(a._id)} className="bg-danger w-full text-white active:bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            REJETER
                        </button>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    );
}

const renderGridItem = (a) => {
    return (
        <div className="w-full md:w-1/3">
           <div className="rounded-3xl space-y-2 min-h-60 w-60 bg-white py-2 mx-2">
              <div className="flex items-center justify-center">
                          <img src={`//localhost:3100/uploads/${a?.patient?.user?.profile_image}`} className="h-20 w-20 rounded-full object-cover" alt="image_profile" />
                        </div>
              <div className="flex flex-col  items-center">
                  <div className="w-full space-y-2 px-4">
                      <div className="flex items-center">
                        <h1 className="text-sm font-semibold text-primary">Nom :</h1>
                        <h1 className="text-sm font-semibold text-primary">
                          {a.patient.owner === 'ME' ? a.patient?.user?.name :
                           a.patient?.name}</h1>
                      </div>
                      {a?.patient?.user?.phoneNumber && <div className="flex items-center">
                        <h1 className="text-sm font-semibold text-primary">Tel : </h1>
                        <h1 className="text-sm font-semibold text-primary">{a?.patient?.user?.phoneNumber}</h1>
                      </div>}
                      <div className="flex items-center">
                        <h1 className="text-sm font-semibold text-primary">Date :</h1>
                        <h1 className="text-sm font-semibold text-primary">{format(new Date(a?.date), 'dd/MM/yyyy')}</h1>
                      </div>
                      <div className="flex items-center">
                        <h1 className="text-sm font-semibold text-primary">Soin :</h1>
                        <h1 className="text-sm font-semibold text-primary">{a.title}</h1>
                      </div>
                      <div className="w-full mx-2 my-2">
                      <button onClick={() => facturer(a)} className="w-full bg-primary text-white active:bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            FACTURATION
                        </button>
                        <button onClick={() => prescrire(a)} className="w-full bg-primary text-white active:bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            PRESCRIPTION
                        </button>
                        <button onClick={() => createNote(a)}className="w-full bg-primary text-white active:bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            AJOUTER UNE NOTE
                        </button>
                        <button onClick={() => handleRejected(a._id)} className="bg-danger w-full text-white active:bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            REJETER
                        </button>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    );
}


  const itemTemplate = (appointment, layout) => {
    if (!appointment) {
        return;
    }

    if (layout === 'list')
        return renderListItem(appointment);
    else if (layout === 'grid')
        return renderGridItem(appointment);
}

const renderHeader = () => {
    return (
        <div className="grid grid-nogutter">
            <div className="col-6" style={{textAlign: 'right'}}>
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        </div>
    );
}
  const header = renderHeader();

  return (
    <div>
           <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={isLoading || isUpdating}
  >
    <CircularProgress color="inherit" />
    </Backdrop>
          <div className="">
          <DataView value={data} layout={layout} header={header}
                        itemTemplate={itemTemplate} paginator rows={9} />
        </div>  
        <ToastContainer />
        <ModalCreateNote open={openCreateNote} onClose={onCloseCreateNote} appointment={factApp} auth={auth}   />
        <ModalBilling open={openBilling} close={close} appointment={factApp} auth={auth} />
        <ModalCreatePrescription open={openPrescription} close={closePrescription} appointment={factApp} auth={auth} />
    </div>
  )
}

export default ValidateAppointment