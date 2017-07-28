import React, { Component } from 'react'
import { BrowserRouter as Router, Route, link } from 'react-router-dom'
import LoginGoogle from '../components/LoginGoogle'

import { connect } from 'react-redux'
import appReducer from '../store/reducers'
import { authenticate, actionAccesstoken } from '../store/actions'

import Home from './Home'
import Step1 from './Step1'
import Share from './Share'
import Terms from './Terms'
import Test from './Test'
import Menu from '../components/Menu'

class App extends Component{
    
    constructor(){
        super();
        window.locale = 'en'
    }

    render(){
        
        console.log('this.props', this.props)

        return(
            <Router>
                <div>
                    <Menu />
                    { (!this.props.isAuthenticated) ? <LoginGoogle isAuthenticated={ this.props.isAuthenticated} onAuthenticate={ this.props.handlerOnAuthenticate} /> : null }
                    <div className='container-fluid'>
                        <Route exact path='/' component={ Home }/>
                        <Route path='/step1' component={ Step1 } />
                        <Route path='/terms' component={ Terms } />
                        <Route path='/test' component={ Test } />
                        <Route path='/share/:video' component={ Share } />
                    </div>
                </div>
            </Router>
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
    },
    handleOnError(e){
        console.log('error', e);
    } 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);