// action reducer for the redux concept 
// here need combine all the reducer and introduce a react thunk for the middleware concepts
// use action for every api calls only taken in actions// src/store/index.js

import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './reducer'; 

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
