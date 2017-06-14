import React, { Component } from 'react';
import * as firebase from 'firebase'
import firebaseConfig from '../config/firebaseConfig'
import style from './Fblogin.css'
import m8logo from '../images/m8.jpg';
import PropTypes from 'prop-types';

firebase.initializeApp(firebaseConfig)

const propTypes = {
  postLogin: PropTypes.string,
};

const defaultProps = {

};

class FbLogin extends Component{

    constructor(){
        super();
        this.state = {
            accessToken : null,
            userData : {}
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
            //Redirect
            if(this.props.postLogin){
                document.location = this.props.postLogin;
            }else{
                this.setState({
                    accessToken : result.credential.accessToken,
                    userData : userData
                })
            }

        }.bind(this)).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        }.bind(this));
    }

    renderLoginButton(){
        return (<div><img src= { m8logo } className="fblogin__photo" />
                <button className="btn btn-primary btn-block fblogin__button" onClick={ this.login }>Login with Facebook</button></div>)
    }

    renderStartButton(){
        return (<div><img src= { this.state.userData.photoURL } className="fblogin__photo" />
               <button className="btn btn-success btn-block fblogin__button">{ this.state.userData.displayName }</button></div>) 
    }

    render(){
        return(
            <div className="fblogin">
                { (this.state.accessToken === null) ? this.renderLoginButton() : this.renderStartButton() }
            </div>
        )
    }
}

FbLogin.propTypes = propTypes;
FbLogin.defaultProps = defaultProps;

export default FbLogin;