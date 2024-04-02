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
export const getProcessedDisbursement = async () => {
    const url = `/BridgeLoan/Disbursement/getNew`;
    return authServiceCallEndpoint({url, needsAuth:true})
};
export const getLoanTopUpDetails = async (id) => {
    const url = `/LoanTopUp/ViewLoan/${id}`;
    return authServiceCallEndpoint({url, needsAuth:true})
};
export const getLoanRestructuringDetails = async (id) => {
    const url = `/LoanRestructuring/ViewLoan/${id}`;
    return authServiceCallEndpoint({url, needsAuth:true})
};
export const getDisbursedDisbursement = async (size, page) => {
    const url = `/BridgeLoan/Disbursement/getdisbursed?det=2&PasgeSize=${size}&PageNumber=${page}`;
    return authServiceCallEndpoint({url, needsAuth:true})
};
export const filterDisbursedDisbursement = async (date, bvn,) => {
    const url = `/BridgeLoan/Disbursement/getNew?det=1&PasgeSize=10&PageNumber=1&StartDate=${date}&Bvn=${bvn}`;
    return authServiceCallEndpoint({url, needsAuth:true})
};
export const repaymentDetail = async data => {
    const url = '/LoanApplication/Customer/getRepaymentDetails'
    return authServiceCallEndpoint({method: POST, data: data, url, needsAuth:true})
};
export const getComment = async data => {
    const url = '/LoanApplication/Customer/getComments'
    return authServiceCallEndpoint({method: POST, data: data, url})
};