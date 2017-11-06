export function actionIsAuthenticated(status){
    return {
        type: 'isAuthenticated.'+ status,
        payload: (status === 'LOGIN')
    }
}

export function actionLocale(locale){
    return {
        type: 'locale.UPDATE',
        payload: locale
    }
}

export function actionCredential(credential){
    return {
        type: 'credential.UPDATE',
        payload: credential
    }    
}



export function actionUser(data){
    return {
        type: 'user.UPDATE',
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