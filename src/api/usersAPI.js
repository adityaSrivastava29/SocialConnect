import axiosClient from "./axoisClient";

const usersApi = {
  create: (body) => {
    const url = `/users`;
    return axiosClient.post(url, body);
  },

  update: (id, body) => {
    const url = `/users/${id}`;
    return axiosClient.patch(url, body);
  },

  get: (id) => {
    const url = id ? `/users/${id}` : `/users`;
    return axiosClient.get(url);
  },
};

export default usersApi;
