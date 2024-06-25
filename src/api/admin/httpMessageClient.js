import axios from "axios";
import { configObj } from "../../resources";

const baseURL = configObj.axiosUrl;

const httpMessageClient = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

const handleError = (error) => {
    if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
    } else {
        throw new Error("Unknown Error");
    }
};

export const sendMessage = async (messageData, headers = {}) => {
    try {
        const response = await httpMessageClient.post("messages", messageData, {
            headers: {
                ...httpMessageClient.defaults.headers,
                ...headers
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const fetchMessages = async (userId, headers = {}) => {
    try {
        const response = await httpMessageClient.get(`messages/${userId}`, {
            //params: { userId },
            headers: {
                ...httpMessageClient.defaults.headers,
                ...headers
            }
        });
        return response.data.messages;
    } catch (error) {
        handleError(error);
    }
};

export const getMessages = async (userId, adminId, headers = {}) => {
    try {
        console.log('userId:', userId, 'adminId:', adminId);
        const response = await httpMessageClient.get(`messages`, {
            params: { userId, adminId },
            headers: {
                ...httpMessageClient.defaults.headers,
                ...headers
            }
        });
        return response.data.messages;
    } catch (error) {
        handleError(error);
    }
};