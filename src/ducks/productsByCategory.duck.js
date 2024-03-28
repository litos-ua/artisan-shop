
import { createSlice } from '@reduxjs/toolkit';

const productsByCategorySlice = createSlice({
    name: 'productsByCategory',
    initialState: {},
    reducers: {
        setProductsByCategory(state, action) {
            const { categoryId, products } = action.payload;
            state[categoryId] = products;
        },
        clearProductsByCategory(state) {
            return {};
        },
    },
});

export const { setProductsByCategory } = productsByCategorySlice.actions;
export const { clearProductsByCategory } = productsByCategorySlice.actions
export default productsByCategorySlice.reducer;
