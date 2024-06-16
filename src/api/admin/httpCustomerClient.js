import axios from "axios";
import { configObj } from "../../resources";

const baseURL = configObj.axiosUrl;

const httpCustomerClient = axios.create({
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

export const fetchCustomers = async (headers = {}) => {
    try {
        const response = await httpCustomerClient.get("admin/customers", {
            headers: {
                ...httpCustomerClient.defaults.headers,
                ...headers
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const fetchCustomerById = async (customerId, headers = {}) => {
    try {
        const response = await httpCustomerClient.get(`admin/customers/${customerId}`, {
            headers: {
                ...httpCustomerClient.defaults.headers,
                ...headers
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateCustomer = async (customerId, customerData, headers = {}) => {
    try {
        const response = await httpCustomerClient.put(`admin/customers/${customerId}`, customerData, {
            headers: {
                ...httpCustomerClient.defaults.headers,
                ...headers
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteCustomer = async (customerId, headers = {}) => {
    try {
        const response = await httpCustomerClient.delete(`admin/customers/${customerId}`, {
            headers: {
                ...httpCustomerClient.defaults.headers,
                ...headers
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
