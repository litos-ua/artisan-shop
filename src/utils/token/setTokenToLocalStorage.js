/**
 * Utility function to set the token to localStorage.
 */

export const setTokenToLocalStorage = (token) => {
    return localStorage.setItem('token',token);
};