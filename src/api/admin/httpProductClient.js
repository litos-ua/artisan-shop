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

// export const fetchProducts = async (params = {}) => {
//     try {
//        // const { page, perPage, sortField, sortOrder, filter } = params;
//         const { pagination, sort, filter } = params;
//         const { page, perPage } = pagination || {};
//         const { sortField, sortOrder } = sort || {};
//
//         const query = {
//             _page: page,
//             _limit: perPage,
//             _sort: sortField,
//             _order: sortOrder,
//             ...filter
//         };
//         const response = await httpProductClient.get("admin/products", { params: query });
//         return response.data;
//     } catch (error) {
//         handleError(error);
//     }
// };

export const fetchProducts = async (params = {}) => {
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
        const response = await httpProductClient.get("admin/products", { params: query });

        return {
            data: response.data,
            total: parseInt(response.headers['x-total-count'], 10)
        };
    } catch (error) {
        handleError(error);
    }
};

export const fetchProductsByCategory = async (categoryId, params = {}) => {
    try {
        const { page, perPage, sortField, sortOrder, filter } = params;
        const query = {
            _page: page,
            _limit: perPage,
            _sort: sortField,
            _order: sortOrder,
            ...filter
        };
        const response = await httpProductClient.get(`admin/products/category/${categoryId}`, { params: query });
        const wrapperName = `productsByCategory_${categoryId}`;
        return response.data[wrapperName];
    } catch (error) {
        handleError(error);
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await httpProductClient.post("admin/products", productData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getProductById = async (productId) => {
    try {
        const response = await httpProductClient.get(`admin/products/${productId}`);
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateProduct = async (productId, productData) => {
    try {
        const response = await httpProductClient.put(`admin/products/${productId}`, productData);
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteProduct = async (productId) => {
    try {
        const response = await httpProductClient.delete(`admin/products/${productId}`);
        return { data: { id: productId } };
    } catch (error) {
        handleError(error);
    }
};
