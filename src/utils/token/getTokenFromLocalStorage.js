/**
 * Utility function to get the token from localStorage.
 *
 * @returns {string|null} The token if it exists, otherwise null.
 */
export const getTokenFromLocalStorage = () => {
    //console.log('token', localStorage.getItem('token'));
    return localStorage.getItem('token');
};
