import axios from 'axios';
import { configObj } from "../resources";

const baseURL = configObj.axiosUrl;

const httpAuthClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getOrdersOfCustomer = async (url, headers = {}) => {
    try {
        const response = await httpAuthClient.get(url, {
            headers: {
                ...httpAuthClient.defaults.headers,
                ...headers
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};