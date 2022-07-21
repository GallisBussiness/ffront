import { useState } from 'react'
import { useQuery } from 'react-query';
import ModalPrescription from '../../Modals/ModalPrescription';
import { getPrescriptionsByMedecin } from '../../../services/PrescriptionService';
import { imagestore } from '../../../helpers/constants';
import { parseISO } from 'date-fns';
import { AiOutlinePlus } from 'react-icons/ai'
import ModalCreateOwnPrescription from '../../Modals/ModalCreateOwnPrescription';
import OwnPrescription from './Ownprescription';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';

function Prescription({auth}) {
  const [open, setOpen] = useState(false);
  const [openOwn, setOpenOwn] = useState(false)
  const [layout, setLayout] = useState('grid');
  const [currentPrescription, setCurrentPrescription] = useState(null);
  const handleOpen = (p) => {
    setCurrentPrescription(p);
     setOpen(true);
  }

  const handleOpenOwn = () => setOpenOwn(true);
  const handleCloseOwn = () => setOpenOwn(false);
  const handleClose = () => {
    setCurrentPrescription(null);
    setOpen(false);
  }
  const key = ["loadPrescriptionMedecin",auth?._id];
  const {data} = useQuery(key,() => getPrescriptionsByMedecin(auth?._id), {
    staleTime: 50_000,
  })

  const renderListItem = (p) => {
    return (
        <div className="w-full">
            <div className="rounded-3xl min-h-60 w-60 bg-gray-100 py-2 mx-2">
              <div className="flex flex-col justify-between items-center">
                  <div className="h-20">
                      <img src={`${imagestore}${p?.patient?.profile_image}`} className="rounded-full  border-2 border-solid border-primary h-16 w-16" alt="img" />
                  </div>
                  <div className="w-full px-4">
                      <div className="flex items-center">
                        <h1 className="text-sm text-primary">Nom :</h1>
                        <h1 className="text-sm text-primary">{p?.patient?.name}</h1>
                      </div>
                      <div className="flex items-center">
                        <h1 className="text-sm text-primary">Tel :</h1>
                        <h1 className="text-sm text-primary">(221) {p?.patient?.phoneNumber}</h1>
                      </div>
                      <div className="flex items-center">
                        <h1 className="text-sm text-primary">Date :</h1>
                        <h1 className="text-sm text-primary">{parseISO(p?.createdAt).toLocaleDateString()}</h1>
                      </div>
                      <div className="w-full mx-2 my-2">
                      <button onClick={ () => handleOpen(p)} className="w-full bg-primary text-white active:bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            Regarder les prescriptions
                        </button>
                      </div>
                  </div>
              </div>
                    </div>
        </div>
    );
}

const renderGridItem = (p) => {
    return (
        <div className="w-full md:w-1/3">
           <div  className="rounded-3xl min-h-60 w-60 bg-gray-100 py-2 mx-2">
              <div className="flex flex-col justify-between items-center">
                  <div className="h-20">
                      <img src={`${imagestore}${p?.patient?.profile_image}`} className="rounded-full  border-2 border-solid border-primary h-16 w-16" alt="img" />
                  </div>
                  <div className="w-full px-4">
                      <div className="flex items-center">
                        <h1 className="text-sm text-primary">Nom :</h1>
                        <h1 className="text-sm text-primary">{p?.patient?.name}</h1>
                      </div>
                      <div className="flex items-center">
                        <h1 className="text-sm text-primary">Tel :</h1>
                        <h1 className="text-sm text-primary">(221) {p?.patient?.phoneNumber}</h1>
                      </div>
                      <div className="flex items-center">
                        <h1 className="text-sm text-primary">Date :</h1>
                        <h1 className="text-sm text-primary">{parseISO(p?.createdAt).toLocaleDateString()}</h1>
                      </div>
                      <div className="w-full mx-2 my-2">
                      <button onClick={ () => handleOpen(p)} className="w-full bg-primary text-white active:bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                            Regarder les prescriptions
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
        <>
              <div className="mx-6 my-4">
                    <div className="flex items-center justify-between h-40  bg-primary rounded-3xl">
                      <div className="flex items-center space-x-2">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-28 w-28 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    <p className="text-bold text-5xl text-white">Prescriptions</p>
                      </div>
                    <button onClick={handleOpenOwn}
                   className="bg-white text-primary active:bg-primary font-bold text-xs px-6 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mx-6
                   mb-1 ease-linear transition-all duration-150" type="button">Nouvelle Prescription <AiOutlinePlus className="inline font-bold h-5 w-5" /></button>
                    </div>
                    <DataView value={data} layout={layout} header={header}
                        itemTemplate={itemTemplate} paginator rows={9} />
        </div> 
        <OwnPrescription auth={auth} />
        <ModalPrescription open={open} close={handleClose} prescription={currentPrescription} auth={auth} />
        <ModalCreateOwnPrescription open={openOwn} close={handleCloseOwn} auth={auth} />
        </>
    )
}

export default Prescription