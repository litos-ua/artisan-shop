
import axios from 'axios';
import { configObj } from "../resources";

const baseURL = configObj.axiosUrl;

const httpAuthClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const post = async (url, data, headers = {}) => {
    try {
        const response = await httpAuthClient.post(url, data, {
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

// export const post = async (url, data, headers = {}) => {
//     try {
//         const requestHeaders = {
//             ...httpAuthClient.defaults.headers,
//             ...headers,
//         };
//
//         const response = await httpAuthClient.post(url, data, {
//             headers: requestHeaders,
//         });
//         return response.data;
//     } catch (error) {
//         throw error.response ? error.response.data : error;
//     }
// };

export const get = async (url, headers = {}) => {
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

export default httpAuthClient;
