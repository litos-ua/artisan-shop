import  {saveCartItemToLocalStorage, clearLocalStorage, removeCartItemFromLocalStorage,
         getCartItemsFromLocalStorage} from './localStorageUtils';
import {saveCartItemToReduxStore, removeCartItemFromReduxStore, getCartItemsFromReduxStore,
        clearReduxStore} from '../../../ducks';

export const dataFunc = (typeOfRepo, action, params=[]) => {
    const actions = {
        'LocalStorage': {
            saveCartItem: saveCartItemToLocalStorage,
            getCartItems: getCartItemsFromLocalStorage,
            removeCartItem: removeCartItemFromLocalStorage,
            clearRepo: clearLocalStorage,
        },
        'ReduxStore': {
            saveCartItem: saveCartItemToReduxStore,
            getCartItems: getCartItemsFromReduxStore,
            removeCartItem: removeCartItemFromReduxStore,
            clearRepo: clearReduxStore,
        },
    };


    if (actions[typeOfRepo] && actions[typeOfRepo][action]) {

        return actions[typeOfRepo][action](...params);
    } else {
        console.error('Action or repository type does not exist');
    }
};