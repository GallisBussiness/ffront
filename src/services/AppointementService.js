import Api from './Api';
export const createappointment = (data) => Api.post('/appointments',data).then(res => res.data.data);

export const updateappointment = (id,data) => Api.patch('/appointments/' + id ,data).then(res => res.data.data);

export const appointmentFindAllByDoctor = (id,state) => Api.get('/appointments/findallbydoctorandstate/' + id + '/' + state).then(res => res.data.data);
export const appointmentChangeState = (data) => Api.patch('/appointments/changeState',data).then(res => res.data.data);
export const appointmentFindByEmergency = (id) => Api.get('/appointments/findallbydoctoremergency/' + id).then(res => res.data.data);
export const appointmentFindAllByPatient = (id,state) => Api.get('/appointments/findallbypatient/' + id).then(res => res.data.data);

export const createOwnAppointment = (data) => Api.post('/ownappointment',data).then(res => res.data.data);