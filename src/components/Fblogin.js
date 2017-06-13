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
    }

    login(){
        const provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('read_custom_friendlists');
        //page || popup || touch
        provider.setCustomParameters({
            'display': 'page' 
        });
        
        const _this = this;
        
        firebase.auth().signInWithPopup(provider).then(function(result) {
            

            /*
            {
                uid: "", 
                displayName: "", 
                photoURL: "", 
                email: "", 
                providerId: "facebook.com"
            } 
            */
            const userData = result.user.providerData[0]

            //Redirect
            if(_this.props.postLogin){
                document.location = _this.props.postLogin;
            }else{
                _this.setState({
                    accessToken : result.credential.accessToken,
                    userData : userData
                })
            }
            //_this.props.setToken(result.credential.accessToken, result.user.providerData[0]);

        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
    }

    render(){
        let layoutLogin = '';
        
        if(this.state.accessToken === null){
            layoutLogin = <div>
                <img src= { m8logo } className="fblogin__photo" />
                <button className="btn btn-primary btn-block fblogin__button" onClick={ this.login.bind(this) }>Login with Facebook</button>
            </div>
        }else{
            layoutLogin = <div>
                <img src= { this.state.userData.photoURL } className="fblogin__photo" />
                <button className="btn btn-success btn-block fblogin__button">{ this.state.userData.displayName }</button>
            </div>
        }

        return(
            <div className="fblogin">
                { layoutLogin }
            </div>
        )
    }

}

FbLogin.propTypes = propTypes;
FbLogin.defaultProps = defaultProps;

export default FbLogin;