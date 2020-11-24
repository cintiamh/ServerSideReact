import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import authReducer from './usersReducer';

export default combineReducers({
    users: usersReducer,
    auth: authReducer
});
