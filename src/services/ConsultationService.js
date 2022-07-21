import Api from './Api';

export const createConsultation = (data) => Api.post('/consultations',data).then(res => res.data.data);

export const updateConsultation = (id,data) => Api.patch('/consultations/' + id ,data).then(res => res.data.data);

export const deleteConsultation = (id) => Api.delete('/consultations/' + id).then(res => res.data.data);

export const getConsultationByMedecin = (id) => Api.get('/consultations/findconsultationbymedecin/' + id).then(res => res.data.data);

export const getAllConsultations = () => Api.get('/consultations').then(res => res.data.data);
