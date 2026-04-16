import axios, {AxiosHeaders, type InternalAxiosRequestConfig} from "axios";
import {base_url} from "./globalConstants.ts";
import type {Store} from "@reduxjs/toolkit";
import type {RootState} from "./app/store.ts";

export const axiosApi = axios.create({
  baseURL: base_url,
})

export const addInterceptors = (store: Store<RootState>) => {
  axiosApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = store.getState().user.user?.token;
    const headers = config.headers as AxiosHeaders;
    headers.set('Authorization',`Bearer ${token}`);

    return config;
  });
};