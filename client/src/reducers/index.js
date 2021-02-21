import { combineReducers } from 'redux';
import authReducer from './authReducer';
import itemReducer from './itemsReducer';

export default combineReducers({
    auth: authReducer,
    items: itemReducer
});
