import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginUser = (username, password) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/login/', {
            username,
            password,
        });

        const { access, refresh, user } = response.data;

        if (access && refresh) {
            // Сохраняем токены в localStorage
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: { access, refresh, user },
            });
        } else {
            throw new Error('Tokens are missing in the response');
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response ? error.response.data : { detail: error.message || 'Unknown error occurred' },
        });
    }
};
