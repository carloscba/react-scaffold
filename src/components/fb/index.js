import React, { Component } from 'react';
import * as firebase from 'firebase'
import firebaseConfig from '../../config/firebaseConfig'

firebase.initializeApp(firebaseConfig)

class Fb extends Component{

    login(){
        const provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('read_custom_friendlists');
        
        const _this = this;
        
        firebase.auth().signInWithPopup(provider).then(function(result) {
            
            _this.props.setToken(result.credential.accessToken, result.user.providerData[0]);

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
    }

    render(){
        return(
            <div>
                <button onClick={ this.login.bind(this) }>Login with Facebook</button>
            </div>
        )
    }

}

export default Fb;