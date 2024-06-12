
import {
    fetchCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
} from './admin/httpCategoryClient';
import {
    fetchProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
} from './admin/httpProductClient';
// Import other HTTP clients similarly

export const dataProvider = {
    getList: async (resource, params) => {
        switch (resource) {
            case 'categories':
                const categories = await fetchCategories();
                return {
                    data: categories,
                    total: categories.length,
                };
            case 'products':
                const products = await fetchProducts();
                return {
                    data: products,
                    total: products.length,
                };
            // Add other resources similarly
            default:
                throw new Error(`Unknown resource: ${resource}`);
        }
    },

    getOne: async (resource, params) => {
        switch (resource) {
            case 'categories':
                const category = await getCategoryById(params.id);
                return { data: category };
            case 'products':
                const product = await getProductById(params.id);
                return { data: product };
            // Add other resources similarly
            default:
                throw new Error(`Unknown resource: ${resource}`);
        }
    },

    getMany: async (resource, params) => {
        switch (resource) {
            case 'categories':
                const categories = await Promise.all(params.ids.map(id => getCategoryById(id)));
                return { data: categories };
            case 'products':
                const products = await Promise.all(params.ids.map(id => getProductById(id)));
                return { data: products };
            // Add other resources similarly
            default:
                throw new Error(`Unknown resource: ${resource}`);
        }
    },

    getManyReference: async (resource, params) => {
        // Implement if you need to support reference fetching
        return { data: [], total: 0 };
    },

    create: async (resource, params) => {
        switch (resource) {
            case 'categories':
                const newCategory = await createCategory(params.data);
                return { data: { ...params.data, id: newCategory.id } };
            case 'products':
                const newProduct = await createProduct(params.data);
                return { data: { ...params.data, id: newProduct.id } };
            // Add other resources similarly
            default:
                throw new Error(`Unknown resource: ${resource}`);
        }
    },

    update: async (resource, params) => {
        switch (resource) {
            case 'categories':
                const updatedCategory = await updateCategory(params.id, params.data);
                return { data: updatedCategory };
            case 'products':
                const updatedProduct = await updateProduct(params.id, params.data);
                return { data: updatedProduct };
            // Add other resources similarly
            default:
                throw new Error(`Unknown resource: ${resource}`);
        }
    },

    delete: async (resource, params) => {
        switch (resource) {
            case 'categories':
                await deleteCategory(params.id);
                return { data: params.previousData };
            case 'products':
                await deleteProduct(params.id);
                return { data: params.previousData };
            // Add other resources similarly
            default:
                throw new Error(`Unknown resource: ${resource}`);
        }
    },

    deleteMany: async (resource, params) => {
        switch (resource) {
            case 'categories':
                // await Promise.all(params.ids.map(id => deleteCategory(id)));
                // return { data: params.ids };
                if (resource === 'categories') {
                    const deletedCategory = await deleteCategory(params.id);
                    return { data: deletedCategory };
                }
                throw new Error(`Unsupported resource: ${resource}`);
            case 'products':
                await Promise.all(params.ids.map(id => deleteProduct(id)));
                return { data: params.ids };
            // Add other resources similarly
            default:
                throw new Error(`Unknown resource: ${resource}`);
        }
    },
};

// export default dataProvider;

