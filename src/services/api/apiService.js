import callEndpoint from "./index.js";
import METHODS from "./apiMethods.js";

const { GET, POST, PUT, PATCH, DELETE } = METHODS;

const authServiceCallEndpoint = ({ method, url, data, needsAuth }) => {
    return callEndpoint({ method, url, data, needsAuth });
};
export const login = async user => {
    const url = '/Adroit/Login/UserLogin'
    return authServiceCallEndpoint({method: POST, data: user, url})
};