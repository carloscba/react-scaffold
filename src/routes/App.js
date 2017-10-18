import React, { Component } from 'react'
import { BrowserRouter as Router, Route, link } from 'react-router-dom'
import { connect } from 'react-redux'

import style from '../lib/bootstrap.css'

//Components
import Menu from '../components/Menu'

//Routes
import Home from './Home'
import Authenticate from './Authenticate'
import Share from './Share'
import Terms from './Terms'


class App extends Component{
    
    constructor(){
        super();
    }

    render(){
        return(
            <Router>
                <div>
                    <Menu />
                    <div className='container-fluid'>
                        <Route exact path='/' component={ Home }/>
                        <Route path='/authenticate' component={ Authenticate } />
                        <Route path='/terms' component={ Terms } />
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