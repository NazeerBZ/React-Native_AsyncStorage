import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import DocterInfo from './reducers/DocterInfo.js';

const rootReducer = combineReducers({
    DocterInfo
})

export default Store = createStore(rootReducer);