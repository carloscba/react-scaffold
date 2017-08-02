import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import LoginFb from '../components/LoginFb'
import Locale from '../class/Locale'
import style from '../templates/routes/Home.css'
//Redux
import { connect } from 'react-redux'
import { actionCredential, actionAuthenticate, actionUser, actionCoupons } from '../store/actions'

class Home extends Component{

    constructor(){
        super();
        const copy = new Locale(this);
        this.copy = copy.get();
    }

    render(){
        console.log('this.props.match.params.uid', this.props.match.params.uid);
        const layoutStart = (
            <div className='user-data'>
                <img src={ this.props.user.photoURL } className='user-data__photo' />
                <span className='user-data__name'>{ this.props.user.displayName }</span>
                <a className='user-data__button' href='./share' >Continuar</a>
            </div>
        );

        return(
            <div className='row home'>
                <div className='col-xs-12 col-md-12 col-lg-12 col-xl-12'>
                    <h2 className='home__h2'>{ this.copy.title }</h2>
                    { ( this.props.isAuthenticated ) ? layoutStart : <LoginFb onAuthenticate = { this.props.handlerOnAuthenticate } onError = { this.props.handleOnError } /> }
                    
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

        //Set initial state
        dispatch(actionCredential({
            'accessToken' : result.credential.accessToken,
            'providerId' : result.credential.providerId
        }))

        dispatch(actionAuthenticate('LOGIN'));
        
        dispatch(actionUser({
            'displayName' : result.user.displayName,
            'email' : result.user.email,
            'photoURL' : result.user.photoURL,
            'uid' : result.user.uid
        }));

        const url = `http://dev.m8agency.com/kfc_chicknshare_json_demo/user.json?uid=${result.user.uid}`;
        axios.get(url).then(function (response) {
            
            //dispatch(actionCoupons({}));
            

        }).catch(function (error) {
            dispatch(actionCoupons(
                [{
                    "authorId":			"ABC789",
                    "timeGenerated": 	"Y-m-d H:i",
                    "timeRedeemed": 	"Y-m-d H:i",
                    "storeId":			"555",
                    "friendId":			"ASD567"
                },
                {
                    "authorId":			"ASD567",
                    "timeGenerated": 	"Y-m-d H:i",
                    "timeRedeemed": 	"Y-m-d H:i",
                    "storeId":			"333",
                    "friendId":			"ASD567"
                }]
            ));
        });


    },
    handleOnError(e){
        console.log('error', e);
    } 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
