import { createSlice } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';

export const loginSuccess = createAction('LOGIN_SUCCESS');
export const logoutSuccess = createAction('LOGOUT_SUCCESS');


const initialState = {
    isAuthenticated: false,
    role: null, // Ensure role is part of the initial state
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    // extraReducers: builder => {
    //     builder
    //         .addCase(loginSuccess, state => {
    //             state.isAuthenticated = true;
    //             localStorage.setItem('isAuthenticated', 'true');
    //         })
    //         .addCase(logoutSuccess, state => {
    //             state.isAuthenticated = false;
    //             state.role = null; // Clear the role on logout
    //             localStorage.setItem('isAuthenticated', 'false');
    //         });
    // },
    extraReducers: (builder) => {
        builder
            .addCase(loginSuccess, (state, action) => {
                state.isAuthenticated = true;
                state.role = action.payload; // Store the role from action payload
                localStorage.setItem('isAuthenticated', 'true');
            })
            .addCase(logoutSuccess, (state) => {
                state.isAuthenticated = false;
                state.role = null; // Clear the role on logout
                localStorage.setItem('isAuthenticated', 'false');
            });
    },
});

// export const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         loginSuccess: state => {
//             state.isAuthenticated = true;
//         },
//         logoutSuccess: state => {
//             state.isAuthenticated = false;
//         },
//     },
// });

// export const { loginSuccess, logoutSuccess } = authSlice.actions;

export const selectIsAuthenticated = state => state.auth.isAuthenticated;
export const selectUserRole = (state) => state.auth.role; // Selector for user role

export default authSlice.reducer;
