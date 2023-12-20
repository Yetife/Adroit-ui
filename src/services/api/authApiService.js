import callEndpoint from "./index.js";
import METHODS from "./apiMethods.js";

const { GET, POST, PUT, PATCH, DELETE } = METHODS;

const authServiceCallEndpoint = ({ method, url, data, needsAuth }) => {
    return callEndpoint({ method, url, data, needsAuth });
};

export const getDocumentation = async () => {
    const url = `/BridgeLoan/Documentation/get`;
    return authServiceCallEndpoint({url, needsAuth:true})
};