import React, { Component } from 'react';
import * as firebase from 'firebase'
import firebaseConfig from './firebaseConfig'

firebase.initializeApp(firebaseConfig)

class Fb extends Component{
    
    login = () => {
        
        const provider = new firebase.auth.FacebookAuthProvider();
        
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
            console.log(token, user);
        }).catch(function(error) {
            console.log(error);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });        
        console.log(firebase)
    }

    render(){
        return(
            <div>
                <button onClick={ this.login }>Login with Facebook</button>
            </div>
        )
    }

}

export default Fb;