import axios from "axios";

export const Axios = axios.create({
  baseURL:  window.location.host,
  headers: {},
});
