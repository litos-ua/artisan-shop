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

export const fetchProducts = async () => {
    try {
        const response = await httpProductClient.get("products");
        return response.data.products;
    } catch (error) {
        handleError(error);
    }
};

// export const fetchProductsByCategory = async (categoryId) => {
//     try {
//         const response = await httpProductClient.get(`products/category/${categoryId}`);
//         return response.data.productsByCategory;
//     } catch (error) {
//         handleError(error);
//     }
// };

export const fetchProductsByCategory = async (categoryId) => {
    try {
        const response = await httpProductClient.get(`products/category/${categoryId}`);
        const wrapperName = `productsByCategory_${categoryId}`;
        return response.data[wrapperName];
    } catch (error) {
        handleError(error);
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await httpProductClient.post("products", productData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getProductById = async (productId) => {
    try {
        const response = await httpProductClient.get(`products/${productId}`);
        return response.data.product;
    } catch (error) {
        handleError(error);
    }
};

export const updateProduct = async (productId, productData) => {
    try {
        const response = await httpProductClient.put(`products/${productId}`, productData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteProduct = async (productId) => {
    try {
        const response = await httpProductClient.delete(`products/${productId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export default httpProductClient;
