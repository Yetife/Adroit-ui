import callEndpoint from "./index.js";
import METHODS from "./apiMethods.js";

const { GET, POST, PUT, PATCH, DELETE } = METHODS;

const authServiceCallEndpoint = ({ method, url, data, needsAuth }) => {
    return callEndpoint({ method, url, data, needsAuth });
};

export const getDocumentation = async (size, page) => {
    const url = `/BridgeLoan/Documentation/get?PasgeSize=${size}&PageNumber=${page}`;
    return authServiceCallEndpoint({url, needsAuth:true})
};
export const repaymentDetail = async data => {
    const url = '/LoanApplication/Customer/getRepaymentDetails'
    return authServiceCallEndpoint({method: POST, data: data, url})
};
export const getComment = async data => {
    const url = '/LoanApplication/Customer/getComments'
    return authServiceCallEndpoint({method: POST, data: data, url})
};