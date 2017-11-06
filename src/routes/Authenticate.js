import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from '../templates/routes/Authenticate.css'
import Working from '../components/Working'

//Redux
import { connect } from 'react-redux'
import getDispatchs from '../store/dispatchs'
//Scaffold
import manageError from '../scaffold/Error'
//Firebase
import * as firebase from 'firebase'
import app from '../config/app'

firebase.initializeApp(app.firebase)

class Authenticate extends Component{
    constructor(){
        super();
    }
    
    componentWillMount(){
        if(window.location.protocol === 'https:'){
            if (document.referrer.indexOf('?code=') > -1) {
                //Si llego desde firebase proceso la información
                firebase.auth().getRedirectResult().then(function(result) {
                    if (result.credential) {
                        this.props.handlerIsAuthenticate(true);
                        this.props.history.push(`/`);
                    }
                }.bind(this))
                .catch(function(error) {
                    manageError(error);
                }.bind(this));            

            }else{
                //Si no llego desde firebase inicio proceso de login
                const provider = new firebase.auth.FacebookAuthProvider();
                provider.setCustomParameters({
                    'display' : 'page',
                });
                const signin = firebase.auth().signInWithRedirect(provider);   
            }
        }else{
            alert('You need a https domain')
            this.props.history.push(`/`);
        }        
    }

    render(){
        return(
            <div className='row home'>
                <div className='home__working'><Working isWorking /></div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        store : state
    }
}
const mapDispatchToProps = dispatch => {
  return getDispatchs(dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);
