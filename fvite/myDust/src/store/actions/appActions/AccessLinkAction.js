import axios from 'axios';



export const CREATE_ACCESS_LINK_REQUEST = "CREATE_ACCESS_LINK_REQUEST";
export const CREATE_ACCESS_LINK_SUCCESS = "CREATE_ACCESS_LINK_SUCCESS";
export const CREATE_ACCESS_LINK_ERROR = "CREATE_ACCESS_LINK_ERROR";

export const ACCESS_LINK_REQUEST = "ACCESS_LINK_REQUEST";
export const ACCESS_LINK_SUCCESS = "ACCESS_LINK_SUCCESS";
export const ACCESS_LINK_ERROR = "ACCESS_LINK_ERROR";

export const ACCESS_LINK_DISABLE_REQUEST = "ACCESS_LINK_DISABLE_REQUEST";
export const ACCESS_LINK_DISABLE_SUCCESS = "ACCESS_LINK_DISABLE_SUCCESS";
export const ACCESS_LINK_DISABLE_ERROR = "ACCESS_LINK_DISABLE_ERROR";




export const createAccessLink = (directoryData) => async (dispatch) => {
    dispatch({ type: CREATE_ACCESS_LINK_REQUEST });

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/app/access-links/', directoryData, {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        console.log(response.data);
        dispatch({ type: CREATE_ACCESS_LINK_SUCCESS, payload: response.data });
    } catch (error) {
        console.log(error);
        dispatch({ type: CREATE_ACCESS_LINK_ERROR, error: error.response.data });
    }
};


export const getAccessLinks = () => async (dispatch) => {
    dispatch({ type: ACCESS_LINK_REQUEST });

    try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/app/access-links/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });

        dispatch({ type: ACCESS_LINK_SUCCESS, payload: response.data });
    } catch (error) {

        dispatch({ type: ACCESS_LINK_ERROR, payload: error.message });
    }
};

// Деактивация ссылки доступа
export const disableAccessLink = (id) => async (dispatch) => {
    dispatch({ type: ACCESS_LINK_DISABLE_REQUEST });

    try {
        const response = await axios.delete(
            `http://127.0.0.1:8000/api/v1/app/access-links/${id}/disable/`,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
            }

        );

        dispatch({ type: ACCESS_LINK_DISABLE_SUCCESS, payload: response.data });
    } catch (error) {
        console.log(error)
        dispatch({ type: ACCESS_LINK_DISABLE_ERROR, payload: error.message });
    }
};