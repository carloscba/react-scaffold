import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import * as firebase from 'firebase'
import firebaseConfig from '../config/firebaseConfig'
import PropTypes from 'prop-types';
import style from '../templates/components/LoginGoogle.css'

import { createStore } from 'redux' 
import appReducer from '../store/reducers'
import { authenticate, actionAccesstoken } from '../store/actions'

firebase.initializeApp(firebaseConfig)

/** Component for Authenticate with google */
class LoginGoogle extends Component{

    constructor(){
        super();
        this.state = {
            access_token : null,
            user : {},
            isAuthenticated : false
        }
        this.login = this.login.bind(this);
    }

    /**
     * Authenticate on Google
     * https://developers.google.com/identity/protocols/googlescopes 
     */    
    login(){
        const provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope('profile');
        provider.addScope('email');
        
        firebase.auth().signInWithPopup(provider).then(function(result) {
            
            this.setState({
                access_token : result.credential.accessToken,
                user : result.user,
                isAuthenticated : true
            })

            /*
            const store = createStore(appReducer);
            store.subscribe(()=>{
                console.log(store.getState());
            })

            store.dispatch(actionAccesstoken(result.credential.accessToken));            
            */
            sessionStorage.setItem('provider', 'google');
            sessionStorage.setItem('access_token', result.credential.accessToken);

            (this.props.onAuthenticate) ? this.props.onAuthenticate(result) : null; 

        }.bind(this)).catch(function(error) {
        
            // Handle Errors here.
            (this.props.onError) ? this.props.onError(error) : null;
        
        }.bind(this));
    }

    render(){
        console.log('Render componente', this.props)

        let layoutLoginButton = (<button className="login-google__login-button" onClick={ this.login }>{ this.props.locale.BTN_LABEL }</button>);

        let layoutStartButton = (
            <div>
                <img className="login-google__photo" src={ this.state.user.photoURL } />
                <span className="login-google__username">{ this.state.user.displayName }</span>
            </div>
        )
        
        return(
            <div className="login-google">
                { (!this.state.isAuthenticated) ? layoutLoginButton : layoutStartButton }
            </div>
        )
    }
}


LoginGoogle.propTypes = {
    isAuthenticated : PropTypes.bool,
    onAuthenticate : PropTypes.func,
    onError : PropTypes.func,
    locale : PropTypes.object
};

LoginGoogle.defaultProps = {
    isAuthenticated : false,
    onAuthenticate : null,
    onerror : null,
    locale : {
        'BTN_LABEL' : 'Login with Google'
    }
};


export default LoginGoogle;