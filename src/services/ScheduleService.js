import Api from './Api';
export const createSchedule = (data) => Api.post('/schedules',data).then(res => res.data.data);

export const getScheduleByMedecin = (doctorId) => Api.get('/schedules/slot-doctor/' + doctorId).then(res => res.data.data)

export const updateSchedule = (id,data) =>  Api.patch('/schedules/' + id ,data).then(res => res.data.data);

export const deleteSchedules = (id) => Api.delete('/schedules/' + id).then(res => res.data.data);

export const getAllSchedules = () => Api.get('/schedules').then(res => res.data.data);
