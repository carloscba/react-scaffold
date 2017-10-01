import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios'
import DjangoRest from '../class/DjangoRest'
//Style
import style from '../templates/material/FormLogin.css'
//Material
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import DialogError from '../material/DialogError'

const styles = {
  paper : {
    width: '100%',
    marginTop : 30,
    padding : 15,
    textAlign: 'center',
    display: 'inline-block'
  }
}

class FormLogin extends Component{

  constructor(){
      super();
      this.state = {
        'error' : {
          'open' : false,
          'title' : '',
          'message' : ''
        }

      }

      this.login = this.login.bind(this);
      this.onCloseHandler = this.onCloseHandler.bind(this);
      this.djangoRest = new DjangoRest();
  }

  login(){

    const username = document.getElementById('fieldUsuario');
    const password = document.getElementById('fieldPassword');
    const button = document.getElementById('buttonLogin');

    button.setAttribute('disabled', '')

    const url = 'api/login/';
    const data = {
    	'username' : username.value,
      'password' : password.value
    }

    this.djangoRest.post(url, data)
      .then(function(response){

        button.removeAttribute('disabled');
        if(response.data.token){
          (this.props.onLogin) ? this.props.onLogin(response.data.token) : null;
        }

      }.bind(this))
      .catch(function(error){
        this.setState({
          'error' : {
            'open' : true,
            'title' : 'Login error',
            'message' : 'User dont exist'
          }
        })
        button.removeAttribute('disabled');
    }.bind(this));
  }

  onCloseHandler(){
    this.setState({
      'error' : false
    })
  }

  render(){
      return(
        <div>
          <DialogError open={ this.state.error.open } title={ this.state.error.title } message={ this.state.error.message } onClose={ this.onCloseHandler} />
          <Paper style={this.props.styles.paper} zDepth={1} rounded>
            <TextField
              id="fieldUsuario"
              label={ this.props.locale.labelUsuario }
              labelClassName = 'formLogin__label'
              inputClassName = 'formLogin__input'
              margin="normal"
              defaultValue = ""
              required
              fullWidth
            />

            <TextField
              id="fieldPassword"
              label={ this.props.locale.labelPassword }
              labelClassName = 'formLogin__label'
              inputClassName = 'formLogin__input'
              margin="normal"
              type="password"
              defaultValue = ""
              required
              fullWidth
            />

            <Button
              id = "buttonLogin"
              raised
              fullWidth
              color="primary"
              className='formLogin__button'
              onClick={ this.login }
              >
                { this.props.locale.labelLogin }
            </Button>
          </Paper>
        </div>
      )
  }

}

FormLogin.propTypes = {
  styles: PropTypes.object,
  locale: PropTypes.object,
  onLogin : PropTypes.func
};

FormLogin.defaultProps = {
    styles : styles,
    onlogin : null,
    locale : {
        'labelUsuario' : 'User',
        'labelPassword' : 'Password',
        'labelLogin' : 'Login'
    }
};

export default FormLogin;
