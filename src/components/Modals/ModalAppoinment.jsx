import Modal from '@mui/material/Modal';
import {useEffect, useState} from 'react';
import { useCallback } from 'react';
import Step2 from '../Appointment/Step2';
import Step3 from '../Appointment/Step3';
import { useIsAuthenticated } from 'react-auth-kit'
import ModalAuth from './ModalAuth'
import { Button, FormControlLabel, Switch } from '@mui/material';
import { createappointment } from '../../services/AppointementService';
import { useMutation } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import { useAppointmentStore, useStore } from './stateModal';
import shallow from 'zustand/shallow';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export default function ModalAppoinment({open,onClose,close,medecinID}) {
  
  const { isSelectedActe } = useStore(state => ({ isSelectedActe: state.isSelectedActe}))
  const {setProp,setPatientProp,
    date,
    startTime,
    endTime,
    type,
    doctorId,
    title,
    patient
  } = useAppointmentStore(state => ({
    setProp: state.setProp,setPatientProp: state.setPatientProp,
    date: state.date,
    startTime: state.startTime,
    endTime: state.endTime,
    type: state.type,
    doctorId: state.doctorId,
    title: state.title,
    patient: state.patient
  }),shallow);

  const [modalOpenAuth,setOpenModalAuth] = useState(false)
  const [forUnother,setForUnother] = useState(false)

  const handleModalClose = useCallback(() => close(),[close])
  const hasAuth = useIsAuthenticated()()


  const {mutate} = useMutation((data) => createappointment(data), {
    onSuccess(_) {
      toast.success('Rendez-vous créé avec success')
      close()
    },
    onError(_) {
      toast.error('Erreur !! Rendez-vous échoué !!')
      close()
    }
  })


  const handleClose = () => {
    setOpenModalAuth(false);
  }

  const handleUnother = (e) => {
    if(e.target.checked === true) {
      setPatientProp('owner','ANOTHER');
    }
    else {
      setPatientProp('owner','ME');
    }
    setForUnother(e.target.checked)
  }


  const handleName = (e) => setPatientProp('name', e.target.value);

  const handleSave = () => {
      const data = {date,
        startTime,
        endTime,
        type,
        doctorId,
        title,
        patient};
      if(patient.patientId === '') {
      toast.error("vous n'êtes pas authentifié !!!")
      setOpenModalAuth(true);
      }
      else {
        mutate(data); 
      }
     
  }

  const handleBDClose = () => setOpenModalAuth(false);

  useEffect( () => {
    setProp('doctorId',medecinID);
     if(!hasAuth) setOpenModalAuth(true);
  } ,[hasAuth,setProp,medecinID])

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
      >
       <div className="flex flex-col justify-between rounded-3xl w-1/3 min-h-1/2 bg-gray-50 px-5 py-8" style={style}>
         <div className="h-full">
         <h5 className="text-xl font-medium leading-tight mt-0 mb-2 text-primary">Motif du rendez-vous :</h5>
         <h6 className="text-base font-medium leading-tight mt-0 mb-2">Date du : {date?.toLocaleString()}</h6>
            <Step3 />
            <Step2 medecinId={medecinID} />
            <div className="px-3 py-2">
            <FormControlLabel onChange={handleUnother} control={<Switch />} label="POUR UN AUTRE" />
            {forUnother &&   <div className="px-2 py-2">
          <div className="w-full">
                  <label htmlFor="name" className="text-gray-800">
                    {" "}
                    Nom Complet*
                    <input
                      type="text"
                      placeholder="Votre nom complet*"
                      id="name"
                      onChange={handleName}
                      className="w-full px-4 py-2 rounded-lg 
                              bg-gray-50 mt-2 border focus:border-grey-500 
                              focus:bg-white focus:outline-none"
                    />
                  </label>
                </div>
          </div>}
            </div>
         </div>
        
         <div className="flex justify-between">
            <button type="button"
     onClick={handleModalClose}
     className="inline-block px-6 py-2.5 bg-red-600
      text-white font-medium text-xs leading-tight
       uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg
        focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0
         active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">annuler</button>
         <Button 
         onClick={handleSave}
         disabled={!isSelectedActe}
         variant="contained"
         color="primary"
    >Sauvegarder</Button>
         </div>
         <ModalAuth open={modalOpenAuth} onClose={handleBDClose} close={handleClose} />
       </div>
      </Modal>
      <ToastContainer />
    </div>
  );
}
