import React, { Component } from 'react'
import { BrowserRouter as Link } from 'react-router-dom'
import logo from '../images/m8.jpg'
import style from '../templates/components/Menu.css'

//redux
import { connect } from 'react-redux'
import appReducer from '../store/reducers'
import { actionCredential, actionAuthenticate, actionUser, actionCoupons } from '../store/actions'


class Menu extends Component{

    render(){
        return(
            <div>
                <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a href="./" className="navbar-brand">
                            <img alt="Brand" src = { logo } width="60" />
                        </a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="/terms">Terms</a></li>
                        <li><a href="/test">Test</a></li>
                        { (this.props.isAuthenticated) ?  <li><a href="/terms">Url Proteted</a></li> : null }
                    </ul>  
                </div>
                </nav>
                
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

    },
    handleOnError(e){
        console.log('error', e);
    } 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);