import { useState } from 'react'
import { useQuery } from 'react-query';
import { getOwnPrescriptionsByMedecin } from '../../../services/PrescriptionService';
import { parseISO } from 'date-fns';
import ModalCreateOwnPrescription from '../../Modals/ModalCreateOwnPrescription';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';

function OwnPrescription({auth}) {
  const [openOwn, setOpenOwn] = useState(false)
  const handleCloseOwn = () => setOpenOwn(false);
  const [layout, setLayout] = useState('grid');
  const key = ["loadOwnPrescriptionMedecin",auth?._id];
  const {data} = useQuery(key,() => getOwnPrescriptionsByMedecin(auth?._id), {
    staleTime: 50_000,
  })

  const renderListItem = (p) => {
    return (
        <div className="w-full">
             <div className="rounded-3xl min-h-60 w-60 bg-gray-100 py-2 mx-2">
              <div className="flex flex-col justify-between items-center">
                  <div className="w-full px-4">
                      <div className="flex items-center">
                        <h1 className="text-sm text-primary">Nom :</h1>
                        <h1 className="text-sm text-primary">{p?.name}</h1>
                      </div>
                      <div className="flex items-center">
                        <h1 className="text-sm text-primary">Tel :</h1>
                        <h1 className="text-sm text-primary">(221) {p?.phoneNumber}</h1>
                      </div>
                      <div className="flex items-center">
                        <h1 className="text-sm text-primary">Date :</h1>
                        <h1 className="text-sm text-primary">{parseISO(p?.createdAt).toLocaleDateString()}</h1>
                      </div>
                      <div className="w-full mx-2 my-2">
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
            <div className="rounded-3xl min-h-60 w-60 bg-gray-100 py-2 mx-2">
              <div className="flex flex-col justify-between items-center">
                  <div className="w-full px-4">
                      <div className="flex items-center">
                        <h1 className="text-sm text-primary">Nom :</h1>
                        <h1 className="text-sm text-primary">{p?.name}</h1>
                      </div>
                      <div className="flex items-center">
                        <h1 className="text-sm text-primary">Tel :</h1>
                        <h1 className="text-sm text-primary">(221) {p?.phoneNumber}</h1>
                      </div>
                      <div className="flex items-center">
                        <h1 className="text-sm text-primary">Date :</h1>
                        <h1 className="text-sm text-primary">{parseISO(p?.createdAt).toLocaleDateString()}</h1>
                      </div>
                      <div className="w-full mx-2 my-2">
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
                      <h1  className="text-6xl font-bold my-5 mx-4 text-gray-800">Autres Prescription</h1>
                      <DataView value={data} layout={layout} header={header}
                        itemTemplate={itemTemplate} paginator rows={9} />
        </div> 
        <ModalCreateOwnPrescription open={openOwn} close={handleCloseOwn} auth={auth} />
        </>
    )
}

export default OwnPrescription