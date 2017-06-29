import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import * as firebase from 'firebase'
import firebaseConfig from '../config/firebaseConfig'
import m8logo from '../images/m8.jpg';
import PropTypes from 'prop-types';
import style from './Fblogin.css'

firebase.initializeApp(firebaseConfig)

class FbLogin extends Component{

    constructor(){
        super();
        this.state = {
            accessToken : null,
            userData : {},
            isAuthenticated : false
        }
        this.login = this.login.bind(this);
        this.renderLoginButton = this.renderLoginButton.bind(this);
        this.renderStartButton = this.renderStartButton.bind(this);
    }

    login(){
        const provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('read_custom_friendlists');
        //page || popup || touch
        provider.setCustomParameters({
            'display': 'page' 
        });
        
        firebase.auth().signInWithPopup(provider).then(function(result) {
            //{uid: "", displayName: "", photoURL: "", email: "", providerId: "facebook.com" } 
            
            const userData = result.user.providerData[0]

            this.setState({
                accessToken : result.credential.accessToken,
                userData : userData,
                isAuthenticated : true
            })

        }.bind(this)).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        }.bind(this));
    }

    renderLoginButton(){
        return (<div><button className="fblogin__button" onClick={ this.login }>Login with Facebook</button></div>)
    }

    renderStartButton(){
        return (
            <div>
               {(this.props.profileImage) ? <img src= { this.state.userData.photoURL } className="fblogin__photo" /> : null}
               <Link to={ this.props.postLogin } className="fblogin__button">{ this.state.userData.displayName }</Link>
            </div>) 
    }

    render(){
        if(this.props.postLogin && this.props.autoPostLogin){
            <Redirect to={ this.props.postLogin }/>
        }

        return(
            <div className="fblogin">
                { (this.state.accessToken === null) ? this.renderLoginButton() : this.renderStartButton() }
            </div>
        )
    }
}

FbLogin.propTypes = {
  postLogin: PropTypes.string,
  profileImage : PropTypes.bool,
  autoPostLogin : PropTypes.bool
};

FbLogin.defaultProps = {
    postLogin: '',
    profileImage : false,
    autoPostLogin : false
};

export default FbLogin;