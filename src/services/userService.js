import api from "./api";

export const fetchUsers = () => {
  return new Promise((resolve, reject) => api
    .get("/user/all")
    .then((result) => {
      resolve(result.data);
    })
    .catch((error) => reject(error)));
};
