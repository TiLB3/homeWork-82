import axios from "axios";
import {base_url} from "./globalConstants.ts";

export const axiosApi = axios.create({
  baseURL: base_url,
})