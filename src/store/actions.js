import axios from 'axios'

export function actionAccesstoken(access_token){
    return {
        type: 'ACCESS_TOKEN.ADD',
        payload: access_token
    }    
}
export function authenticate(){
    return {
        type: 'LOGIN',
        payload: true
    }
}

export function deauthenticate(){
    return {
        type: 'LOGIN',
        payload: false
    }
}