import { combineReducers } from 'redux'

function isAuthenticated(state = {}, action){
    if(action.type === 'LOGIN'){
        if(typeof(action.payload) === 'boolean'){
            state =  action.payload;
        }
    }
    return state; 
}

function user(state = {}, action){
    if(action.type === 'USER.UPDATE'){
        if(typeof(action.payload) === 'object'){
            state =  action.payload;
        }
    }
    return state; 
}

export default combineReducers({
    isAuthenticated,
    user
});