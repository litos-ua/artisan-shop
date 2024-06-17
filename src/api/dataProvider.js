
import {
    fetchCategories, createCategory, getCategoryById, updateCategory, deleteCategory,
    fetchProducts, createProduct, getProductById, updateProduct, deleteProduct,
    fetchUsers, fetchUserById, updateUser, deleteUser,
    fetchCustomers, fetchCustomerById, updateCustomer, deleteCustomer,
    fetchOrders, fetchOrderById, createOrder, updateOrder, deleteOrder,
} from './admin';

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
            case 'customers':
                const customers = await fetchCustomers(authHeaders);
                return {
                    data: customers,
                    total: customers.length,
                };
            // case 'orders':
            //     const orders = await fetchOrders(authHeaders);
            //     return {
            //         data: orders,
            //         total: orders.length,
            //     };

            // case 'orders':
            //     const orders = await fetchOrders(params, authHeaders);
            //     return {
            //         data: orders,
            //         total: orders.length,
            //     };
            case 'orders':
                const { data: orders, total: orderTotal } = await fetchOrders(params, authHeaders);
                return {
                    data: orders,
                    total: orderTotal,
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
            case 'customers':
                const customer = await fetchCustomerById(params.id, authHeaders);
                return { data: customer };
            case 'orders':
                const order = await fetchOrderById(params.id, authHeaders);
                return { data: order };
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
            case 'orders':
                const newOrder = await createOrder(params.data, authHeaders);
                return { data: { ...params.data, id: newOrder.id } };
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
            case 'customers':
                const updatedCustomer = await updateCustomer(params.id, params.data, authHeaders);
                return { data: updatedCustomer };
            case 'orders':
                const updatedOrder = await updateOrder(params.id, params.data, authHeaders);
                return { data: updatedOrder };
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
            case 'customers':
                await deleteCustomer(params.id, authHeaders);
                return { data: params.previousData };
            case 'orders':
                await deleteOrder(params.id, authHeaders);
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



