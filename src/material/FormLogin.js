import React, { Component } from 'react'
import PropTypes from 'prop-types';
//Style
import style from '../templates/material/FormLogin.css'
//Material
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = {
  paper : {
    width: '100%',
    padding : 15,
    textAlign: 'center',
    display: 'inline-block'
  }
}

class FormLogin extends Component{

  constructor(){
      super();
      this.login = this.login.bind(this);
  }

  login(){
    alert('login');
  }

  render(){
      return(
        <Paper style={this.props.styles.paper} zDepth={1} rounded>
          <TextField
            id="name"
            label={ this.props.locale.labelLogin }
            labelClassName = 'formLogin__label'
            inputClassName = 'formLogin__input'
            margin="normal"
            fullWidth
          />

          <TextField
            id="password"
            label={ this.props.locale.labelPassword }
            labelClassName = 'formLogin__label'
            inputClassName = 'formLogin__input'
            margin="normal"
            type="password"
            fullWidth
          />

          <Button
            raised
            fullWidth
            color="primary"
            className='formLogin__button'
            onClick={ this.login }
            >
              { this.props.locale.labelLogin }
          </Button>
        </Paper>
      )
  }

}

FormLogin.propTypes = {
  styles: PropTypes.object,
  locale: PropTypes.object
};

FormLogin.defaultProps = {
    styles : styles,
    locale : {
        'labelUsuario' : 'User',
        'labelPassword' : 'Password',
        'labelLogin' : 'Login'
    }
};

export default FormLogin;
