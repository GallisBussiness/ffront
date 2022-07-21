import Api from './Api';
export const createFacture = (data) => Api.post('/facturation',data).then(res => res.data.data)
export const getFacturesByMedecin = (id) => Api.get('/facturation/findByMedecin/' + id).then(res => res.data.data)

export const createOwnFacture = (data) => Api.post('/facturation/own',data).then(res => res.data.data)
export const getOwnFacturesByMedecin = (id) => Api.get('/facturation/findOwnByMedecin/' + id).then(res => res.data.data)
export const createAssurance = (data) => Api.post('/assurances/', data).then(res => res.data.data);

export const getAllAssurances = () => Api.get('/assurances').then(res => res.data.data);

export const getAssuredFactureByMedecin = (id) => Api.get('/facturation/findAssuredByMedecin/' + id).then(res => res.data.data);