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
        default:
            state = '';
        break;
    }
    return state; 
}

function locale(state = '', action){
    switch(action.type){
        case 'locale.UPDATE':
            state = (typeof(action.payload) === 'string') ? action.payload : state.locale;
        break
        default:
            state = '';
        break;
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
        break;
        default:
            state = {
                "accessToken" : "",
                "providerId" : ""
            };
        break;

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

function error(state = {
    "code" : "",
    "description" : "",
}, action){
    if(action.type === 'error.UPDATE'){
        if(typeof(action.payload) === 'object'){
            state =  action.payload;
        }
    }
    return state; 
}

function market(state = {}, action){
    if(action.type === 'market.UPDATE'){
        if(typeof(action.payload) === 'object'){
            state =  action.payload;
        }
    }
    return state; 
}

function utm(state = {}, action){
    if(action.type === 'utm.UPDATE'){
        if(typeof(action.payload) === 'string'){
            state =  action.payload;
        }
    }
    return state; 
}

export default combineReducers({
    isAuthenticated,
    locale,
    credential,
    user,
    error,
    market,
    utm
});