import axios from 'axios';

const defaulAxiosConfig = {
  baseURL: process.env.VUE_APP_BASE_API_URL,
  headers: { 'Content-Type': 'application/json' },
};

export const axiosApi = axios.create(defaulAxiosConfig);

axiosApi.interceptors.response.use(undefined, () => {});
