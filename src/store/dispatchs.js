import { connect } from 'react-redux'
import {actionIsAuthenticated, actionLocale, actionCredential } from '../store/actions'

export default function getDispatchs(dispatch){
    return {
        handlerIsAuthenticate(status){
            dispatch(actionIsAuthenticated(status))
        },
        handlerLocale(locale){
            dispatch(actionLocale(locale))
        },
        handlerCredential(credentials){
            actionCredential(credentials)
        }
        /*,
        handlerOnAuthenticate(result, props){
            dispatch(actionCredential({
                'accessToken' : result.credential.accessToken,
                'providerId' : result.credential.providerId
            }))
            dispatch(actionUser({
                'uid' : result.user.providerData[0].uid,
                'displayName' : result.user.providerData[0].displayName,
                'email' : result.user.providerData[0].email,
                'photoURL' : result.user.providerData[0].photoURL,
            }));
            dispatch(actionAuthenticate('LOGIN'));
        },
        handleOnError(e){
        }
        */
    }
}