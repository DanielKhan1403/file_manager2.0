import axios from 'axios';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const registerUser = (userData) => async (dispatch)=>{
    dispatch({type: REGISTER_REQUEST});


    try{
        const response = await axios.post("http://127.0.0.1:8000/api/v1/auth/register/", userData,
            {
                headers:{
                    'Content-Type': 'application/json',
                    'accept': 'application/json',

                },
            }
            );
        console.log(response.data);
        dispatch({type: REGISTER_SUCCESS, payload: response.data});


    }catch(error){
        const errorResponse = error.response ? error.response.data : { error: 'Неизвестная ошибка' };
        dispatch({ type: 'REGISTER_FAILURE', payload: errorResponse });
        return { error: errorResponse };

    }
};
