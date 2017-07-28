import { combineReducers } from 'redux'

function isAuthenticated(state = false, action){
    if(action.type === 'LOGIN'){
        if(typeof(action.payload) === 'boolean'){
            state =  action.payload;
        }
    }
    return state; 
}

function access_token(state = "", action){
    
    switch(action.type){
        case 'ACCESS_TOKEN.ADD':
            state = action.payload;
        break
        case 'ACCESS_TOKEN.DELETE':
            state = '';
        break        
    }
    return state;

}

function locale(state = "", action){
    switch(action.type){
        case 'LOCALE.CHANGE':
            state = (typeof(action.payload) === 'string') ? action.payload : state.locale;
        break
    }
    return state;
}

function user(state = {
        'username' : '',
        'profile' : '',
        'id' : ''
    }, action){
    if(action.type === 'USER.UPDATE'){
        if(typeof(action.payload) === 'object'){
            state =  action.payload;
        }
    }
    return state; 
}

export default combineReducers({
    access_token,
    locale,
    isAuthenticated,
    user
});