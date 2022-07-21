import Api from './Api';

export const createPrescription = (data) => Api.post('/prescription',data).then(res => res.data.data)
export const getPrescriptionsByMedecin = (id) => Api.get('/prescription/findAllByOwner/Doctor/' + id).then(res => res.data.data)

export const createOwnPrescription = (data) => Api.post('/prescription/own',data).then(res => res.data.data)
export const getOwnPrescriptionsByMedecin = (id) => Api.get('/prescription/own/' + id).then(res => res.data.data)

export const createNote = (data) => Api.post('/prescription/note/',data).then(res => res.data.data);

export const findNoteByIdPatient = (id) => Api.get('/prescription/findnotebyidpatient/' + id).then(res => res.data.data);
export const findNoteByIdMedecin = (id) => Api.get('/prescription/findnotebyidmedecin/' + id).then(res => res.data.data);