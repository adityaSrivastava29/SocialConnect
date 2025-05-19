import { combineReducers } from 'redux';
import postReducer from './postReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  postState: postReducer,
  userState: userReducer,
});

export default rootReducer;
