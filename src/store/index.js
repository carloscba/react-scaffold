import { createStore, applyMiddleware } from 'redux' 
import appReducer from './reducers'

const myMiddleware = store => next => action => {
    console.log('myMiddleware');
    let result;
    result = next(action);
    return result
}

export default (initialState = {}) => {
    return applyMiddleware(myMiddleware)(createStore)(appReducer, initialState)
}