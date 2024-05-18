

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
    // reducers: {},
    reducers: {
        // Add a reducer case for resetting orders
        resetOrders(state) {
            state.orders = [];
            state.status = 'idle';
            state.error = null;
        },
    },
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

export const { resetOrders } = ordersSlice.actions;

export default ordersSlice.reducer;

