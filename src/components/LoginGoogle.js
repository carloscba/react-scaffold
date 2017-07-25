import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import * as firebase from 'firebase'
import firebaseConfig from '../config/firebaseConfig'
import PropTypes from 'prop-types';
import style from '../templates/components/LoginGoogle.css'

firebase.initializeApp(firebaseConfig)

class LoginGoogle extends Component{

    constructor(){
        super();
        this.state = {
            accessToken : null,
            userData : {},
            isAuthenticated : false
        }
        this.login = this.login.bind(this);
    }

    login(){
        const provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('read_custom_friendlists');
        provider.addScope('publish_actions');
        //page || popup || touch
        provider.setCustomParameters({
            'display': 'touch' 
        });
        
        firebase.auth().signInWithPopup(provider).then(function(result) {
            //{uid: "", displayName: "", photoURL: "", email: "", providerId: "facebook.com" } 
            
            const userData = result.user.providerData[0]

            this.setState({
                accessToken : result.credential.accessToken,
                userData : userData,
                isAuthenticated : true
            })
            
            sessionStorage.setItem('accessToken', result.credential.accessToken);
            sessionStorage.setItem('userData', JSON.stringify(userData));

        }.bind(this)).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        }.bind(this));
    }

    render(){

        let layoutLoginButton = (<button className="login-google__login-button" onClick={ this.login }>{ this.props.locale.BTN_LABEL }</button>);

        let layoutStartButton = (
            <div>
                {(this.props.profileImage) ? <img src= { this.state.userData.photoURL } className="login-google__profile-image" /> : null}
                <span className="login-google__username"> this.state.userData.displayName }</span>
                <Link to={ this.props.postLogin } className="login-google__start-button">{ this.state.userData.displayName }</Link>
            </div>            
        )

        //Automatic redirect to postLogin route or render start button
        if(this.props.postLogin && this.props.autoPostLogin){
            <Redirect to={ this.props.postLogin }/>
        }else{
            return(
                <div className="login-google">
                    { (this.state.accessToken === null) ? layoutLoginButton : layoutStartButton }
                </div>
            )
        }


    }
}

LoginGoogle.propTypes = {
  postLogin: PropTypes.string,
  profileImage : PropTypes.bool,
  autoPostLogin : PropTypes.bool,
  locale : PropTypes.object
};

LoginGoogle.defaultProps = {
    postLogin: '',
    profileImage : false,
    autoPostLogin : false,
    locale : {
        'BTN_LABEL' : 'Login with Google'
    }
};

export default LoginGoogle;