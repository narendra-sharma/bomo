
export const signUp = (user) => {
    return {
        type: 'SIGN_UP',
        payload: user,
    };
};

export const logIn = (user) => {
    return {
      type: 'LOG_IN',
      payload: user,
    };
  };
  
  export const logOut = () => {
    return {
      type: 'LOG_OUT',
    };
  };

  export const setUserType = (usertype) => {
    return {
        type: 'SET_USER_TYPE',
        payload: usertype,
    };
};

