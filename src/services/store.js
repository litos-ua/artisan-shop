import { configureStore } from '@reduxjs/toolkit';
import { resetOrders } from '../ducks/orders.duck';
import cartReducer from '../ducks/cart.duck';
import authReducer from '../ducks/login.actions';
import categoriesReducer from '../ducks/categories.duck';
import productsByCategoryReducer from '../ducks/productsByCategory.duck';
import productDetailsReducer from '../ducks/product.duck';
import ordersReducer from '../ducks/orders.duck';
import { loadState, saveState } from './localStorage';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({

    cart: cartReducer,
    auth: authReducer,
    categories: categoriesReducer,
    productsByCategory: productsByCategoryReducer,
    productDetails: productDetailsReducer,
    orders: ordersReducer,
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

store.dispatch(resetOrders());

export default store;
