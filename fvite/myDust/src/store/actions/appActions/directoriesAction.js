import axios from 'axios';

export const DIRECTORIES_REQUEST = 'DIRECTORIES_REQUEST';
export const DIRECTORIES_SUCCESS = 'DIRECTORIES_SUCCESS';
export const DIRECTORIES_ERROR = 'DIRECTORIES_ERROR';



export const getDirectories = () => async (dispatch) => {
    dispatch({ type: DIRECTORIES_REQUEST });

    try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/app/directories/', {
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        dispatch({
            type: DIRECTORIES_SUCCESS,
            payload: response.data
        });

    } catch (error) {
    dispatch({
        type: DIRECTORIES_ERROR,
        payload : error.response ? error.response.data : { detail: error.response.data }
    });
    }
};