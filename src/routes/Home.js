import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LoginEmail from '../components/LoginEmail'

import { connect } from 'react-redux'
import { authenticate, actionAccesstoken, user } from '../store/actions'

import Locale from '../class/Locale'


class Home extends Component{

    constructor(){
        super();
        
        const copy = new Locale(this);
        this.copy = copy.get();

        this.state = {
            accessToken : '',
            providerData : ''
        }
    }
    
    handleOnAuthenticate(result){
        console.log(result);
    }

    handleOnError(error){
        console.log(error);
    }    

    render(){
        return(
            <div className='row home'>
                <div className='col-xs-12 col-md-12 col-lg-12 col-xl-12'>
                    <h2 className='home__h2'>{ this.copy.HELLO_WORLD }</h2>
                    <LoginEmail method='login' onCreate={ this.handleOnAuthenticate } onError= { this.handleOnError }/>
                    <hr />
                    <LoginEmail method='register' onCreate={ this.handleOnAuthenticate } onError= { this.handleOnError }/>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return state
}
const mapDispatchToProps = dispatch => {
  return {
    handlerOnAuthenticate(result){
        dispatch(actionAccesstoken(result.credential.accessToken));
        dispatch(authenticate());
        dispatch(user({
            'displayName' : result.user.displayName,
            'photoURL' : result.user.photoURL            
        }));
    },
    handleOnError(e){
        console.log('error', e);
    } 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
