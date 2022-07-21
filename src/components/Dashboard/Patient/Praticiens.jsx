import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { useState } from 'react';
import { useQuery } from 'react-query'
import { appointmentFindAllByPatient } from '../../../services/AppointementService';

function Praticiens({auth}) {

    const key = ["loadPatientAppointment",auth?._id];
    const {data} = useQuery(key,() => appointmentFindAllByPatient(auth?._id), {
        staleTime: 60_000,
        onSuccess:(_) => console.log(filterPraticien(_)),
    })

    const [layout, setLayout] = useState('grid');
     
    const filterPraticien = (d) => {
        const ids = [...new Set(d.map(item => item.doctorId))];
        return ids;
    }
    
    const renderListItem = (data) => {
        return (
            <div className="w-full">
         
            </div>
        );
    }

    const renderGridItem = (data) => {
        return (
            <div className="w-full md:w-1/3">
               
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
             <DataView value={data} layout={layout} header={header}
                        itemTemplate={itemTemplate} paginator rows={9} />
        </div>
    )
}

export default Praticiens
