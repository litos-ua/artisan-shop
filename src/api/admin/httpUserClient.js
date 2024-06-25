import axios from "axios";
import { configObj } from "../../resources";

const baseURL = configObj.axiosUrl;

const httpUserClient = axios.create({
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

export const fetchUsers = async (headers = {}) => {
    try {
        const response = await httpUserClient.get("admin/users", {
            headers: {
                ...httpUserClient.defaults.headers,
                ...headers
            }
        });
        console.log('Users:', response);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const fetchUserById = async (userId, headers = {}) => {
    try {
        const response = await httpUserClient.get(`admin/users/${userId}`, {
            headers: {
                ...httpUserClient.defaults.headers,
                ...headers
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateUser = async (userId, userData, headers = {}) => {
    try {
        const response = await httpUserClient.put(`admin/users/${userId}`, userData, {
            headers: {
                ...httpUserClient.defaults.headers,
                ...headers
            }
        });
        console.log('Users:', response);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteUser = async (userId, headers = {}) => {
    try {
        const response = await httpUserClient.delete(`admin/users/${userId}`, {
            headers: {
                ...httpUserClient.defaults.headers,
                ...headers
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
