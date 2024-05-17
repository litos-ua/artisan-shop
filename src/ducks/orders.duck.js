// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { configObj } from "../resources";
//
// const baseURL = configObj.axiosUrl
//
// // Async thunk to fetch orders
// export const fetchOrders = createAsyncThunk(
//     'orders/fetchOrders',
//     async (_, { rejectWithValue }) => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await axios.get('customer/orders', {
//                 baseURL,
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );
//
// const ordersSlice = createSlice({
//     name: 'orders',
//     initialState: {
//         orders: [],
//         status: 'idle',
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchOrders.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchOrders.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.orders = action.payload;
//             })
//             .addCase(fetchOrders.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.payload;
//             });
//     },
// });
//
// export default ordersSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersOfCustomer } from "../api/";


export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const ordersData = await getOrdersOfCustomer('customer/orders', { Authorization: `Bearer ${token}` });
            return ordersData;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default ordersSlice.reducer;

