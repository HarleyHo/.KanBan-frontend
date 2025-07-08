import api from "./api"

export const fetchTasks = ({eventId}) => {
   return new Promise((resolve, reject) => api
    .get(`/event/${eventId}/tasks`)
    .then((result) => {
      resolve(result.data);
    })
    .catch((error) => reject(error)));
}