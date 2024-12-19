// src/store/reducers/directoryDetailReducer.js
import {
    DIRECTORY_DETAIL_REQUEST,
    DIRECTORY_DETAIL_SUCCESS,
    DIRECTORY_DETAIL_ERROR,
} from '../../actions/appActions/directoryDetailAction.js';

const initialState = {
    directory: null,
    loading: false,
    error: null,
};

const DirectoryDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case DIRECTORY_DETAIL_REQUEST:
            return { ...state, loading: true, error: null };
        case DIRECTORY_DETAIL_SUCCESS:
            return { ...state, loading: false, directory: action.payload };
        case DIRECTORY_DETAIL_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default DirectoryDetailReducer;
