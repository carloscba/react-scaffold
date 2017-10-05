//React
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, link } from 'react-router-dom'
import style from '../templates/routes/app.css'
//Material
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import ButtonAppBar from '../material/ButtonAppBar'
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Camera';
//Redux
import { connect } from 'react-redux'
//Routes
import Home from './Home'
import Authenticate from './Authenticate'
import List from './List'
import Terms from './Terms'
//Components
import Menu from '../components/Menu'

class App extends Component{

    constructor(){
        super();
    }

    render(){
        const theme = createMuiTheme();
        return(
            <MuiThemeProvider theme={theme}>
            <Router>
                <div>
                    <ButtonAppBar />
                    <Route exact path='/' component={ Home }/>
                    <Route exact path='/authenticate' component={ Authenticate } />
                    <Route path='/terms' component={ Terms } />
                                        
                </div>
            </Router>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(App);
