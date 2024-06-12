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

export const fetchCategories = async (params = {}) => {
    try {
        const { page, perPage, sortField, sortOrder, filter } = params;
        const query = {
            _page: page,
            _limit: perPage,
            _sort: sortField,
            _order: sortOrder,
            ...filter
        };
        const response = await httpCategoryClient.get("admin/categories", { params: query });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const createCategory = async (categoryData) => {
    try {
        const response = await httpCategoryClient.post("admin/categories", categoryData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getCategoryById = async (categoryId) => {
    try {
        const response = await httpCategoryClient.get(`admin/categories/${categoryId}`);
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateCategory = async (categoryId, categoryData) => {
    try {
        const response = await httpCategoryClient.put(`admin/categories/${categoryId}`, categoryData);
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteCategory = async (categoryId) => {
    try {
        // const response = await httpCategoryClient.delete(`admin/categories/${categoryId}`);
        // return response.data.data;
        const response = await httpCategoryClient.delete(`admin/categories/${categoryId}`);
        return { data: { id: categoryId } };
    } catch (error) {
        handleError(error);
    }
};
