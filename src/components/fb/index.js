import React, { Component } from 'react';
import * as firebase from 'firebase'
import firebaseConfig from './firebaseConfig'

firebase.initializeApp(firebaseConfig)

class Fb extends Component{

    login(){
        const provider = new firebase.auth.FacebookAuthProvider();
        let _this = this;
        
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
            _this.props.setToken(result.credential.accessToken);
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