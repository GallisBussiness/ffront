import { Divider, Modal } from '@mui/material'
import {useRef,forwardRef} from 'react'
import { imagestore } from '../../helpers/constants';
import ReactToPrint from 'react-to-print';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width:'50%',
    transform: 'translate(-50%, -50%)',
  };

function ModalPrescription({open,close,prescription,auth}) {

    const componentRef = useRef()
    return (
        <>
             <Modal
        open={open}
      >
          <>
       <div className="rounded-lg min-w-2/3 max-h-screen overflow-y-scroll bg-gray-50 px-2 py-1" style={style}>
           <div className="flex flex-col">
            <div className="bg-gray-50 px-5 py-8">
            <div className="text-center text-primary font-bold text-lg">Prescription P-FRD-001</div>
           <div className="flex justify-between items-center">
               <div>
                   <div className="text-primary font-bold text-lg">{auth?.name}</div>
                   <p className="text-primary text-sm">{auth?.email}</p>
                   <p className="text-primary text-sm">(+221) {auth?.phoneNumber}</p>
               </div>
               <div>
                   <img src={`${imagestore}${auth?.profile_image}`} alt="doctor" className="w-28 h-28 rounded-full" />
               </div>

           </div>
           <div className="flex justify-between items-center mt-2 mb-10">
               <div>
                   <div className="text-primary font-bold text-lg">{prescription?.patient?.name}</div>
                   <p className="text-primary text-sm">(+221) {prescription?.patient?.phoneNumber}</p>
                   <p className="text-primary text-sm">27 ans</p>
               </div>
               <div>
               <p className="text-primary text-sm">Dakar, le {new Date().toLocaleDateString()}</p>
               </div>
               
           </div>
           {prescription?.prescriptions?.map((p,i) => (
               <div key={i} className="px-4 py-3 bg-gray-200 rounded-3xl my-2">
               <div className="flex justify-between items-center">
                   <div>
                       <div className="text-primary font-bold text-lg">{p.medicament}</div>
                   </div>
                   <p className="text-primary text-lg font-bold">{p.number} x Par {p.frequence}</p>
               </div>
           </div> 
           ))}
          
         
           <Divider />
            </div>
            <div>
            <div className="flex justify-end items-center py-2">
           <button onClick={() => close()} className=" bg-danger text-white active:bg-red-600 font-bold text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none
            focus:outline-none mx-6 mb-1 ease-linear transition-all 
            duration-150" type="button"> Fermer</button>
             <ReactToPrint
        trigger={() => <button className="bg-primary text-white active:bg-red-600
            font-bold text-xs px-4 py-2 rounded-full shadow hover:shadow-md 
            outline-none focus:outline-none mx-6 mb-1 ease-linear transition-all 
            duration-150" type="button"> Imprimer</button>}
        content={() => componentRef.current}
      />
            
          </div>
            </div>
           </div>   
       </div>
       <Printable auth={auth} prescription={prescription} ref={componentRef} />
       </>
      </Modal>
        </>
    )
}

export default ModalPrescription

const Printable = forwardRef((props, ref) => {
    const {auth,prescription} = props;
    return (
    <>
     <div ref={ref} className="px-4 border-y-4 border-solid border-y-primary h-screen bg-white hidden print:block">
            <div className="flex space-x-2 items-center">
            <div>
                 <img src={`${imagestore}${auth?.profile_image}`} alt="doctor" className="w-28 h-28 rounded-full" />
               </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">{auth?.name}</h1>
                <h1 className="text-lg font-bold">{auth?.adresse}</h1>
                <h1 className="text-lg font-bold">{auth?.email}</h1>
                <h1 className="text-lg font-bold">(+221) {auth?.phoneNumber}</h1>
              </div>
            </div>
            <div className="my-10 py-5 flex items-center justify-center border-2 border-solid border-black">
            <h1 className="text-3xl font-bold text-primary">ORDONNANCE</h1>
              </div>
              <div className="text-lg">
                imprimé le {new Date().toLocaleDateString()}
              </div>
              <div className="flex items-center justify-end p-2">
                <div className="flex flex-col space-y-1">
                <h1 className="text-lg font-bold">{prescription?.patient?.firstName} {prescription?.patient?.lastName}</h1>
                <h1 className="text-lg font-bold">@age</h1>
                <h1 className="text-lg font-bold">{prescription?.patient?.phoneNumber}</h1>
                </div>
                </div>
                {prescription?.prescriptions?.map((p,i) => (
               <div key={i} className="px-4 py-3 bg-gray-200 rounded-3xl my-2">
               <div className="flex justify-between items-center">
                   <div>
                       <div className="text-primary font-bold text-lg">{p.medicament}</div>
                   </div>
                   <p className="text-primary text-lg font-bold">{p.number} x Par {p.frequence}</p>
               </div>
           </div> 
           ))}
                <div className="p-2 text-center text-lg bg-primary font-semibold">
                      {auth?.name}, partenaire de Freedocteur, votre site de prise de rendez-vous médicaux en ligne <br/>
                      contact@freedocteur.com / 77 357 56 61
                </div>
        </div>
    </>
    );
});