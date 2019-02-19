import {createStore, applyMiddleware, combineReducers} from "redux";
import MyReducer from './reducer.js';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
     MyReducer
});

const middleware = applyMiddleware(thunk);

let store = createStore(rootReducer,middleware);

export default store;