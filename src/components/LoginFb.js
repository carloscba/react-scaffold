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
        /*
        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
                this.props.handlerOnAuthenticate(result)
            }
        }.bind(this));        
        */
        const provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('publish_actions');
        //page || popup || touch
        provider.setCustomParameters({
            'display' : 'page',
        });
        
        firebase.auth().signInWithRedirect(provider)

    }

    render(){

        let layoutLoginButton = (
            <div>
                <span className="login-fb__uptext">
                    Conéctate con tu cuenta<br />
                    de Facebook y recibe<br />
                    tu mitad de ticket.
                </span>
                <button className="login-fb__login-button" onClick={ this.login }>{ this.props.locale.BTN_LABEL }</button>
            </div>
        );

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