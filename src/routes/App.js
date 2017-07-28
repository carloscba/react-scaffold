import React, { Component } from 'react';
import { BrowserRouter as Router, Route, link } from 'react-router-dom';
import LoginGoogle from '../components/LoginGoogle';

import appReducer from '../store/reducers'
import initialState from '../store/initialState'

import Home from './Home'
import Step1 from './Step1'
import Share from './Share'
import Terms from './Terms'
import Test from './Test'
import Menu from '../components/Menu'

class App extends Component{

    constructor(){
        super();
        this.state = initialState;
        console.log('state', this.state);
        
        this.state = appReducer(this.state, {
            type: 'LOGIN',
            payload : true
        })

        this.state = appReducer(this.state, {
            type: 'USER.UPDATE',
            payload : {
                "username" : "Carlos",
                "profile" : "imagen"
            }
        })        

        console.log('state', this.state);

        this.handleOnAuthenticate = this.handleOnAuthenticate.bind(this);
        this.handleOnError = this.handleOnError.bind(this);        

        window.locale = 'en'
    }

    handleOnAuthenticate(result){
        this.setState({
            isAuthenticated : true 
        })
    }

    handleOnError(error){
        console.log(error);
    } 

    render(){
        return(
            <Router>
                <div>
                    <Menu />
                    <h2>Authenticated</h2>
                    <LoginGoogle onAuthenticate={ this.handleOnAuthenticate } onError={ this.handleOnerror } />
                    <div className='container-fluid'>
                        <Route exact path='/' component={ Home }/>
                        <Route path='/step1' component={ Step1 } />
                        <Route path='/terms' component={ Terms } state="asd" isAuthenticated="true" />
                        <Route path='/test' component={ Test } />
                        <Route path='/share/:video' component={ Share } />
                    </div>
                </div>
            </Router>
        )
    }

}

export default App;