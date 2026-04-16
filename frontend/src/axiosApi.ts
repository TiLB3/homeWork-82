import axios from "axios";
import {base_url} from "./globalConstants.ts";

export const axiosApi = axios.create({
  baseURL: base_url,
})

axiosApi.defaults.withCredentials = true;

// export const addInterceptors = (store: Store<RootState>) => {
//   axiosApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//     const token = store.getState().user.user?.token;
//     const headers = config.headers as AxiosHeaders;
//     headers.set('Authorization',`Bearer ${token}`);
//
//     return config;
//   });
// };