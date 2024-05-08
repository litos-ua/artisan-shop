import { createSlice } from '@reduxjs/toolkit';

const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState: {},
    reducers: {
        setProductDetails(state, action) {
            const { productKey, product } = action.payload;
            state[productKey] = product;
        },
        clearProductDetails(state) {
            return {};
        },
    },
});

export const { setProductDetails, clearProductDetails } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
