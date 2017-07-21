import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import * as firebase from 'firebase'
import firebaseConfig from '../config/firebaseConfig'
import m8logo from '../images/m8.jpg';
import PropTypes from 'prop-types';
import style from '../templates/components/Fblogin.css'

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

        let layoutLoginButton = (
            <div>
                <button className="fblogin__button" onClick={ this.login }>{ this.props.locale.BTN_LABEL }</button>
            </div>
        )

        let layoutStartButton = (
            <div>
                {(this.props.profileImage) ? <img src= { this.state.userData.photoURL } className="fblogin__photo" /> : null}
                <Link to={ this.props.postLogin } className="fblogin__button">{ this.state.userData.displayName }</Link>
            </div>            
        )

        if(this.props.postLogin && this.props.autoPostLogin){
            <Redirect to={ this.props.postLogin }/>
        }

        return(
            <div className="fblogin">
                { (this.state.accessToken === null) ? layoutLoginButton : layoutStartButton }
            </div>
        )
    }
}

FbLogin.propTypes = {
  postLogin: PropTypes.string,
  profileImage : PropTypes.bool,
  autoPostLogin : PropTypes.bool,
  locale : PropTypes.object
};

FbLogin.defaultProps = {
    postLogin: '',
    profileImage : false,
    autoPostLogin : false,
    locale : {
        'BTN_LABEL' : 'Login with Facebook'
    }
};

export default FbLogin;