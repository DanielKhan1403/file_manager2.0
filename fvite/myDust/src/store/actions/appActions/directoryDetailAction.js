// src/store/actions/appActions/directoryDetailAction.js
import axios from 'axios';

export const DIRECTORY_DETAIL_REQUEST = 'DIRECTORY_DETAIL_REQUEST';
export const DIRECTORY_DETAIL_SUCCESS = 'DIRECTORY_DETAIL_SUCCESS';
export const DIRECTORY_DETAIL_ERROR = 'DIRECTORY_DETAIL_ERROR';

export const getDirectoryDetail = (id) => async (dispatch) => {
    dispatch({ type: DIRECTORY_DETAIL_REQUEST });

    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/app/directories/${id}/`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });

        dispatch({
            type: DIRECTORY_DETAIL_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: DIRECTORY_DETAIL_ERROR,
            payload: error.response ? error.response.data : { detail: 'Error fetching directory detail' },
        });
    }
};
