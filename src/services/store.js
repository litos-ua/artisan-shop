import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../ducks/cart.duck';
import authReducer from '../ducks/login.actions';
import { loadState, saveState } from './localStorage';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({

    cart: cartReducer,
    auth: authReducer,
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
