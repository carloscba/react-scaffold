import React, { Component } from 'react';
import { Link, BrowserRouter as Redirect } from 'react-router-dom'
//Redux
import { connect } from 'react-redux'
import getDispatchs from '../store/dispatchs'
//Scaffold
import Locale from '../scaffold/Locale';

class Home extends Component{

    constructor(){
        super();
    }

    render(){
        const copy = new Locale().get('Home', this.props.store.locale);

        const layoutStart = (
            <div className='user-data'>
                <img src={ this.props.store.user.photoURL } className='user-data__photo' />
                <span className='user-data__name'>{ this.props.store.user.displayName }</span>
                <a className='user-data__button' onClick={ this.start } >Continuar</a>
            </div>
        );

        return(
            <div className='row home'>
                <ul>
                    <li>Locale: { this.props.store.locale} <button onClick={ 
                        function(){
                            let newLocale = (this.props.store.locale === 'es') ? 'en' : 'es'
                            this.props.handlerLocale(newLocale);
                        }.bind(this)
                    }>Change locale</button></li>
                </ul>
                <div className='col-xs-12 col-md-12 col-lg-12 col-xl-12'>
                    <h2 className='home__h2'>{ copy.title }</h2>
                    { ( this.props.store.isAuthenticated ) ? layoutStart : <Link to='authenticate'>Authenticate</Link> }
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);