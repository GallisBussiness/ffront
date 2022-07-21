import Api from './Api';
export const registerPatient = (data) => Api.post('/patient', data).then(res => res.data.data);
export const registerPatientByGoogle = (data) => Api.post('/patient/auth/google', data).then(res => res.data.data);

export const login = (data) => Api.post('/user/login', data).then(res => res.data.data);
export const updatePassword = (data) => Api.post('/user/update_password', data).then(res => res.data.data);

export const registerMedecin = (data) => Api.post('/medecin', data).then(res => res.data.data);

export const getAllMedecins = () => Api.get('/medecin');

export const validateUser = (data) => Api.post('/user/validate', data).then(res => res.data.data);

export const uploadProfileImage = (id,fd,tag) => Api.post(`/${tag}/upload/image/${id}`, fd).then(res => res.data.data);

export const updateMedecin = (id,data) => Api.patch('/medecin/' + id, data).then(res => res.data);
export const updatePatient = (id,data) => Api.patch('/patient/' + id, data).then(res => res.data);

export const getMedecin = (id) => Api.get('/medecin/' + id).then(res => res.data.data);

export const getPatient = (id) => Api.get('/patient/' + id).then(res => res.data.data);

export const getMedecinBySpeciality = (spec) => Api.get('/medecin/searchbyspeciality/' + spec).then(res => res.data);

export const createOwnPatient = (data) => Api.post('/ownpatient/', data).then(res => res.data.data)
export const deleteOwnPatient = (id) => Api.delete('/ownpatient/' + id).then(res => res.data.data);
export const getOwnPatients = (id) => Api.get('/ownpatient/findByMedecin/' + id).then(res => res.data.data);

export const sendSmsPatients = (data) => Api.post('/medecin/sendsms', data).then(res => res.data.data);
export const SearchMedecin = (text) => Api.post('/medecin/search', {text}).then(res => res.data.data);
export const sendPasswordResetRequest = (data) => Api.post('/user/forgotpassword',data).then(res => res.data.data);
export const passwordReset = (data) => Api.post('/user/resetpassword',data).then(res => res.data.data)