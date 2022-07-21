import { Backdrop, CircularProgress } from '@mui/material';
import { format } from 'date-fns';
import {useQuery} from 'react-query';
import { ToastContainer } from 'react-toastify';
import { appointmentFindAllByPatient } from '../../../services/AppointementService';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { useState } from 'react';

const getState = (state) =>  {
    switch (state) {
        case 'PENDING':
            return {classe: 'bg-yellow-600', name:'En attente'}
        case 'CONFIRMED':
            return {classe: 'bg-green-600', name:'Confirmé'}
        case 'CANCELLED':
            return {classe: 'bg-red-600', name:'Refusé'}
        case 'PASTE':
            return {classe: 'bg-gray-600', name:'Passé'}
        default:
            return '';
    }
}
function RendezVous({auth}) {
    
    const [layout, setLayout] = useState('grid');

    const classState = (state) => {
        const {classe} = getState(state);
        return `${classe} inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white rounded-lg`
    }
    const nameState = (state) =>  {
        const {name} = getState(state);
        return name;
    }
    const key = ["loadPatientAppointment",auth?._id];
    const {data, isLoading} = useQuery(key,() => appointmentFindAllByPatient(auth?._id), {
        staleTime: 60_000,
    })

 
    const renderListItem = (data) => {
        return (
            <div className="w-full">
                 <div className="flex flex-col items-center pb-10">
            <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src={`//localhost:3100/uploads/${data?.medecin?.profile_image}`} alt="profile" />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data?.medecin?.name}</h5>
        <span className="text-lg fint-medium text-gray-500 dark:text-gray-400">Spécialité : {data?.medecin?.speciality}</span>
        <span className="text-lg fint-medium text-gray-500 dark:text-gray-400">Date : {format(new Date(data?.date), 'dd-MM-yyyy')}</span>
        <span className="text-lg fint-medium text-gray-500 dark:text-gray-400">Heure : {format(new Date(data?.date), 'H:m:s')}</span>
        <span className="text-lg fint-medium text-gray-500 dark:text-gray-400">Adresse : {data?.medecin?.adresse}</span>
        <span className="text-lg fint-medium text-gray-500 dark:text-gray-400">Motif : {data?.title}</span>
        <div className="flex mt-4 space-x-3 lg:mt-6">
            <span className={classState(data?.state)}>{nameState(data?.state)}</span>
        </div>
    </div>
            </div>
        );
    }

    const renderGridItem = (data) => {
        return (
            <div className="w-full md:w-1/3">
                <div className="flex flex-col items-center pb-10">
            <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src={`//localhost:3100/uploads/${data?.medecin?.profile_image}`} alt="profile" />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data?.medecin?.name}</h5>
        <span className="text-lg fint-medium text-gray-500 dark:text-gray-400">Spécialité : {data?.medecin?.speciality}</span>
        <span className="text-lg fint-medium text-gray-500 dark:text-gray-400">Date : {format(new Date(data?.date), 'dd-MM-yyyy')}</span>
        <span className="text-lg fint-medium text-gray-500 dark:text-gray-400">Heure : {format(new Date(data?.date), 'H:m:s')}</span>
        <span className="text-lg fint-medium text-gray-500 dark:text-gray-400">Adresse : {data?.medecin?.adresse}</span>
        <span className="text-lg fint-medium text-gray-500 dark:text-gray-400">Motif : {data?.title}</span>
        <div className="flex mt-4 space-x-3 lg:mt-6">
            <span className={classState(data?.state)}>{nameState(data?.state)}</span>
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
    open={isLoading}
  >
    <CircularProgress color="inherit" />
    </Backdrop>
    <div className="mx-6 my-4 min-h-screen">
                    <div className="flex items-center h-40  bg-primary rounded-3xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-28 w-28 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <p className="text-bold text-5xl text-white">Mes Rendez-vous</p>
                    </div>
                    <div className="my-3 min-h-96 px-4 card">
                    <DataView value={data} layout={layout} header={header}
                        itemTemplate={itemTemplate} paginator rows={9} />
                    </div>
        </div>    
          
        <ToastContainer />
    </div>
    )
}

export default RendezVous
