  import Api from './Api';
  export const createEvent = (data) => Api.post('/event',data).then(res => res.data.data)
  export const getEventsByMedecin = (id) => Api.get('/event/findByMedecin/' + id).then(res => res.data.data)