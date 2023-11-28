export const setSessionItem = (key, value) => {
   return sessionStorage.setItem(key, value);
};
export const getSessionItem = (key) => {
   return sessionStorage.getItem(key) || null;
};
export const removeItem = (key) => {
   return sessionStorage.removeItem(key);
};

export const clearData = () => sessionStorage.clear();

export const clearUserDetails = () => {
   removeItem('userDetails');
   removeItem('token');
};


export const storeUserToken = (token) => {
   return setSessionItem('token', token);
};

export const getUserToken = () => {
   return getSessionItem('token');
};
