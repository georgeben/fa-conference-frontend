/**
 * Creates a HTTP Client for making HTTP requests
 */

import axios from "axios";
import { storage } from "../utils";
import { TOKEN } from "../utils/constants";
import config from "../config";
import NProgress from "nprogress";
let { baseURL } = config;

let authInterceptorID;

const httpClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const calculatePercentage = (loaded, total) => Math.floor(loaded * 1.0) / total;

httpClient.defaults.onDownloadProgress = e => {
  const percentage = calculatePercentage(e.loaded, e.total);
  NProgress.set(percentage);
};

const authInterceptor = config => {
  let token = storage.loadState(TOKEN);
  config.headers["authorization"] = token;
  NProgress.start();
  return config;
};

httpClient.interceptors.response.use(response => {
  NProgress.done();
  return response;
});

/**
 * Sets the authorization header of the request to the JWT token returned by the API
 */
export function setAuthHeader() {
  authInterceptorID = httpClient.interceptors.request.use(authInterceptor);
}

/**
 * Removes the authorization header of the request
 */
export function removeAuthHeader() {
  httpClient.interceptors.request.eject(authInterceptorID);
}

export default httpClient;
