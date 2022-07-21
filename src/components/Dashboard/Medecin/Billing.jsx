import { useState } from 'react'
import { getFacturesByMedecin } from '../../../services/FacturationService';
import { useQuery } from 'react-query';
import parseISO  from 'date-fns/parseISO';
import ModalFacturation from '../../Modals/ModalFacturation';
import {FaMoneyBillAlt} from 'react-icons/fa'
import { AiOutlinePlus } from 'react-icons/ai'
import ModalOwnBilling from '../../Modals/ModalOwnbilling';
import OwnBilling from './Ownbilling';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';

function Billing({auth}) {
    const [open, setOpen] = useState(false);
    const [openOwn,setOpenOwn] = useState(false);
    const [layout, setLayout] = useState('grid');
    const [currentFacture,setCurrentFacture] = useState(null);
const handleOpen = (facture) => {
   setCurrentFacture(facture);
   setOpen(true);
}

const createBill = () => setOpenOwn(true);
const closeOwn = () => setOpenOwn(false);
const close = () => setOpen(false)
const handleClose = () => setOpen(false);
const handleOwnClose = () => setOpenOwn(true)
   const key = ["loadFactueMedecin",auth?.id];
   const {data} = useQuery(key,() => getFacturesByMedecin(auth?._id), {
       staleTime: 50_000,
   })

   const renderListItem = (f) => {
    return (
        <div className="w-full">
         <div key={f?._id} className="bg-slate-200 rounded-3xl p-4">
                             <div className="flex justify-between items-center">
                                 <div>
                                     <p className="text-lg font-bold text-primary">
                                        Facture N°{f?.numero}
                                     </p>
                                     <p className="text-sm text-primary">
                                        {parseISO(f?.createdAt).toLocaleDateString()}
                                     </p>
                                     <p className="text-lg font-bold text-primary">
                                        A {f?.patient?.name}
                                     </p>
                                 </div>
                              <div>
                                 <button onClick={() => handleOpen(f)}  className="w-full bg-primary text-white active:bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                    VOIR
                        </button>
                                 </div>
                             </div>
                         </div>
        </div>
    );
}

const renderGridItem = (f) => {
    return (
        <div className="w-full md:w-1/3">
          <div key={f?._id} className="bg-slate-200 rounded-3xl p-4">
                             <div className="flex flex-col justify-between items-center">
                                 <div>
                                     <p className="text-lg font-bold text-primary">
                                        Facture N°{f?.numero}
                                     </p>
                                     <p className="text-sm text-primary">
                                        {parseISO(f?.createdAt).toLocaleDateString()}
                                     </p>
                                     <p className="text-lg font-bold text-primary">
                                        A {f?.patient?.name}
                                     </p>
                                 </div>
                                 <div>
                                 <button onClick={() => handleOpen(f)}  className="w-full bg-primary text-white active:bg-lightBlue-600 font-bold text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                    VOIR
                                </button>
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
                    <div className="flex items-center h-40 p-4 justify-between  bg-primary rounded-3xl">
                    <div className="flex items-center space-x-4">
                       <FaMoneyBillAlt className="h-28 w-28 text-white" />
                     <p className="text-bold text-5xl text-white">Facturations</p>
                    </div>
                     <button onClick={createBill}
              className="bg-white text-primary active:bg-primary font-bold text-xs px-6 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mx-6
          mb-1 ease-linear transition-all duration-150" type="button">Nouvelle Facture <AiOutlinePlus className="inline font-bold h-5 w-5" /></button>
                    </div>
                    <DataView value={data} layout={layout} header={header}
                        itemTemplate={itemTemplate} paginator rows={9} />
        </div>
        <OwnBilling auth={auth} />
        <ModalOwnBilling open={openOwn} onClose={handleOwnClose} close={closeOwn} auth={auth} />
        <ModalFacturation open={open} onClose={handleClose} close={close} facture={currentFacture} auth={auth} />
        </>
    )
}

export default Billing