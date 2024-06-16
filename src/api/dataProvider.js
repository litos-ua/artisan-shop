
import {
    fetchCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
} from './admin';
import {
    fetchProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
} from './admin';
import {
    fetchUsers,
    fetchUserById,
    updateUser,
    deleteUser
} from './admin'

const token = localStorage.getItem('token');
const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

export const dataProvider = {

    getList: async (resource, params) => {
        switch (resource) {
            case 'categories':
                const categories = await fetchCategories(params, authHeaders);
                return {
                    data: categories,
                    total: categories.length,
                };
            case 'products':
                const { data: products, total } = await fetchProducts(params, authHeaders);
                return {
                    data: products,
                    total: total,
                };
            case 'users':
                const users = await fetchUsers(authHeaders);
                return {
                    data: users,
                    total: users.length,
                };
            default:
                throw new Error(`Unknown resource: ${resource}`);
        }
    },

    getOne: async (resource, params) => {
        switch (resource) {
            case 'categories':
                const category = await getCategoryById(params.id, authHeaders);
                return { data: category };
            case 'products':
                const product = await getProductById(params.id, authHeaders);
                return { data: product };
            case 'users':
                const user = await fetchUserById(params.id, authHeaders);
                return { data: user };
            default:
                throw new Error(`Unknown resource: ${resource}`);
        }
    },

    getMany: async (resource, params) => {
        switch (resource) {
            case 'categories':
                const categories = await Promise.all(params.ids.map(id => getCategoryById(id, authHeaders)));
                return { data: categories };
            case 'products':
                const products = await Promise.all(params.ids.map(id => getProductById(id, authHeaders)));
                return { data: products };
            default:
                throw new Error(`Unknown resource: ${resource}`);
        }
    },

    getManyReference: async (resource, params) => {
        return { data: [], total: 0 };
    },

    create: async (resource, params) => {
        switch (resource) {
            case 'categories':
                const newCategory = await createCategory(params.data, authHeaders);
                return { data: { ...params.data, id: newCategory.id } };
            case 'products':
                const newProduct = await createProduct(params.data, authHeaders);
                return { data: { ...params.data, id: newProduct.id } };
            default:
                throw new Error(`Unknown resource: ${resource}`);
        }
    },

    update: async (resource, params) => {
        switch (resource) {
            case 'categories':
                const updatedCategory = await updateCategory(params.id, params.data, authHeaders);
                return { data: updatedCategory };
            case 'products':
                const updatedProduct = await updateProduct(params.id, params.data, authHeaders);
                return { data: updatedProduct };
            case 'users':
                const updatedUser = await updateUser(params.id, params.data, authHeaders);
                return { data: updatedUser };
            default:
                throw new Error(`Unknown resource: ${resource}`);
        }
    },

    delete: async (resource, params) => {
        switch (resource) {
            case 'categories':
                await deleteCategory(params.id, authHeaders);
                return { data: params.previousData };
            case 'products':
                await deleteProduct(params.id, authHeaders);
                return { data: params.previousData };
            case 'users':
                await deleteUser(params.id, authHeaders);
                return { data: params.previousData };
            default:
                throw new Error(`Unknown resource: ${resource}`);
        }
    },

    deleteMany: async (resource, params) => {
        switch (resource) {
            case 'categories':
                await Promise.all(params.ids.map(id => deleteCategory(id, authHeaders)));
                return { data: params.ids };
            case 'products':
                await Promise.all(params.ids.map(id => deleteProduct(id, authHeaders)));
                return { data: params.ids };
            default:
                throw new Error(`Unknown resource: ${resource}`);
        }
    },
};



