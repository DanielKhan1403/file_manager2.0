import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
} from '/src/store/actions/authActions/loginAction.js';

const initialState = {
    isLoading: false,
    isAuthenticated: !!localStorage.getItem('accessToken'), // Проверка токена в localStorage
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    user: null,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                accessToken: action.payload.access,
                refreshToken: action.payload.refresh,
                user: action.payload.user || null,
                error: null,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
