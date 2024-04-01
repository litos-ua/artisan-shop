import axios from "axios";
import { configObj } from "../resources";

const baseURL = configObj.axiosUrl;

const httpProductClient = axios.create({
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

export const fetchProductsBySearchParam = async (searchParam) => {
    try {
        const response = await httpProductClient.get(`products/search/${searchParam}`);
        const wrapperName = `productsBySearchParam`;
        return response.data[wrapperName];
    } catch (error) {
        handleError(error);
    }
};