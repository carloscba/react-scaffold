import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from '../templates/routes/Authenticate.css'
import Working from '../material/Working'
//Redux
import { connect } from 'react-redux'
import { actionCredential, actionAuthenticate, actionUser} from '../store/actions'

//Firebase
import * as firebase from 'firebase'
import firebaseConfig from '../config/firebaseConfig'

firebase.initializeApp(firebaseConfig)

class Callback extends Component{
    constructor(){
        super();
        
        if (document.referrer.indexOf('?code=') > -1) {
            //Si llego desde firebase proceso la información
            firebase.auth().getRedirectResult().then(function(result) {
                
                if (result.credential) {
                    //this.props.handlerOnAuthenticate(result, this.props)                
                }

            }.bind(this))
            .catch(function(error) {
                
                console.log('error', error)

            }.bind(this));            

        }else{
            //Si no llego desde firebase inicio proceso de login
            const provider = new firebase.auth.FacebookAuthProvider();
            provider.setCustomParameters({
                'display' : 'page',
            });

            //const signin = firebase.auth().signInWithRedirect(provider);   
        }
   
    }

    render(){
        return(<Working open={ true } />)
    }

}

const mapStateToProps = state => {
    return state
}
const mapDispatchToProps = dispatch => {
  return {

    handlerOnAuthenticate(result, props){

        //Set initial state
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
        

        props.history.push('/');

        

    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Callback);
