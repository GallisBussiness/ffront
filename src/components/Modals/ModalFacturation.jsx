import { Modal } from "@mui/material"
import { parseISO } from "date-fns";
import { imagestore } from "../../helpers/constants";
import {BsCheck2Circle} from 'react-icons/bs'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width:'50%',
  transform: 'translate(-50%, -50%)',
};

function ModalFacturation({open,onClose,facture,close,auth}) {
  return (
    <>
    <Modal open={open} onClose={onClose}>
        <div className="rounded-lg min-w-2/3 min-h-1/2 bg-gray-50 px-5 py-8" style={style}>
        <div className="text-center text-primary font-bold text-lg">Facture N°10001</div>
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
            <div className="text-primary font-bold text-lg">{facture?.patient?.name}</div>
            <p className="text-primary text-sm">(+221) {facture?.patient?.phoneNumber}</p>
        </div>
        <div>
        <p className="text-primary text-sm">Dakar, Le  {parseISO(facture?.createdAt).toLocaleDateString()}</p>
        </div>
        
    </div>
    {facture?.consultations.map(c => (
    <div key={c._id} className="flex space-x-1 w-full">
        <div className="w-full px-4 py-3 bg-gray-200 rounded-3xl my-2">
             <div className="flex justify-between items-center">
            <div>
                <div className="text-primary font-bold text-lg">{c?.title?.toUpperCase()}</div>
               <p className="text-primary text-sm">{c?.time} minutes</p>
            </div>
            <p className="text-primary text-sm">{c?.price} FCFA</p>
        </div>
        
         </div>
    </div>
    )) }
    <div className="flex items-center space-x-2 my-2">
    <div className="text-primary font-bold text-lg">Total : <span className="text-primary text-lg">{facture?.total}</span> FCFA </div>
    {facture?.assurance && <div className="text-green-500 text-lg font-semibold px-2 py-1 rounded-3xl flex items-center justify-center bg-slate-200">Assuré <BsCheck2Circle className="h-5 w-5 text-green-500"/></div>}
    </div>
        </div>
    </Modal>
    </>
  )
}

export default ModalFacturation