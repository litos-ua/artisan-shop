
import axios from "axios";
import { configObj } from "../../resources";

const baseURL = configObj.axiosUrl;

const httpCategoryClient = axios.create({
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

export const fetchCategories = async (params = {}, headers = {}) => {
    try {
        const { page, perPage, sortField, sortOrder, filter } = params;
        const query = {
            _page: page,
            _limit: perPage,
            _sort: sortField,
            _order: sortOrder,
            ...filter
        };
        const response = await httpCategoryClient.get("admin/categories", {
            params: query,
            headers: {
                ...httpCategoryClient.defaults.headers,
                ...headers
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const createCategory = async (categoryData, headers = {}) => {
    try {
        const response = await httpCategoryClient.post("admin/categories", categoryData, {
            headers: {
                ...httpCategoryClient.defaults.headers,
                ...headers
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getCategoryById = async (categoryId, headers = {}) => {
    try {
        const response = await httpCategoryClient.get(`admin/categories/${categoryId}`, {
            headers: {
                ...httpCategoryClient.defaults.headers,
                ...headers
            }
        });
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateCategory = async (categoryId, categoryData, headers = {}) => {
    try {
        const response = await httpCategoryClient.put(`admin/categories/${categoryId}`, categoryData, {
            headers: {
                ...httpCategoryClient.defaults.headers,
                ...headers
            }
        });
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteCategory = async (categoryId, headers = {}) => {
    try {
        const response = await httpCategoryClient.delete(`admin/categories/${categoryId}`, {
            headers: {
                ...httpCategoryClient.defaults.headers,
                ...headers
            }
        });
        return { data: { id: categoryId } };
    } catch (error) {
        handleError(error);
    }
};
