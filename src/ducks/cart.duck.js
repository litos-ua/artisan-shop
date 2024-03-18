import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        saveCartItemToReduxStore(state, action) {
            const newItem = action.payload;
            const existingItemIndex = state.cartItems.findIndex(item => item.productKey === newItem.productKey);
            if (existingItemIndex === -1) {
                state.cartItems.push(newItem);
            }
        },
        removeCartItemFromReduxStore(state, action) {
            state.cartItems = state.cartItems.filter(item => item.productKey !== action.payload);
        },
        getCartItemsFromReduxStore(state, action) {
            //state.cartItems = action.payload;
        },

        increment(state, action) {
            const { productKey } = action.payload;
            const item = state.cartItems.find(item => item.productKey === productKey);
            if (item) {
                item.quantityCount++;
            }
        },
        decrement(state, action) {
            const { productKey } = action.payload;
            const item = state.cartItems.find(item => item.productKey === productKey);
            if (item && item.quantityCount > 1) {
                item.quantityCount--;
            }
        },

        clearReduxStore(state) {
            state.cartItems = [];
            state.quantityCount = 1;
        },
    },
    selectors: {
        selectCart: (state) => state.cartItems,
    },
});

export const {
    saveCartItemToReduxStore,
    removeCartItemFromReduxStore,
    getCartItemsFromReduxStore,
    clearReduxStore,
    increment,
    decrement,
} = cartSlice.actions;

export const {selectCart} = cartSlice.selectors;

export default cartSlice.reducer;
