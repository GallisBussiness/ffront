import Api from './Api';
export const getAllNotificationsByUser = (id) => Api.get('/notifications/byuser/' + id).then(res => res.data.data)
export const markAsReadNotification = (id) => Api.get('/notifications/markasread/' + id).then(res => res.data.data);