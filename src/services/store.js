import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../ducks/cart.duck';
import authReducer from '../ducks/login.actions';
import categoriesReducer from '../ducks/categories.duck';
import { loadState, saveState } from './localStorage';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({

    cart: cartReducer,
    auth: authReducer,
    categories: categoriesReducer,
});

const preloadedState = loadState();

export const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    devTools: true,
});

store.subscribe(() => {
    saveState(store.getState());
});

export default store;
