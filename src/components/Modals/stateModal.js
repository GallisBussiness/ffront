import create from 'zustand'

export const useStore = create((set) => ({

    
    isSelectedActe: false,
    selectActe: v => set(state => ({...state,isSelectedActe: v })),

}));


export const useAppointmentStore = create((set) => ({
    date:null,
    startTime:null,
    endTime:null,
    type:'PHYSICAL',
    doctorId:'',
    title:'',
    patient: {
      patientId:'',
      name:'',
      owner:'ME',
  },
  setProp: (name,value) => set(state => ({...state,[name]: value})),
  setPatientProp: (name,value) => set(state => ({...state,patient: {...state.patient,[name]:value}}))
}));


