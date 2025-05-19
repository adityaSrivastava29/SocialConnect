import axiosClient from "./axoisClient";

const postApi = {
  create: (body) => {
    const url = `/posts`;
    return axiosClient.post(url, body);
  },

  get: (id) => {
    const url = id ? `/posts/${id}` : `/posts`;
    return axiosClient.get(url);
  },
};

export default postApi;
