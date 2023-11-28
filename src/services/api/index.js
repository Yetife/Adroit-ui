import axios from "./axios.js";
import authHeader from "./auth-header.js";
import METHODS from "./apiMethods.js";
import {getSessionItem} from "../storage/index.js";

let BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const refreshToken = async () => {
  try {
    const resp = await axios.post(BASE_URL + "/auth/refresh", {
      refreshToken: getSessionItem("refresh"),
    });
    return resp;
  } catch (e) {
    alert("Session Expired");
    window.location.href = "/login";
  }
};

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (error?.response?.status === 307 || error?.response?.status === 403) {
      return Promise.reject({
        status: 401,
        message: "Unauthorized",
      });
    }
    return Promise.reject(
      error
        ? error.response
          ? error.response.data
          : error.response
        : "Something Went wrong!!!"
    );
  }
);

const callEndpoint = async (
  { method, url, data, needsAuth = false },
  SERVICE_BASE_URL = BASE_URL
) => {
  const { GET, DELETE } = METHODS;
  url = SERVICE_BASE_URL + url;
  if (!method) method = GET;
  if (method === GET || method === DELETE) {
    if (needsAuth) {
      return axios[method](url, { headers: authHeader() });
    } else return axios[method](url);
  } else {
    if (needsAuth) {
      return axios[method](url, data, { headers: authHeader() });
    } else return axios[method](url, data);
  }
};

export default callEndpoint;
