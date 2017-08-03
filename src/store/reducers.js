import { combineReducers } from 'redux'

function isAuthenticated(state = false, action){
    switch(action.type){
        case 'isAuthenticated.LOGIN':
            if(typeof(action.payload) === 'boolean'){
                state =  action.payload;
            }        
        break;
        case 'isAuthenticated.LOGOUT':
            if(typeof(action.payload) === 'boolean'){
                state =  action.payload;
            }        
        break;        
    }
    return state; 
}

function locale(state = '', action){
    switch(action.type){
        case 'locale.UPDATE':
            state = (typeof(action.payload) === 'string') ? action.payload : state.locale;
        break
    }
    return state;
}

function credential(state = {
    "accessToken" : "",
    "providerId" : ""
}, action){
    switch(action.type){   
        case 'credential.UPDATE':
            state = action.payload;
        break        
    }
    return state;
}


function user(state = {
    "displayName" : "",
    "email" : "",
    "photoURL" : "",
    "uid" : ""
}, action){
    if(action.type === 'user.UPDATE'){
        if(typeof(action.payload) === 'object'){
            state =  action.payload;
        }
    }
    return state; 
}

export default combineReducers({
    isAuthenticated,
    locale,
    credential,
    user
});