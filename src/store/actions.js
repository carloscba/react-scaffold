import axios from 'axios'

export function actionCredential(credential){
    return {
        type: 'credential.UPDATE',
        payload: credential
    }    
}
export function actionAuthenticate(type){
    return {
        type: 'isAuthenticated.'+ type,
        payload: (type === 'LOGIN')
    }
}

export function actionUser(data){
    return {
        type: 'user.UPDATE',
        payload: data
    }
}