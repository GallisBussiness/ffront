import { useState } from 'react'
import { getOwnFacturesByMedecin } from '../../../services/FacturationService';
import { useQuery } from 'react-query';
import parseISO  from 'date-fns/parseISO';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';


function OwnBilling({auth}) {
   const key = ["loadOwnFactueMedecin",auth?.id];
   const [layout, setLayout] = useState('grid');
   const {data} = useQuery(key,() => getOwnFacturesByMedecin(auth?._id), {
       staleTime: 50_000,
   })

   const renderListItem = (f) => {
    return (
        <div className="w-full">
         <div className="bg-white rounded-3xl p-4 w-1/4">
                             <div className="flex justify-between items-center">
                                 <div>
                                     <p className="text-lg font-bold text-primary">
                                        Facture N° {f?._id}
                                     </p>
                                     <p className="text-sm text-primary">
                                        {parseISO(f?.createdAt).toLocaleDateString()}
                                     </p>
                                     <p className="text-lg font-bold text-primary">
                                        A {f?.prenom} {f?.nom}
                                     </p>
                                 </div>
                                 <div>
                                 </div>
                             </div>
                         </div>
        </div>
    );
}

const renderGridItem = (f) => {
    return (
        <div className="w-full md:w-1/3">
           <div key={f?._id} className="bg-white rounded-3xl p-4 w-1/4">
                             <div className="flex justify-between items-center">
                                 <div>
                                     <p className="text-lg font-bold text-primary">
                                        Facture N° 
                                     </p>
                                     <p className="text-sm text-primary">
                                        {parseISO(f?.createdAt).toLocaleDateString()}
                                     </p>
                                     <p className="text-lg font-bold text-primary">
                                        A {f?.name}
                                     </p>
                                 </div>
                                 <div>
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
                      <h1 className="text-6xl font-bold my-5 mx-4 text-gray-800">Autres Factures</h1>
                      <DataView value={data} layout={layout} header={header}
                        itemTemplate={itemTemplate} paginator rows={9} />
        </div>
        </>
    )
}

export default OwnBilling