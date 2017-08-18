import React, { Component } from 'react'
import { BrowserRouter as Router, Route, link } from 'react-router-dom'

import { connect } from 'react-redux'

import Home from './Home'
import Authenticate from './Home'
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

        return(
            <Router>
                <div>
                    <Menu />
                    <div className='container-fluid'>
                        <Route exact path='/' component={ Home }/>
                        <Route path='/authenticate' component={ Authenticate } />
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

export default connect(mapStateToProps)(App);