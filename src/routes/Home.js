import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Locale from '../class/Locale'
import style from '../templates/routes/Home.css'
//Material
import FormLogin from '../material/FormLogin'
//Redux
import { connect } from 'react-redux'

class Home extends Component{

    constructor(){
        super();

    }

    render(){
        const copy = new Locale().get('Home', this.props.locale);

        const layoutStart = (
            <div className = 'home__paper-login'>
              <FormLogin />
            </div>
        );

        return layoutStart
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Home);
