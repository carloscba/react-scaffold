//React
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, link } from 'react-router-dom'
//Material
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';
import Button from 'material-ui/Button';
import ButtonAppBar from '../material/ButtonAppBar'
//Redux
import { connect } from 'react-redux'
//Routes
import Home from './Home'
import Authenticate from './Home'
import Step1 from './Step1'
import Share from './Share'
import Terms from './Terms'
import Test from './Test'
//Components
import Menu from '../components/Menu'

class App extends Component{
    
    constructor(){
        super();

        this.theme = createMuiTheme({
            palette: {
                primary: green, // Purple and green play nicely together.
                secondary: {
                    ...purple,
                    A400: '#00e677',
                },
                error: red,
            },
        });

        this.classRoot = {
            flexGrow: 1,
            marginTop: 30,
        }
    }

    render(){

        return(
            <Router>
                <MuiThemeProvider theme={ this.theme }>
                    <div className={ this.classRoot }>
                        <Grid spacing={ 24 }>
                            <Grid item xs={ 12 }>
                                <ButtonAppBar />
                            </Grid>
                            <Grid item xs={12}>
                                <Route exact path='/' component={ Home }/>
                                <Route path='/authenticate' component={ Authenticate } />
                                <Route path='/step1' component={ Step1 } />
                                <Route path='/terms' component={ Terms } />
                                <Route path='/test' component={ Test } />
                                <Route path='/share/:video' component={ Share } />
                            </Grid>
                        </Grid>
                    </div>
                </MuiThemeProvider>
            </Router>
        )
    }

}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(App);