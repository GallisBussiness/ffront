import { Divider, Paper } from '@mui/material'
import { BsFillJournalBookmarkFill } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { findNoteByIdPatient } from '../../../services/PrescriptionService';
import { useState } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { imagestore } from '../../../helpers/constants';
import { parseISO } from 'date-fns';


function HealthBook({auth}) {
  

    const [layout, setLayout] = useState('grid');

    const key = ["loadNote"];
    const { data } = useQuery(key,() => findNoteByIdPatient(auth?._id), {
        staleTime: 100_000,
    })
    const { register,handleSubmit }  = useForm()
    const update = () => {}

    const renderListItem = (p) => {
        return (
            <div className="w-full">
                <div className="rounded-3xl min-h-60 w-60 bg-gray-100 py-2 mx-2">
                  <div className="flex flex-col justify-between items-center">
                      <div className="h-20">
                          <img src={`${imagestore}${p?.doctor?.profile_image}`} className="rounded-full  border-2 border-solid border-primary h-16 w-16" alt="img" />
                      </div>
                      <div className="w-full px-4">
                          <div className="flex items-center">
                            <h1 className="text-sm text-primary">Nom :</h1>
                            <h1 className="text-sm text-primary">{p?.doctor?.name}</h1>
                          </div>
                          <div className="flex items-center">
                            <h1 className="text-sm text-primary">Spécialité :</h1>
                            <h1 className="text-sm text-primary">{p?.doctor?.speciality}</h1>
                          </div>
                          <div className="flex items-center">
                            <h1 className="text-sm text-primary">Tel :</h1>
                            <h1 className="text-sm text-primary">(221) {p?.doctor?.phoneNumber}</h1>
                          </div>
                          <div className="flex flex-col items-center space-y-2">
                            <h1 className="text-sm text-primary">Note :</h1>
                            <p className="text-lg font-semibold">{p?.content}</p>
                          </div>
                          <div className="flex items-center">
                            <h1 className="text-sm text-primary">Date :</h1>
                            <h1 className="text-sm text-primary">{parseISO(p?.createdAt).toLocaleDateString()}</h1>
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
                      <div className="h-20">
                          <img src={`${imagestore}${p?.doctor?.profile_image}`} className="rounded-full  border-2 border-solid border-primary h-16 w-16" alt="img" />
                      </div>
                      <div className="w-full px-4">
                          <div className="flex items-center">
                            <h1 className="text-sm text-primary">Nom :</h1>
                            <h1 className="text-sm text-primary">{p?.doctor?.name}</h1>
                          </div>
                          <div className="flex items-center">
                            <h1 className="text-sm text-primary">Spécialité :</h1>
                            <h1 className="text-sm text-primary">{p?.doctor?.speciality}</h1>
                          </div>
                          <div className="flex items-center">
                            <h1 className="text-sm text-primary">Tel :</h1>
                            <h1 className="text-sm text-primary">(221) {p?.doctor?.phoneNumber}</h1>
                          </div>
                          <div className="flex flex-col items-center space-y-2">
                            <h1 className="text-sm text-primary">Note :</h1>
                            <p className="text-lg font-semibold">{p?.content}</p>
                          </div>
                          <div className="flex items-center">
                            <h1 className="text-sm text-primary">Date :</h1>
                            <h1 className="text-sm text-primary">{parseISO(p?.createdAt).toLocaleDateString()}</h1>
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
    <div className="mx-6 my-4">
                    <div className="flex items-center h-40  bg-primary rounded-3xl">
                    <BsFillJournalBookmarkFill className="h-24 w-24 text-white" />
                    <p className="text-bold text-5xl text-white">Mon carnet de santé</p>
                    </div>
    <div className="my-3">
    <Paper className="p-4">
                        <div>
                        <h4 className="text-2xl font-medium leading-tight mt-0 mb-2 text-black">Mes Informations de Santé</h4>
                        </div>
                        <Divider />
                        <div className="w-full my-3">
                            <form onSubmit={handleSubmit(update)}>
                            <div className="flex items-center">
                            <div className="flex w-1/2 mx-2">
                                <div className="mb-3 xl:w-96">
                                    <label htmlFor="poids" className="form-label inline-block mb-2 text-gray-700">POIDS</label>
                                    <input
                                    type="number"
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
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                                    placeholder="poids"
                                    id="poids"
                                    defaultValue={auth?.poids}
                                    {...register('poids')}
                                    />
                                </div>
                                </div>
                                <div className="flex w-1/2 mx-2">
                                <div className="mb-3 xl:w-96">
                                    <label htmlFor="taille"  className="form-label inline-block mb-2 text-gray-700">TAILLE</label>
                                    <input
                                    type="number"
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
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                                    placeholder="taille"
                                    id="taille"
                                    defaultValue={auth?.taille}
                                    {...register('taille')}
                                    />
                                </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                            <div className="flex w-full mx-2">
                                <div className="mb-3 xl:w-96">
                                    <label htmlFor="gs" className="form-label inline-block mb-2 text-gray-700">Groupe Sanguin</label>
                                    <input
                                    type="text"
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
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
                                    placeholder="groupe sangin"
                                    id="gs"
                                    defaultValue={auth?.groupe_sangin}
                                    {...register('groupe_sangin')}
                                    />
                                </div>
                                </div>
                            </div>
                            <Divider />
                            <div className="flex justify-end mt-6 px-4">
                            <button type="submit" className="inline-block px-7 py-3 bg-primary text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">METTRE A JOUR</button>
                            </div>

                            </form>
                            
                        </div>
                        <div className="my-2 flex bg-primary text-white px-3 py-5 rounded-lg">
                           <h1 className="font-semibold text-2xl uppercase">Mes Notes médicales :</h1>
                        </div>
                        <DataView value={data} layout={layout} header={header}
                        itemTemplate={itemTemplate} paginator rows={9} />
                    </Paper>
    </div>
    </div>
  )
}

export default HealthBook