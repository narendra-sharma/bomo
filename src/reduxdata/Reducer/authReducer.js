const initialState = {
    user: null,
    isAuthenticated: false,
    role: JSON.parse(localStorage.getItem('USERTYPE')),
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return { ...state, user: action.payload, isAuthenticated: true, };
        case 'SIGN_UP':
            return { ...state, user: action.payload, isAuthenticated: true, };
        case 'LOG_OUT':
            return { ...state, user: null, isAuthenticated: false, role: null, };
        case 'SET_USER_TYPE':
            return { ...state, role: action.payload, };
        default:
            return state;
    }
};

export default authReducer;