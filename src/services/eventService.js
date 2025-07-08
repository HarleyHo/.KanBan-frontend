import api from "./api";

export const fetchEvents = () => {
  return new Promise((resolve, reject) =>
    api
      .get("/event/all")
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => reject(error))
  );
};

export const addEvent = ({ event }) => {
  return new Promise((resolve, reject) =>
    api
      .post("/event", event)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => reject(error))
  );
};
