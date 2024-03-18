export const saveCartItemToLocalStorage = (productKey, cartData) => {
    console.log('productKey = ', productKey);
    console.log('cartData777 = ', cartData);
    localStorage.setItem(`cartData_${productKey}`, JSON.stringify(cartData));
};

export const getCartItemsFromLocalStorage = () => {
    const keys = Object.keys(localStorage).filter(key => key.includes('cartData'));
    return keys.map(key => JSON.parse(localStorage.getItem(key)));
};

export const removeCartItemFromLocalStorage = (productKey) => {
    localStorage.removeItem(`cartData_${productKey}`);
    saveCartItemToLocalStorage(productKey,[]);
};

export const clearLocalStorage = () => {
    localStorage.clear();
};