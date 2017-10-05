import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Locale from '../class/Locale'
import style from '../templates/routes/Home.css'
//Material
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
//Redux
import { connect } from 'react-redux'

class Home extends Component{

    constructor(){
        super();
        this.authenticate = this.authenticate.bind(this);
    }

    authenticate(){
        this.props.history.push('/authenticate');
    }

    render(){
        const copy = new Locale().get('Home', this.props.locale);

        const layoutStart = (
            <Grid container spacing={0} className='home'>
                <Grid item xs={12} className = 'home__paper-login'>
                    <Button raised className='home__button-fb' onClick={ this.authenticate }>Ingresar con Facebook</Button>
                </Grid>          
            </Grid>
        );

        return layoutStart
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Home);
