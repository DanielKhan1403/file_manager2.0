import { DIRECTORIES_REQUEST, DIRECTORIES_SUCCESS, DIRECTORIES_ERROR } from "../../actions/appActions/directoriesAction.js";

const initialState = {
    directories: [],
    loading: false,
    error: null,
}


const DirectoriesReducer = (state = initialState, action) => {
    switch(action.type) {
        case DIRECTORIES_REQUEST:
            return {...state, loading: true, error: null};
        case DIRECTORIES_SUCCESS:
            return {...state, loading: false, directories: action.payload};
        case DIRECTORIES_ERROR:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default DirectoriesReducer;