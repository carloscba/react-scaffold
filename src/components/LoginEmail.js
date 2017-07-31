import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import * as firebase from 'firebase'
import firebaseConfig from '../config/firebaseConfig'
import PropTypes from 'prop-types';
import style from '../templates/components/LoginEmail.css'

firebase.initializeApp(firebaseConfig)

/** Component for Authenticate with EMAIL */
class LoginEmail extends Component{

    email = ''; 
    password = '';

    constructor(){
        super();
        this.state = {
            access_token : null,
            user : {},
            isAuthenticated : false
        }

        this.validate = this.validate.bind(this);
        this.create = this.create.bind(this);
        this.login = this.login.bind(this);

        this.state = {
            isCreated : false
        }
    }

    validate(){
2        
        const fieldEmail = (this.props.method === 'login') ? 'login__input-email' : 'login-create__input-email' ;
        const fieldPassword = (this.props.method === 'login')  ? 'login__input-password' : 'login-create__input-password' ;

        const email = document.getElementsByClassName(fieldEmail)[0];
        const password = document.getElementsByClassName(fieldPassword)[0];

        if(this.props.method === 'login'){
            this.login(email.value, password.value);
        }else{
            this.create(email.value, password.value);
        }
    }

    login(email, password){
        
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(result){
            console.log(result);
        })
        .catch(function(error) {
            console.log(error);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }

    create(email, password){

        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result){
            console.log('result', result);
        }).catch(function(error) {

            console.log('error', error);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });

    }

    render(){

        let layoutRegister = (
            <div className='login-create'>
                <fieldset>
                    <label htmlFor="email" className='login-create__label'>Email</label>
                    <input type='email' name='email' id='email' className='login-create__input-email' />

                    <label htmlFor="password" className='login-create__label'>Password</label>
                    <input type='password' name='password' id='password' className='login-create__input-password' />
                    
                    <input type='button' onClick={ this.validate } value={ this.props.locale.BTN_REGISTER_LABEL } className='login-create__button' />
                </fieldset>
            </div>
        );

        let layoutLogin = (
            <div className='login'>
                <fieldset>
                    <label htmlFor="email" className='login__label'>Email</label>
                    <input type='email' name='email' id='email' className='login__input-email' />

                    <label htmlFor="password" className='login__label'>Password</label>
                    <input type='password' name='password' id='password' className='login__input-password' />
                    
                    <input type='button' onClick={ this.validate } value={ this.props.locale.BTN_LOGIN_LABEL } className='login__button' />
                </fieldset>
            </div>
        );        

        let layoutCreated = (<span>Account Created</span>);
        
        return(
            <div>
                { (this.props.method === 'login') ? layoutLogin : layoutRegister  }
            </div>
        )
    }    

}

LoginEmail.propTypes = {
    onCreate : PropTypes.func,
    onError : PropTypes.func,
    method : PropTypes.string
};

LoginEmail.defaultProps = {
    onCreate : null,
    onError : null,
    method : 'login',
    locale : {
        'BTN_LOGIN_LABEL' : 'Login',
        'BTN_REGISTER_LABEL' : 'Register'
    }    
}

export default LoginEmail;