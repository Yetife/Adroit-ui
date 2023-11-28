import axios from "axios";
import {getUserToken} from "../storage/index.js";

const header = {
    "Content-Type": "application/json",
    'Accept': "application/json",
};
export default axios.create({
    headers: header
})


const baseURL =import.meta.env.VITE_APP_LOCAL_API_SERVER
    ? import.meta.env.VITE_APP_LOCAL_API_SERVER
    : import.meta.env.VITE_APP_DEV_AUTH_URL

const axiosWithAuth = axios.create({
    baseURL,
    headers: {
        ...header,
        Authorization: `Bearer ${getUserToken()}`
    }
})



export const getRequestWithAuth = async (path) => {
    try {
        return await axiosWithAuth.get(path)
    } catch (err) {
        console.log("err", err)
        console.log("message", err.status)
        return err;
    }
}