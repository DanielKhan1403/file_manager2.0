import {
    CREATE_ACCESS_LINK_REQUEST,
    CREATE_ACCESS_LINK_SUCCESS,
    CREATE_ACCESS_LINK_ERROR,
    ACCESS_LINK_REQUEST,
    ACCESS_LINK_SUCCESS,
    ACCESS_LINK_ERROR,
    ACCESS_LINK_DISABLE_REQUEST,
    ACCESS_LINK_DISABLE_SUCCESS,
    ACCESS_LINK_DISABLE_ERROR,
} from '/src/store/actions/appActions/AccessLinkAction.js'


const initialState = {
    accessLinks: [],
    loading: false,
    error: null,
    disabledLink: null,
};


const accessLinkReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ACCESS_LINK_REQUEST:
        case ACCESS_LINK_REQUEST:
        case ACCESS_LINK_DISABLE_REQUEST:
            return { ...state, loading: true, error: null };

        case CREATE_ACCESS_LINK_SUCCESS:
            return {
                ...state,
                loading: false,

                accessLinks: [...state.accessLinks, action.payload]
            };

        case ACCESS_LINK_SUCCESS:
            return {
                ...state,
                loading: false,
                accessLinks: action.payload
            };

        case ACCESS_LINK_DISABLE_SUCCESS:
            return {
                ...state,
                loading: false,
                disabledLink: action.payload,
                accessLinks: state.accessLinks.filter(link => link.id !== action.payload.id),
            };

        case CREATE_ACCESS_LINK_ERROR:
        case ACCESS_LINK_ERROR:
        case ACCESS_LINK_DISABLE_ERROR:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default accessLinkReducer;