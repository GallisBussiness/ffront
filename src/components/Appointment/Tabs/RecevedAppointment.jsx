import { Backdrop, CircularProgress } from "@mui/material";
import { format } from "date-fns";
import { useState,useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast, ToastContainer } from "react-toastify";
import { appointmentChangeState, appointmentFindAllByDoctor } from "../../../services/AppointementService";
import { motion } from 'framer-motion'
import { useTabStore } from "../tabStore";
import shallow from 'zustand/shallow';
import { DataView, DataViewLayoutOptions } from "primereact/dataview";

const variants = {
  init: {x: -1000,opacity: 0},
  anime: {x: 0,opacity: 1, transition: {
    delay: 0.3
  }}
}

function RecevedAppointment({auth}) {
const [search,setSearch] = useState('')
const [filteredData,setFilteredData] = useState([]);
const [layout, setLayout] = useState('grid');
const {receve } = useTabStore( state => ({receve: state.receve}),shallow)
  const qc = useQueryClient()
    const key  = ["loadRecevedAppointementsByDoctor"];

  const {data, isLoading} = useQuery(key,() => appointmentFindAllByDoctor(auth?._id,'PENDING'),{
    staleTime: 50_000,
    onSuccess(_) {
      setFilteredData(_ || qc.getQueriesData(key) || []);
      receve(_.length);
    }
  })

  useEffect(() => {
    if(data) setFilteredData(data);
  },[data])
  

  const {mutate,isLoading:isUpdating} = useMutation((data) => appointmentChangeState(data), {
    onSuccess(_) {
      qc.invalidateQueries(key)
      toast.success("Rendez-vous validé !!!");
    },
    onError(_) {
      toast.error("Rendez-vous non validé ");
    }
  })


  const searching = (e) => {
    const value = e.target.value;
    setSearch(value)
    if(value !== '') {
    const d = data?.filter(dt => dt?.patient?.user?.firstName.toLowerCase() === value.toLowerCase())
    setFilteredData(d);
    }
    else {
      setFilteredData(data);
    }
   
  }
  const handleValidate = (id) => {
    mutate({id,state:'CONFIRMED'});
  }
  const handleCanceled = (id) => {
    mutate({id,state:'CANCELLED'});
  }

  const renderListItem = (a) => {
    return (
        <div className="w-full">
             <motion.div variants={variants} animate="anime" initial="init" className="rounded-3xl my-2 min-h-60 w-60 bg-white py-2 mx-2">
              <div className="flex items-center space-y-2 justify-center">
                          <img src={`//localhost:3100/uploads/${a?.patient?.user?.profile_image}`} className="h-20 w-20 rounded-full object-cover" alt="image_profile" />
                        </div>
              <div className="flex flex-col  items-center">
                  <div className="w-full space-y-2 px-4">
                      <div className="flex items-center justify-around">
                        <h1 className="text-sm font-semibold text-primary">Nom :</h1>
                        <h1 className="text-sm font-semibold text-primary">
                          {a.patient.owner === 'ME' ? a.patient?.user?.name :
                           a.patient?.name }</h1>
                      </div>
                      {a?.patient?.user?.phoneNumber && <div className="flex items-center justify-around">
                        <h1 className="text-sm font-semibold text-primary">Tel : </h1>
                        <h1 className="text-sm font-semibold text-primary">{a?.patient?.user?.phoneNumber}</h1>
                      </div>}
                      <div className="flex items-center justify-around">
                        <h1 className="text-sm font-semibold text-primary">Date :</h1>
                        <h1 className="text-sm font-semibold text-primary">{format(new Date(a?.date), 'dd/MM/yyyy')}</h1>
                      </div>
                      <div className="flex items-center justify-around">
                        <h1 className="text-sm font-semibold text-primary">Soin :</h1>
                        <h1 className="text-sm font-semibold text-primary">{a.title}</h1>
                      </div>
                      <div className="w-full mx-2 my-2">
                      <button onClick={() => handleValidate(a._id)} className="bg-success w-full text-white active:bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            VALIDER
                        </button>
                       
                      <button className="w-full bg-primary text-white active:bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            REPROGRAMMER
                        </button>
                        <button onClick={() => handleCanceled(a._id)} className="bg-danger w-full text-white active:bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            REJETER
                        </button>
                      </div>
                  </div>
              </div>
          </motion.div>
        </div>
    );
}

const renderGridItem = (a) => {
    return (
        <div className="w-full md:w-1/3">
           <motion.div variants={variants} animate="anime" initial="init"  className="rounded-3xl my-2 min-h-60 w-60 bg-white py-2 mx-2">
              <div className="flex items-center space-y-2 justify-center">
                          <img src={`//localhost:3100/uploads/${a?.patient?.user?.profile_image}`} className="h-20 w-20 rounded-full object-cover" alt="image_profile" />
                        </div>
              <div className="flex flex-col  items-center">
                  <div className="w-full space-y-2 px-4">
                      <div className="flex items-center justify-around">
                        <h1 className="text-sm font-semibold text-primary">Nom :</h1>
                        <h1 className="text-sm font-semibold text-primary">
                          {a.patient.owner === 'ME' ? a.patient?.user?.name :
                           a.patient?.name }</h1>
                      </div>
                      {a?.patient?.user?.phoneNumber && <div className="flex items-center justify-around">
                        <h1 className="text-sm font-semibold text-primary">Tel : </h1>
                        <h1 className="text-sm font-semibold text-primary">{a?.patient?.user?.phoneNumber}</h1>
                      </div>}
                      <div className="flex items-center justify-around">
                        <h1 className="text-sm font-semibold text-primary">Date :</h1>
                        <h1 className="text-sm font-semibold text-primary">{format(new Date(a?.date), 'dd/MM/yyyy')}</h1>
                      </div>
                      <div className="flex items-center justify-around">
                        <h1 className="text-sm font-semibold text-primary">Soin :</h1>
                        <h1 className="text-sm font-semibold text-primary">{a.title}</h1>
                      </div>
                      <div className="w-full mx-2 my-2">
                      <button onClick={() => handleValidate(a._id)} className="bg-success w-full text-white active:bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            VALIDER
                        </button>
                       
                      <button className="w-full bg-primary text-white active:bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            REPROGRAMMER
                        </button>
                        <button onClick={() => handleCanceled(a._id)} className="bg-danger w-full text-white active:bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            REJETER
                        </button>
                      </div>
                  </div>
              </div>
          </motion.div>
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
    <div className="flex">
  <div className="mb-3 xl:w-96">
    <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
      <input type="search" value={search} onChange={searching} className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none" placeholder="Rechercher par nom ..." aria-label="Search" aria-describedby="button-addon2" />
    </div>
  </div>
</div>
          <div className="">
          <DataView value={filteredData} layout={layout} header={header}
                        itemTemplate={itemTemplate} paginator rows={9} />
        </div>  
        <ToastContainer />
    </div>
  )
}

export default RecevedAppointment