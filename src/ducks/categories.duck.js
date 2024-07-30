import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: [],
    reducers: {
        setCategories(state, action) {
            return action.payload; // Set categories in the state
        },
    },
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit';
//
// const initialState = {
//     list: [],
//     fetched: false,
// };
//
// const categoriesSlice = createSlice({
//     name: 'categories',
//     initialState,
//     reducers: {
//         setCategories(state, action) {
//             state.list = action.payload;
//             state.fetched = true; // Set the flag to true
//         },
//         clearCategories(state) {
//             state.list = [];
//             state.fetched = false;
//         },
//     },
// });
//
// export const { setCategories, clearCategories } = categoriesSlice.actions;
//
// export default categoriesSlice.reducer;
