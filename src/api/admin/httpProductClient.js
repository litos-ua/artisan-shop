
import axios from "axios";
import { configObj } from "../../resources";

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

export const fetchProducts = async (params = {}, headers = {}) => {
    //console.log('fetchProductsParams:', params);
    try {
        const { pagination, sort, filter } = params;
        const { page, perPage } = pagination || {};
        const { field: sortField, order: sortOrder } = sort || {};

        const query = {
            _page: page,
            _limit: perPage,
            _sort: sortField,
            _order: sortOrder,
            ...filter
        };


        const response = await httpProductClient.get("admin/products", {
            params: query,
            headers: {
                ...httpProductClient.defaults.headers,
                ...headers
            }
        });
        return {
            data: response.data,
            total: parseInt(response.headers['x-total-count'], 10)
        };
    } catch (error) {
        handleError(error);
    }
};

export const fetchProductsByCategory = async (categoryId, params = {}, headers = {}) => {
    try {
        const { page, perPage, sortField, sortOrder, filter } = params;
        const query = {
            _page: page,
            _limit: perPage,
            _sort: sortField,
            _order: sortOrder,
            ...filter
        };
        const response = await httpProductClient.get(`admin/products/category/${categoryId}`, {
            params: query,
            headers: {
                ...httpProductClient.defaults.headers,
                ...headers
            }
        });
        const wrapperName = `productsByCategory_${categoryId}`;
        return response.data[wrapperName];
    } catch (error) {
        handleError(error);
    }
};

export const createProduct = async (productData, headers = {}) => {
    try {
        const response = await httpProductClient.post("admin/products", productData, {
            headers: {
                ...httpProductClient.defaults.headers,
                ...headers
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getProductById = async (productId, headers = {}) => {
    try {
        const response = await httpProductClient.get(`admin/products/${productId}`, {
            headers: {
                ...httpProductClient.defaults.headers,
                ...headers
            }
        });
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateProduct = async (productId, productData, headers = {}) => {
    try {
        const response = await httpProductClient.put(`admin/products/${productId}`, productData, {
            headers: {
                ...httpProductClient.defaults.headers,
                ...headers
            }
        });
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteProduct = async (productId, headers = {}) => {
    try {
        const response = await httpProductClient.delete(`admin/products/${productId}`, {
            headers: {
                ...httpProductClient.defaults.headers,
                ...headers
            }
        });
        return { data: { id: productId } };
    } catch (error) {
        handleError(error);
    }
};

