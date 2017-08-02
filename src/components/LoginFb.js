import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import * as firebase from 'firebase'
import firebaseConfig from '../config/firebaseConfig'
import PropTypes from 'prop-types';
import style from '../templates/components/LoginFb.css'

firebase.initializeApp(firebaseConfig)

/** Component for Authenticate with Facebook */
class LoginFb extends Component{

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
     * Authenticate on Facebook
     */    
    login(){
        const provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('publish_actions');
        //page || popup || touch
        provider.setCustomParameters({
            'display': 'touch' 
        });
        
        firebase.auth().signInWithPopup(provider).then(function(result) {

            (this.props.onAuthenticate) ? this.props.onAuthenticate(result) : null; 

        }.bind(this)).catch(function(error) {
        
            // Handle Errors here.
            (this.props.onError) ? this.props.onError(error) : null;
        
        }.bind(this));
    }

    render(){

        let layoutLoginButton = (<button className="login-fb__login-button" onClick={ this.login }>{ this.props.locale.BTN_LABEL }</button>);

        let layoutStartButton = (
            <div>
                <img className="login-fb__photo" src={ this.props.user.photoURL } />
                <span className="login-fb__username">{ this.props.user.displayName }</span>
            </div>
        )
        
        return(
            <div className="login-fb">
                { (!this.props.isAuthenticated) ? layoutLoginButton : layoutStartButton }
            </div>
        )
    }
}


LoginFb.propTypes = {
    isAuthenticated : PropTypes.bool,
    onAuthenticate : PropTypes.func,
    onError : PropTypes.func,
    user : PropTypes.object,
    locale : PropTypes.object
};

LoginFb.defaultProps = {
    isAuthenticated : false,
    onAuthenticate : null,
    onerror : null,
    user: {},
    locale : {
        'BTN_LABEL' : 'Login with Facebook'
    }
};


export default LoginFb;