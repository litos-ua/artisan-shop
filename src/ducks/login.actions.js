
import { createSlice } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';

export const loginSuccess = createAction('LOGIN_SUCCESS');
export const logoutSuccess = createAction('LOGOUT_SUCCESS');


const initialState = {
    isAuthenticated: false,
    id: null,
    role: null,

};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(loginSuccess, (state, action) => {
                state.isAuthenticated = true;
                state.id = action.payload;
                state.role = action.payload;
                localStorage.setItem('isAuthenticated', 'true');
            })
            .addCase(logoutSuccess, (state) => {
                state.isAuthenticated = false;
                state.id = null;
                state.role = null; // Clear the role on logout
                localStorage.setItem('isAuthenticated', 'false');
            });
    },
});


export const selectIsAuthenticated = state => state.auth.isAuthenticated;
export const selectUserId = (state) => state.auth.id
export const selectUserRole = (state) => state.auth.role;

export default authSlice.reducer;