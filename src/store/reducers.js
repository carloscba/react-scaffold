import { combineReducers } from 'redux'

function isAuthenticated(state = false, action){
    switch(action.type){   
        case 'isAuthenticated':
            state = action.payload;
        break;
    }
    return state; 
}

function locale(state = 'es', action){
    
    switch(action.type){
        case 'locale.UPDATE':
            state = action.payload;
        break
    }
    return state; 
    
}

function credential(state = {
    'accessToken' : '',
    'providerId' : ''
}, action){
    if(typeof(action.payload) === 'object'){
        switch(action.type){   
            case 'credential.UPDATE':
                state = action.payload;
            break;
        }
        return state;
    }else{
        return state;
    }
}

function user(state = {
    'displayName' : '',
    'email' : '',
    'photoURL' : '',
    'uid' : ''
}, action){
    if(action.type === 'user.UPDATE'){
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

function currentPath(state = {}, action){
    if(action.type === 'currentPath.UPDATE'){
        if(typeof(action.payload) === 'string'){
            state =  action.payload;
        }
    }
    return state; 
}

function currentPage(state = {}, action){
    if(action.type === 'currentPage.UPDATE'){
        if(typeof(action.payload) === 'string'){
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
    market,
    currentPath,
    currentPage,
    utm
});