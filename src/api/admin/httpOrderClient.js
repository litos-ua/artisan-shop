import axios from "axios";
import { configObj } from "../../resources";

const baseURL = configObj.axiosUrl;

const httpOrderClient = axios.create({
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

// export const fetchOrders = async (headers = {}) => {
//     try {
//         const response = await httpOrderClient.get("admin/orders", {
//             headers: {
//                 ...httpOrderClient.defaults.headers,
//                 ...headers
//             }
//         });
//         //console.log('ResponseOrders:',response);
//         return response.data.data;
//     } catch (error) {
//         handleError(error);
//     }
// };

// export const fetchOrders = async (headers = {}) => {
//     try {
//         const response = await httpOrderClient.get("admin/orders", {
//             headers: {
//                 ...httpOrderClient.defaults.headers,
//                 ...headers
//             }
//         });
//
//         console.log('Response:', response.data);
//         const orders = response.data.data.map(order => ({
//             ...order,
//             delivery_requirement: order.delivery_requirement === 0 ? 'Pickup' : 'Delivery',
//             received_status: order.received_status === 0 ? 'Pending' : 'Received',
//             payment_status: order.payment_status === 0 ? 'Not paid' : 'Paid',
//             advance_payment: order.advance_payment === 0 ? 'Payment upon receipt' : 'Prepayment'
//         }));
//         console.log('Orders:', orders);
//         return orders;
//     } catch (error) {
//         handleError(error);
//     }
// };

export const fetchOrders = async (params = {}, headers = {}) => {
    try {
        const { pagination, sort, filter } = params;
        const { page, perPage } = pagination || { page: 1, perPage: 10 }; // default values
        const { field: sortField, order: sortOrder } = sort || { field: 'id', order: 'ASC' }; // default values

        const query = {
            _page: page,
            _limit: perPage,
            _sort: sortField,
            _order: sortOrder,
            ...filter
        };

        const response = await httpOrderClient.get("admin/orders", {
            params: query,
            headers: {
                ...httpOrderClient.defaults.headers,
                ...headers
            }
        });

        console.log('Response:', response);

        // const orders = response.data.data.map(order => ({
        //     ...order,
        //     delivery_requirement: order.delivery_requirement === 0 ? 'Pickup' : 'Delivery',
        //     received_status: order.received_status === 0 ? 'Pending' : 'Received',
        //     payment_status: order.payment_status === 0 ? 'Not paid' : 'Paid',
        //     advance_payment: order.advance_payment === 0 ? 'Payment upon receipt' : 'Prepayment'
        // }));

        const orders = response.data.data.map(order => {
            // Format order_details as {product:name}:quantity
            const formattedOrderDetails = order.order_details.map(detail => {
                return `${detail.product.name}:${detail.quantity}`;
            }).join(', ');

            return {
                ...order,
                order_details: formattedOrderDetails,
                delivery_requirement: order.delivery_requirement === 0 ? 'Pickup' : 'Delivery',
                received_status: order.received_status === 0 ? 'Pending' : 'Received',
                payment_status: order.payment_status === 0 ? 'Not paid' : 'Paid',
                advance_payment: order.advance_payment === 0 ? 'Payment upon receipt' : 'Prepayment',
                total_amount: order.total_amount // Include total_amount as is
            };
        });

        const total = response.data.total;
        console.log('Parsed Orders:', orders);
        console.log('Total Orders:', total);

        return {
            data: orders,
            total: total
        };
    } catch (error) {
        console.error('Fetch Orders Error:', error);
        handleError(error);
    }
};


export const fetchOrderById = async (orderId, headers = {}) => {
    try {
        const response = await httpOrderClient.get(`admin/orders/${orderId}`, {
            headers: {
                ...httpOrderClient.defaults.headers,
                ...headers
            }
        });
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const createOrder = async (orderData, headers = {}) => {
    try {
        const response = await httpOrderClient.post("admin/orders", orderData, {
            headers: {
                ...httpOrderClient.defaults.headers,
                ...headers
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateOrder = async (orderId, orderData, headers = {}) => {
    try {
        const response = await httpOrderClient.put(`admin/orders/${orderId}`, orderData, {
            headers: {
                ...httpOrderClient.defaults.headers,
                ...headers
            }
        });
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteOrder = async (orderId, headers = {}) => {
    try {
        const response = await httpOrderClient.delete(`admin/orders/${orderId}`, {
            headers: {
                ...httpOrderClient.defaults.headers,
                ...headers
            }
        });
        return response.data.data;
    } catch (error) {
        handleError(error);
    }
};
