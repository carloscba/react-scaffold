import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import LoginFb from '../components/LoginFb'
import Locale from '../class/Locale'
import style from '../templates/routes/Home.css'
//Redux
import { connect } from 'react-redux'
import { actionCredential, actionAuthenticate, actionUser, actionCoupons } from '../store/actions'

class Home extends Component{

    constructor(){
        super();
        const copy = new Locale(this);
        this.copy = copy.get();
    }

    render(){
        const copy = new Locale().get('Home', this.props.locale);
        const layoutStart = (
            <div className='user-data'>
                <img src={ this.props.user.photoURL } className='user-data__photo' />
                <span className='user-data__name'>{ this.props.user.displayName }</span>
                <a className='user-data__button' href='./share' >Continuar</a>
            </div>
        );

        return(
            <div>
                <h2 className='home__h2'>{ copy.title }</h2>
                { ( this.props.isAuthenticated ) ? <Link to='authenticate'>Authenticate</Link> : null }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Home);