import api from "./api";

export const fetchTasks = ({ eventId }) => {
  return new Promise((resolve, reject) =>
    api
      .get(`/event/${eventId}/tasks`)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => reject(error))
  );
};

export const addTask = ({ task }) => {
  return new Promise((resolve, reject) =>
    api
      .post(`/task`, task)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => reject(error))
  );
};

export const editTask = ({ task }) => {
  return new Promise((resolve, reject) =>
    api
      .put(`/task`, task)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => reject(error))
  );
};

export const deleteTask = ({ taskId }) => {
  return new Promise((resolve, reject) =>
    api
      .delete(`/task/${taskId}`)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => reject(error))
  );
};
