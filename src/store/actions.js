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

export function actionLocale(data){
    return {
        type: 'locale.UPDATE',
        payload: data
    }
}

export function actionUser(data){
    return {
        type: 'user.UPDATE',
        payload: data
    }
}

export function actionError(data){
    return {
        type: 'error.UPDATE',
        payload: data
    }
}

export function actionMarket(data){
    return {
        type: 'market.UPDATE',
        payload: data
    }
}

export function actionUtm(data){
    return {
        type: 'utm.UPDATE',
        payload: data
    }
}