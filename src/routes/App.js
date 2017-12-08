import React, { Component } from 'react'
import { BrowserRouter as Router, Route, link } from 'react-router-dom'
//Redux
import { connect } from 'react-redux'
import getDispatchs from '../store/dispatchs'
//Styles
import style from '../lib/bootstrap.css'
//Components
import Menu from '../components/Menu'
//Routes
import Home from './Home'
import Authenticate from './Authenticate'
import Upload from './Upload'
import Terms from './Terms'

class App extends Component{
    
    constructor(){
        super();
    }

    render(){
        return(
            <Router>
                <div>
                    <Menu state = { this.props } />
                    <div className='container-fluid'>
                        <Route exact path='/:path' component={ Home }/>
                        <Route path='/:path/authenticate' component={ Authenticate } />
                        <Route path='/:path/upload' component={ Upload } />
                        <Route path='/:path/terms' component={ Terms } />
                    </div>
                </div>
            </Router>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);