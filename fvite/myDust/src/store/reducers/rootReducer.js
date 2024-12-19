import { combineReducers } from 'redux';
import authReducer from './authReducers/authReducer.js';
import loginReducer from "./authReducers/loginReducer.js";
import GetDirectoriesReducer from "./appReducers/GetDirectoriesReducer.js";
import DirectoryDetailReducer from "./appReducers/directorydetailReducer.js";
import AccessLinkReducer from "./appReducers/accessLinkReducer.js";

const rootReducer = combineReducers({
    auth: authReducer,
    login: loginReducer,
    directories: GetDirectoriesReducer,
    directoryDetail: DirectoryDetailReducer,
    accessLink: AccessLinkReducer,
});

export default rootReducer;
